'use client'

import { useTranslation } from '@/components/translation-provider'
import { Instagram, Facebook, Linkedin } from 'lucide-react'

export function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="text-2xl font-bold text-rose-400 mb-4">Serenella</div>
            <p className="text-gray-400 mb-4">
              {t.footer.description}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.quickLinks}</h4>
            <ul className="space-y-2">
              <li><a href="/#about" className="text-gray-400 hover:text-white">{t.nav.about}</a></li>
              <li><a href="/therapies" className="text-gray-400 hover:text-white">{t.nav.services}</a></li>
              <li><a href="/#testimonials" className="text-gray-400 hover:text-white">{t.nav.testimonials}</a></li>
              <li><a href="/#contact" className="text-gray-400 hover:text-white">{t.nav.contact}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.contact}</h4>
            <ul className="space-y-2 text-gray-400">
              <li>+1 (555) 123-4567</li>
              <li>contact@serenella.com</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t.footer.follow}</h4>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-white"><Instagram /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Facebook /></a>
              <a href="#" className="text-gray-400 hover:text-white"><Linkedin /></a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Serenella. {t.footer.rights}</p>
        </div>
      </div>
    </footer>
  )
}
