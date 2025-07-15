import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/database'
import Contact from '@/models/Contact'
import { validateAdminAccess } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Validate admin access
    const user = validateAdminAccess(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Build filter
    interface ContactFilter {
      status?: 'new' | 'read' | 'replied'
      $or?: Array<{
        name?: { $regex: string; $options: string }
        email?: { $regex: string; $options: string }
        message?: { $regex: string; $options: string }
      }>
    }

    const filter: ContactFilter = {}
    if (status && ['new', 'read', 'replied'].includes(status)) {
      filter.status = status as 'new' | 'read' | 'replied'
    }
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { message: { $regex: search, $options: 'i' } }
      ]
    }

    const skip = (page - 1) * limit

    const [contacts, total] = await Promise.all([
      Contact.find(filter)
        .sort({ submittedAt: -1 })
        .skip(skip)
        .limit(limit),
      Contact.countDocuments(filter)
    ])

    return NextResponse.json({ 
      success: true,
      contacts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
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
    // Validate admin access
    const user = validateAdminAccess(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

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

// DELETE endpoint to delete contact
export async function DELETE(request: NextRequest) {
  try {
    // Validate admin access
    const user = validateAdminAccess(request)
    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      )
    }

    const contact = await Contact.findByIdAndDelete(id)

    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ 
      success: true,
      message: 'Contact deleted successfully'
    })
  } catch (error) {
    console.error('Error deleting contact:', error)
    return NextResponse.json(
      { error: 'Failed to delete contact' },
      { status: 500 }
    )
  }
}
