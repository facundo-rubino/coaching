import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({
    success: true,
    message: 'Logged out successfully'
  })

  // Clear the admin token cookie
  response.cookies.set('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0 // This deletes the cookie
  })

  return response
}
