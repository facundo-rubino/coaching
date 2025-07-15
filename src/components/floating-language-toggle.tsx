"use client"

import { LanguageToggle } from "@/components/ui/language-toggle"

export function FloatingLanguageToggle() {
  return (
    <div className="fixed bottom-20 left-4 z-50">
      <LanguageToggle />
    </div>
  )
}
