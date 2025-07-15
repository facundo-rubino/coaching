import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/database'
import User from '@/models/User'
import { validateAdminAccess } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const payload = validateAdminAccess(request)
    if (!payload) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    // Get fresh user data
    const user = await User.findById(payload.userId)
    if (!user || !user.isActive) {
      return NextResponse.json(
        { error: 'User not found or inactive' },
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        lastLogin: user.lastLogin
      }
    })
  } catch (error) {
    console.error('Auth verification error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
