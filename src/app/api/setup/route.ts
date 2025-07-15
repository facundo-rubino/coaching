import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/database'
import User from '@/models/User'

export async function POST(request: NextRequest) {
  try {
    // Security check - only allow in development or with secret key
    const setupSecret = process.env.SETUP_SECRET || 'default-setup-secret'
    const { secret, email, password, name } = await request.json()
    
    if (secret !== setupSecret) {
      return NextResponse.json(
        { error: 'Invalid setup secret' },
        { status: 401 }
      )
    }

    await connectDB()

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email })
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin user already exists' },
        { status: 400 }
      )
    }

    // Create admin user
    const admin = new User({
      email: email || 'admin@serenellacoaching.com',
      password: password || 'admin123',
      name: name || 'Admin',
      role: 'admin',
      isActive: true
    })

    await admin.save()

    return NextResponse.json({
      success: true,
      message: 'Admin user created successfully',
      admin: {
        email: admin.email,
        name: admin.name,
        role: admin.role
      }
    })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to create admin user',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
