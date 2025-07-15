"use client"

import { Languages } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTranslation } from "@/components/translation-provider"

export function LanguageToggle() {
  const { language, setLanguage } = useTranslation()

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en')
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={toggleLanguage}
      className="flex items-center gap-2"
    >
      <Languages className="h-4 w-4" />
      {language === 'en' ? 'ES' : 'EN'}
    </Button>
  )
}
