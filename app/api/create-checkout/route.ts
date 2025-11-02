import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2025-10-29.clover',
    })
  : null;

export async function POST(request: NextRequest) {
  try {
    const { locale } = await request.json();
    
    if (!stripe) {
      console.warn('[Stripe] API key not configured. Using mock mode.');
      return NextResponse.json(
        { 
          url: `/${locale}/club?mock=success`,
          message: 'MOCK MODE: Stripe not configured. Add STRIPE_SECRET_KEY to .env.local'
        },
        { status: 200 }
      );
    }

    const protocol = request.headers.get('x-forwarded-proto') || 'http';
    const host = request.headers.get('host') || 'localhost:3000';
    const baseUrl = `${protocol}://${host}`;

    // Create Stripe Checkout Session for subscription
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'EuroBot Hub Premium Club',
              description: 'Access to exclusive community, reports, and live Q&A sessions',
              images: [`${baseUrl}/images/club-premium.png`],
            },
            recurring: {
              interval: 'month',
            },
            unit_amount: 500, // 5 EUR in cents
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/${locale}/club?success=true`,
      cancel_url: `${baseUrl}/${locale}/club?canceled=true`,
      customer_email: undefined, // User will enter their email
      metadata: {
        locale,
        product: 'premium_club',
      },
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error: any) {
    console.error('[Stripe Checkout] Error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session', details: error.message },
      { status: 500 }
    );
  }
}
