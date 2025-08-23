'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/components/translation-provider'
import { LanguageToggle } from '@/components/ui/language-toggle'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export function Navbar() {
  const { t } = useTranslation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-orange-100 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold" style={{ color: '#FF7453' }}>
          Serenella
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.home}</Link>
          <Link href="/#about" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.about}</Link>
          <Link href="/therapies" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.services}</Link>
          <Link href="/#testimonials" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.testimonials}</Link>
          <Link href="/#contact" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.contact}</Link>
          <LanguageToggle />
          <Button className="hover:opacity-90 transition-opacity" style={{ backgroundColor: '#FF7453' }}>{t.nav.bookSession}</Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.home}</Link>
            <Link href="/#about" className="text-gray-700 hover:text-orange-600 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.about}</Link>
            <Link href="/therapies" className="text-gray-700 hover:text-orange-600 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.services}</Link>
            <Link href="/#testimonials" className="text-gray-700 hover:text-orange-600 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.testimonials}</Link>
            <Link href="/#contact" className="text-gray-700 hover:text-orange-600 transition-colors" onClick={() => setIsMenuOpen(false)}>{t.nav.contact}</Link>
            <div className="flex justify-between items-center pt-4 border-t border-orange-100">
              <LanguageToggle />
              <Button className="hover:opacity-90 transition-opacity" style={{ backgroundColor: '#FF7453' }}>{t.nav.bookSession}</Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
