// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    // Verify against your private server configuration environment
    if (password !== process.env.JWT_SECRET_PASSPHRASE) {
      return NextResponse.json({ error: 'Unauthorized Access Token Invalid' }, { status: 401 });
    }

    const response = NextResponse.json({ success: true, message: 'Authentication verified' });

    // Inject an HTTP-only cookie. This cannot be read or stolen by malicious client-side scripts.
    response.cookies.set('admin_session_token', 'session_active_verified', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 12, // Automatically expires after 12 hours
      path: '/',
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}