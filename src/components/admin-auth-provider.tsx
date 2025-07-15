'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'

interface User {
  id: string
  email: string
  name: string
  role: 'admin'
  lastLogin?: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => void
  refreshAuth: () => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: () => {},
  refreshAuth: async () => {}
})

export const useAuth = () => useContext(AuthContext)

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('admin-token')
      if (!token) {
        if (pathname !== '/admin/login') {
          router.push('/admin/login')
        }
        setLoading(false)
        return
      }

      const response = await fetch('/api/admin/auth/verify', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        
        // If on login page and authenticated, redirect to admin
        if (pathname === '/admin/login') {
          router.push('/admin')
        }
      } else {
        localStorage.removeItem('admin-token')
        setUser(null)
        if (pathname !== '/admin/login') {
          router.push('/admin/login')
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      localStorage.removeItem('admin-token')
      if (pathname !== '/admin/login') {
        router.push('/admin/login')
      }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      localStorage.removeItem('admin-token')
      setUser(null)
      router.push('/admin/login')
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout, refreshAuth: checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
