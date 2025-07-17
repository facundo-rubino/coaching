'use client';

import Link from 'next/link';
import { FloatingLanguageToggle as LanguageToggle } from '../floating-language-toggle';
import { useTranslation } from '../translation-provider'; 


export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-orange-100 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-brand">
          SerenellaCoaching
        </div>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.home}</Link>
          <Link href="/about" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.about}</Link>
          <Link href="/therapies" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.therapies}</Link>
          <Link href="/testimonials" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.testimonials}</Link>
          <Link href="/contact" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.contact}</Link>
        </div>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <button className="hover:opacity-90 transition-opacity bg-brand text-white">
            {t.nav.bookSession}
          </button>
        </div>
      </div>
    </nav>
  );
}
