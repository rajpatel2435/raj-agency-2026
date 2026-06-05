// app/api/trading/india-execute/route.ts
import { NextResponse } from 'next/server';
import { createElement } from 'react';
import { createClient } from '@/app/utils/supabase/server';
import { Resend } from 'resend';
import { TradingAlertEmail } from '@/components/email-template';

// Instantiate the Resend interface using your server environment profile
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Access Denied' }, { status: 401 });
  }

  try {
    const { ticker, budgetINR } = await req.json();

    // Simulating our SEBI-compliant execution math loop...
    const mockOrderId = `LIVE-NSE-${Math.floor(Math.random() * 89999 + 10000)}`;
    const actionType = 'BUY';

    // =========================================================================
    // RESEND EMAIL DISPATCH EXTENSION
    // =========================================================================
    // Note: While testing with a free account, you can only send to yourself (onboarding@resend.dev)
    // Once you add your custom verified domain records, change this to your true profile email!
    const { data: emailData, error: emailError } = await resend.emails.send({
      from: 'Algo Terminal <onboarding@resend.dev>', 
      to: [user.email || 'your-test-email@example.com'],
      subject: `🚨 Executed: ${actionType} ${ticker.toUpperCase()}`,
      react: createElement(TradingAlertEmail, {
        ticker: ticker.toUpperCase(),
        action: actionType,
        allocatedAmount: budgetINR,
        orderId: mockOrderId,
      }),
    });

    if (emailError) {
      console.error('Notification layer warning:', emailError.message);
    }

    return NextResponse.json({
      status: "ORDER_PROCESSED_AND_NOTIFIED",
      orderId: mockOrderId,
      emailRef: emailData?.id || null
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}