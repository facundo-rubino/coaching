import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/database'
import Contact from '@/models/Contact'

export async function POST(request: NextRequest) {
  try {
    // Connect to MongoDB
    await connectDB()

    // Parse the request body
    const body = await request.json()
    const { name, email, message, phone } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new contact submission
    const contactData: {
      name: string
      email: string
      message: string
      phone?: string
    } = {
      name,
      email,
      message
    }

    // Add phone if provided
    if (phone && phone.trim()) {
      contactData.phone = phone.trim()
    }

    const contact = await Contact.create(contactData)

    // Return success response
    return NextResponse.json(
      { 
        message: 'Contact form submitted successfully',
        id: contact._id
      },
      { status: 201 }
    )

  } catch (error: unknown) {
    console.error('Contact form submission error:', error)

    // Handle validation errors
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError' && 'errors' in error) {
      const validationErrors = Object.values((error as { errors: Record<string, { message: string }> }).errors).map(
        (err) => err.message
      )
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationErrors 
        },
        { status: 400 }
      )
    }

    // Handle duplicate email errors (if you add unique constraint)
    if (error && typeof error === 'object' && 'code' in error && error.code === 11000) {
      return NextResponse.json(
        { error: 'This email has already been submitted recently' },
        { status: 409 }
      )
    }

    // Generic server error
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// Optional: GET endpoint to retrieve contact submissions (for admin use)
export async function GET() {
  try {
    await connectDB()

    const contacts = await Contact.find({})
      .sort({ submittedAt: -1 })
      .limit(50) // Limit to latest 50 submissions

    return NextResponse.json({ contacts })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
