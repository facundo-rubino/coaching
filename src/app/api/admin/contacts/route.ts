import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/database'
import Contact from '@/models/Contact'

export async function GET() {
  try {
    await connectDB()

    const contacts = await Contact.find({})
      .sort({ submittedAt: -1 })
      .limit(100) // Limit to latest 100 submissions

    return NextResponse.json({ 
      success: true,
      count: contacts.length,
      contacts 
    })
  } catch (error) {
    console.error('Error fetching contacts:', error)
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch contact submissions' 
      },
      { status: 500 }
    )
  }
}

// PATCH endpoint to update contact status
export async function PATCH(request: NextRequest) {
  try {
    await connectDB()

    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const validStatuses = ['new', 'read', 'replied']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const contact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true,
      contact 
    })
  } catch (error) {
    console.error('Error updating contact:', error)
    return NextResponse.json(
      { error: 'Failed to update contact' },
      { status: 500 }
    )
  }
}
