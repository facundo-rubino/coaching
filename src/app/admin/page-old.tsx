'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, Clock } from 'lucide-react'
import { useAuth } from '@/components/admin-auth-provider'

interface DashboardStats {
  totalContacts: number
  newContacts: number
}

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalContacts: 0,
    newContacts: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem('admin-token')
      
      // Fetch contact stats
      const contactsResponse = await fetch('/api/admin/contacts?limit=1000', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (contactsResponse.ok) {
        const contactsData = await contactsResponse.json()
        const contacts = contactsData.contacts || []
        const newContacts = contacts.filter((c: any) => c.status === 'new').length
        
        setStats({
          totalContacts: contacts.length,
          newContacts
        })
      }
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statsCards = [
    {
      title: 'Total Contacts',
      value: stats.totalContacts,
      description: 'All contact form submissions',
      icon: Mail,
      color: 'text-blue-600'
    },
    {
      title: 'New Contacts',
      value: stats.newContacts,
      description: 'Unread contact submissions',
      icon: Clock,
      color: 'text-orange-600'
    }
  ]

  if (loading) {
    return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-6">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Welcome back, {user?.name}. Here's what's happening with your coaching platform.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {statsCards.map((card, index) => {
          const Icon = card.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                <Icon className={`h-4 w-4 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <CardDescription className="text-xs text-muted-foreground">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common tasks you might want to perform
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <a
              href="/admin/contacts"
              className="block p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="font-medium text-blue-900">View New Contacts</div>
              <div className="text-sm text-blue-700">Check recent form submissions</div>
            </a>
            {user?.role === 'super_admin' && (
              <a
                href="/admin/users"
                className="block p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <div className="font-medium text-green-900">Manage Users</div>
                <div className="text-sm text-green-700">Add or edit admin users</div>
              </a>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest updates in your system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center text-sm">
                <Clock className="w-4 h-4 mr-2 text-gray-400" />
                <span className="text-gray-600">
                  {stats.newContacts} new contact{stats.newContacts !== 1 ? 's' : ''} awaiting review
                </span>
              </div>
              {user?.role === 'super_admin' && (
                <div className="flex items-center text-sm">
                  <Users className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-gray-600">
                    {stats.activeUsers} active admin user{stats.activeUsers !== 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
