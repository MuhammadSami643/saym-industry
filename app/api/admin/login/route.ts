import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const normalizedEmail = (email || '').trim().toLowerCase();

    // Verify credentials
    if (
      (normalizedEmail === 'admin@zypfit.com' || normalizedEmail === 'admin@saym.com') &&
      password === 'admin123'
    ) {
      const response = NextResponse.json({
        success: true,
        message: 'Logged in successfully',
        user: { email: normalizedEmail, role: 'admin' }
      });

      // Set cookie for middleware validation
      response.cookies.set('admin_auth', 'authenticated', {
        path: '/',
        httpOnly: false, // accessible to client if needed
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 // 1 day
      });

      return response;
    }

    return NextResponse.json(
      { error: 'Invalid email or password.' },
      { status: 401 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Server error during login' },
      { status: 500 }
    );
  }
}

