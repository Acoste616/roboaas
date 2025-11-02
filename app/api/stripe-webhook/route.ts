import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabase } from '@/utils/supabase';

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    })
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: NextRequest) {
  try {
    if (!stripe) {
      console.warn('[Stripe Webhook] Stripe not configured.');
      return NextResponse.json(
        { error: 'Stripe not configured' },
        { status: 400 }
      );
    }

    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature) {
      console.error('[Stripe Webhook] Missing signature');
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      // Verify webhook signature
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error('[Stripe Webhook] Signature verification failed:', err.message);
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the event
    console.log('[Stripe Webhook] Event type:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      console.log('[Stripe Webhook] Checkout completed:', {
        sessionId: session.id,
        customerEmail: session.customer_email,
        subscriptionId: session.subscription,
      });

      // Extract customer data
      const customerEmail = session.customer_email;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;
      const locale = session.metadata?.locale || 'pl';

      if (!customerEmail) {
        console.error('[Stripe Webhook] No customer email found');
        return NextResponse.json({ received: true }, { status: 200 });
      }

      // 1. Save subscription to Supabase
      try {
        const { error: dbError } = await supabase.from('club_members').insert({
          email: customerEmail,
          stripe_customer_id: customerId,
          stripe_subscription_id: subscriptionId,
          status: 'active',
          locale,
          subscribed_at: new Date().toISOString(),
        });

        if (dbError) {
          console.error('[Stripe Webhook] Supabase insert error:', dbError);
        } else {
          console.log('[Stripe Webhook] Subscription saved to database');
        }
      } catch (dbErr) {
        console.error('[Stripe Webhook] Database error:', dbErr);
      }

      // 2. Trigger Discord Webhook to assign Premium role
      const discordWebhookUrl = process.env.DISCORD_WEBHOOK_URL;

      if (discordWebhookUrl) {
        try {
          const discordPayload = {
            content: `🎉 **New Premium Member!**

**Email:** ${customerEmail}
**Locale:** ${locale}
**Subscription ID:** ${subscriptionId}

Please assign the **Premium** role to this user on Discord.`,
            username: 'EuroBot Hub Subscriptions',
            avatar_url: 'https://cdn-icons-png.flaticon.com/512/6295/6295417.png',
          };

          const discordResponse = await fetch(discordWebhookUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(discordPayload),
          });

          if (discordResponse.ok) {
            console.log('[Stripe Webhook] Discord notification sent successfully');
          } else {
            console.error('[Stripe Webhook] Discord notification failed:', await discordResponse.text());
          }
        } catch (discordErr) {
          console.error('[Stripe Webhook] Discord webhook error:', discordErr);
        }
      } else {
        console.warn('[Stripe Webhook] DISCORD_WEBHOOK_URL not configured');
      }

      // 3. Send welcome email (optional - can be integrated with Resend)
      // TODO: Implement welcome email with Discord invite link
      console.log('[Stripe Webhook] TODO: Send welcome email to', customerEmail);
    }

    // Handle subscription cancellation
    if (event.type === 'customer.subscription.deleted') {
      const subscription = event.data.object as Stripe.Subscription;
      const subscriptionId = subscription.id;

      console.log('[Stripe Webhook] Subscription cancelled:', subscriptionId);

      try {
        const { error: updateError } = await supabase
          .from('club_members')
          .update({ status: 'cancelled', cancelled_at: new Date().toISOString() })
          .eq('stripe_subscription_id', subscriptionId);

        if (updateError) {
          console.error('[Stripe Webhook] Failed to update cancelled subscription:', updateError);
        } else {
          console.log('[Stripe Webhook] Subscription marked as cancelled in database');
        }
      } catch (err) {
        console.error('[Stripe Webhook] Error updating cancelled subscription:', err);
      }
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error: any) {
    console.error('[Stripe Webhook] Unexpected error:', error);
    return NextResponse.json(
      { error: 'Webhook handler failed', details: error.message },
      { status: 500 }
    );
  }
}
