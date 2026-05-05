import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Waitlist from '@/models/Waitlist';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    await dbConnect();
    const { email, plan } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if already exists
    const existing = await Waitlist.findOne({ email });
    if (existing) {
      return NextResponse.json({ message: 'You are already on the waitlist!' }, { status: 200 });
    }

    const entry = await Waitlist.create({ email, plan });

    // Send Welcome Email
    try {
      await resend.emails.send({
        from: 'YouTube Growth OS <onboarding@resend.dev>',
        to: email,
        subject: 'Welcome to the Waitlist! 🚀',
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h1 style="color: #4f46e5;">You're on the list! 🚀</h1>
            <p>Thanks for your interest in <strong>YouTube Growth OS Pro</strong>.</p>
            <p>We're building the ultimate content factory for creators like you, and we'll let you know as soon as we open up access.</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 14px; color: #666;">In the meantime, you can continue using the free tools on our dashboard.</p>
            <p style="font-size: 14px; color: #666;">Best,<br />The YouTube Growth OS Team</p>
          </div>
        `,
      });
    } catch (emailError) {
      console.error('Failed to send email:', emailError);
      // We don't want to fail the whole request if email fails
    }

    return NextResponse.json({ message: 'Welcome to the waitlist!', entry }, { status: 201 });
  } catch (error: any) {
    console.error('Waitlist Error:', error);
    return NextResponse.json({ error: error.message || 'Something went wrong' }, { status: 500 });
  }
}
