import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { restaurantName, name, email, formType } = await req.json();

    if (!email || !name) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // --- ACTION 1: SEND NOTIFICATION TO YOU (Internal) ---
    await resend.emails.send({
      from: 'Launch at Dawn <system@launchatdawn.com>', 
      to: 'r4jp47e1@gmail.com',
      subject: `🚨 NEW LEAD: ${restaurantName}`,
      html: `
        <div style="background: #050505; color: white; padding: 30px; border: 1px solid #F95D0A; font-family: sans-serif;">
          <h2 style="color: #F95D0A;">NEW TRANSMISSION</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Business:</strong> ${restaurantName}</p>
          <p><strong>Email:</strong> ${email}</p>
        </div>
      `,
    });

    // --- ACTION 2: SEND CONFIRMATION TO THE RESTAURANT OWNER (External) ---
    // This is the part that was missing!
    await resend.emails.send({
      from: 'Launch at Dawn <hello@launchatdawn.com>', // Use your verified domain here later
      to: email, // This sends it to the person who filled out the form
      subject: `Revenue Growth Audit Initialized: ${restaurantName}`,
      html: `
        <div style="background-color: #050505; color: #ffffff; font-family: sans-serif; padding: 40px; border-top: 4px solid #F95D0A;">
          <h1 style="text-transform: uppercase; letter-spacing: 2px;">Launch at Dawn</h1>
          <p style="color: #F95D0A; font-weight: bold; text-transform: uppercase;">Growth Protocol: Initialized</p>
          <hr style="border: 0; border-top: 1px solid #222; margin: 20px 0;" />
          <p>Hello ${name},</p>
          <p>Your request for a Revenue Growth Audit for <strong>${restaurantName}</strong> has been received and added to our queue.</p>
          <p>Our team is currently analyzing your local market data in Montreal/Vancouver. We will contact you within 24 hours to discuss the results and show you how we plan to increase your covers.</p>
          <br />
          <p style="font-size: 12px; color: #555;">SYSTEM ID: LAD-REVENUE-ENGINE-V3</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: 'Internal Error' }, { status: 500 });
  }
}