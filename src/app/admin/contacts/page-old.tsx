'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Mail, 
  Phone, 
  Calendar, 
  User, 
  Search, 
  Filter,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight
} from 'lucide-react'

interface Contact {
  _id: string
  name: string
  email: string
  phone?: string
  message: string
  status: 'new' | 'read' | 'replied'
  submittedAt: string
  createdAt: string
}

interface Pagination {
  page: number
  limit: number
  total: number
  pages: number
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('')
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  })

  useEffect(() => {
    fetchContacts()
  }, [pagination.page, statusFilter, search])

  const fetchContacts = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin-token')
      
      const params = new URLSearchParams({
        page: pagination.page.toString(),
        limit: pagination.limit.toString()
      })
      
      if (statusFilter) params.append('status', statusFilter)
      if (search) params.append('search', search)

      const response = await fetch(`/api/admin/contacts?${params}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (!response.ok) throw new Error('Failed to fetch contacts')
      
      const data = await response.json()
      setContacts(data.contacts)
      setPagination(data.pagination)
    } catch (err) {
      setError('Failed to load contacts')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const updateContactStatus = async (id: string, status: 'new' | 'read' | 'replied') => {
    try {
      const token = localStorage.getItem('admin-token')
      
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id, status }),
      })

      if (!response.ok) throw new Error('Failed to update status')

      // Update local state
      setContacts(contacts.map(contact => 
        contact._id === id ? { ...contact, status } : contact
      ))
    } catch (err) {
      console.error('Failed to update contact status:', err)
    }
  }

  const deleteContact = async (id: string) => {
    if (!confirm('Are you sure you want to delete this contact? This action cannot be undone.')) {
      return
    }

    try {
      const token = localStorage.getItem('admin-token')
      
      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) throw new Error('Failed to delete contact')

      // Remove from local state
      setContacts(contacts.filter(contact => contact._id !== id))
      
      // Update pagination total
      setPagination(prev => ({
        ...prev,
        total: prev.total - 1,
        pages: Math.ceil((prev.total - 1) / prev.limit)
      }))
    } catch (err) {
      console.error('Failed to delete contact:', err)
    }
  }

  const handleSearch = (value: string) => {
    setSearch(value)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status)
    setPagination(prev => ({ ...prev, page: 1 }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800 hover:bg-red-200'
      case 'read': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200'
      case 'replied': return 'bg-green-100 text-green-800 hover:bg-green-200'
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading && contacts.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Contact Form Submissions</h1>
        </div>
        <div className="text-center py-12">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-500">Loading contacts...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Contact Form Submissions</h1>
        </div>
        <div className="text-center py-12">
          <div className="text-red-600 mb-4">{error}</div>
          <Button onClick={fetchContacts}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Contact Form Submissions</h1>
          <p className="text-gray-600 mt-1">
            {pagination.total} total submissions
          </p>
        </div>
        <Button onClick={fetchContacts} variant="outline" size="sm">
          <RefreshCw className="w-4 h-4 mr-2" />
          Refresh
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={statusFilter === '' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleStatusFilter('')}
          >
            All
          </Button>
          <Button
            variant={statusFilter === 'new' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleStatusFilter('new')}
          >
            New
          </Button>
          <Button
            variant={statusFilter === 'read' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleStatusFilter('read')}
          >
            Read
          </Button>
          <Button
            variant={statusFilter === 'replied' ? 'default' : 'outline'}
            size="sm"
            onClick={() => handleStatusFilter('replied')}
          >
            Replied
          </Button>
        </div>
      </div>

      {/* Contacts List */}
      <div className="grid gap-6">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No contact submissions found.</p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card key={contact._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {contact.name}
                    </CardTitle>
                    <CardDescription className="flex flex-wrap items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(contact.submittedAt)}
                      </span>
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(contact.status)}>
                      {contact.status}
                    </Badge>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => deleteContact(contact._id)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Message:</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {contact.status === 'new' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateContactStatus(contact._id, 'read')}
                    >
                      Mark as Read
                    </Button>
                  )}
                  {contact.status === 'read' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateContactStatus(contact._id, 'replied')}
                    >
                      Mark as Replied
                    </Button>
                  )}
                  {contact.status === 'replied' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateContactStatus(contact._id, 'read')}
                    >
                      Mark as Read
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`mailto:${contact.email}?subject=Re: Your coaching inquiry`)}
                  >
                    Reply via Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
            disabled={pagination.page === 1}
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>
          
          <span className="text-sm text-gray-600">
            Page {pagination.page} of {pagination.pages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
            disabled={pagination.page === pagination.pages}
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
      })

      if (!response.ok) throw new Error('Failed to update status')

      // Update local state
      setContacts(contacts.map(contact => 
        contact._id === id ? { ...contact, status } : contact
      ))
    } catch (err) {
      console.error('Failed to update contact status:', err)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800'
      case 'read': return 'bg-yellow-100 text-yellow-800'
      case 'replied': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">Loading contacts...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Contact Form Submissions</h1>
        <p className="text-gray-600 mt-2">
          {contacts.length} total submissions
        </p>
      </div>

      <div className="grid gap-6">
        {contacts.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-500">No contact submissions yet.</p>
            </CardContent>
          </Card>
        ) : (
          contacts.map((contact) => (
            <Card key={contact._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      {contact.name}
                    </CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-2">
                      <span className="flex items-center gap-1">
                        <Mail className="w-4 h-4" />
                        {contact.email}
                      </span>
                      {contact.phone && (
                        <span className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          {contact.phone}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(contact.submittedAt)}
                      </span>
                    </CardDescription>
                  </div>
                  <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getStatusColor(contact.status)}`}>
                    {contact.status}
                  </span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <h4 className="font-semibold mb-2">Message:</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{contact.message}</p>
                </div>
                
                <div className="flex gap-2">
                  {contact.status === 'new' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateContactStatus(contact._id, 'read')}
                    >
                      Mark as Read
                    </Button>
                  )}
                  {contact.status === 'read' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateContactStatus(contact._id, 'replied')}
                    >
                      Mark as Replied
                    </Button>
                  )}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open(`mailto:${contact.email}?subject=Re: Your coaching inquiry`)}
                  >
                    Reply via Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
