import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabase } from '@/utils/supabase';
import { sendReportEmail, sendAdminNotification, sendAuditConfirmation, sendContactConfirmation } from '@/utils/email';

const leadSchema = z.object({
  email: z.string().email('Invalid email address'),
  first_name: z.string().optional(),
  country: z.string().optional(),
  use_case: z.string().optional(),
  budget_range: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().optional(),
  source_form: z.enum(['report_download_gdpr', 'audit_request', 'contact_form']),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = leadSchema.parse(body);

    // 1. Save to Supabase
    const { error: dbError } = await supabase
      .from('leads')
      .insert(validatedData);

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to save lead');
    }

    // 2. Send admin notification
    await sendAdminNotification(validatedData);

    // 3. Send appropriate email based on source_form
    if (validatedData.source_form === 'report_download_gdpr') {
      await sendReportEmail(validatedData.email, validatedData.first_name);
    } else if (validatedData.source_form === 'audit_request') {
      await sendAuditConfirmation(validatedData.email, validatedData.first_name);
    } else if (validatedData.source_form === 'contact_form') {
      await sendContactConfirmation(validatedData.email, validatedData.first_name);
    }

    return NextResponse.json(
      { success: true, message: 'Lead captured successfully' },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: error.errors },
        { status: 400 }
      );
    }

    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

// Rate limiting check (simple implementation)
const requestLog = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = requestLog.get(ip) || [];
  
  // Clean old requests (older than 1 minute)
  const recentRequests = requests.filter(time => now - time < 60000);
  
  if (recentRequests.length >= 5) {
    return false; // Rate limit exceeded
  }
  
  recentRequests.push(now);
  requestLog.set(ip, recentRequests);
  return true;
}
