'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Star, Heart, Users, Target, Phone, Mail, MapPin, Instagram, Facebook, Linkedin, ChevronLeft, ChevronRight, Sparkles, Brain } from 'lucide-react'
import { useState, useEffect, useCallback } from 'react'
import { MainContactForm } from '@/components/main-contact-form'
import { useTranslation } from '@/components/translation-provider'
import { LanguageToggle } from '@/components/ui/language-toggle'

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useTranslation()
  
  const slides = [
    {
      title: t.hero.slides[0].title,
      subtitle: t.hero.slides[0].subtitle,
      description: t.hero.slides[0].description,
      image: "https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80",
      primaryButton: t.hero.slides[0].primaryButton,
      secondaryButton: t.hero.slides[0].secondaryButton,
      stat: t.hero.slides[0].stat,
      icon: Heart
    },
    {
      title: t.hero.slides[1].title,
      subtitle: t.hero.slides[1].subtitle,
      description: t.hero.slides[1].description,
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1698&q=80",
      primaryButton: t.hero.slides[1].primaryButton,
      secondaryButton: t.hero.slides[1].secondaryButton,
      stat: t.hero.slides[1].stat,
      icon: Sparkles
    },
    {
      title: t.hero.slides[2].title,
      subtitle: t.hero.slides[2].subtitle,
      description: t.hero.slides[2].description,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80",
      primaryButton: t.hero.slides[2].primaryButton,
      secondaryButton: t.hero.slides[2].secondaryButton,
      stat: t.hero.slides[2].stat,
      icon: Brain
    }
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }, [slides.length])

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(nextSlide, 6000)
    return () => clearInterval(timer)
  }, [nextSlide])

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-orange-100 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold" style={{color: '#FF7453'}}>Serenella</div>
          <div className="hidden md:flex space-x-8">
            <a href="#home" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.home}</a>
            <a href="#about" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.about}</a>
            <a href="#services" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.services}</a>
            <a href="#testimonials" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.testimonials}</a>
            <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors">{t.nav.contact}</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Button className="hover:opacity-90 transition-opacity" style={{backgroundColor: '#FF7453'}}>{t.nav.bookSession}</Button>
          </div>
        </div>
      </nav>

      {/* Hero Slider Section */}
      <section id="home" className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="relative h-[600px]">
            {slides.map((slide, index) => {
              const IconComponent = slide.icon
              return (
                <div
                  key={index}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === currentSlide 
                      ? 'opacity-100 translate-x-0' 
                      : index < currentSlide 
                        ? 'opacity-0 -translate-x-full' 
                        : 'opacity-0 translate-x-full'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row items-center gap-12 h-full">
                    <div className="flex-1 text-center lg:text-left">
                      <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        {slide.title}
                        <span className="block" style={{color: '#FF7453'}}>{slide.subtitle}</span>
                      </h1>
                      <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        {slide.description}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                        <Button size="lg" className="text-lg px-8 py-6 hover:opacity-90 transition-opacity" style={{backgroundColor: '#FF7453'}}>
                          {slide.primaryButton}
                        </Button>
                        <Button size="lg" variant="outline" className="text-lg px-8 py-6 hover:bg-orange-50 transition-colors" style={{borderColor: '#FF7453', color: '#FF7453'}}>
                          {slide.secondaryButton}
                        </Button>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="relative">
                        <div className="w-full h-96 bg-gradient-to-br from-orange-200 to-orange-300 rounded-3xl overflow-hidden shadow-2xl">
                          <img
                            src={slide.image}
                            alt={`${slide.subtitle} - Wellness coaching`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-2xl shadow-lg">
                          <div className="flex items-center gap-2">
                            <IconComponent className="w-6 h-6" style={{color: '#FF7453'}} />
                            <span className="font-semibold">{slide.stat}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-orange-500 w-8' 
                    : 'bg-white/60 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.about.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
                alt="Serenella - Wellness Coach"
                className="w-full h-96 object-cover rounded-3xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-gray-900">{t.about.journeyTitle}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.about.paragraph1}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {t.about.paragraph2}
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{color: '#FF7453'}}>500+</div>
                  <div className="text-sm text-gray-600">{t.about.stats.clients}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{color: '#FF7453'}}>10+</div>
                  <div className="text-sm text-gray-600">{t.about.stats.experience}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold" style={{color: '#FF7453'}}>98%</div>
                  <div className="text-sm text-gray-600">{t.about.stats.success}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 px-4 bg-gradient-to-br from-orange-50 to-orange-100">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.services.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8" style={{color: '#FF7453'}} />
                </div>
                <CardTitle className="text-xl">{t.services.lifeCoaching.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  {t.services.lifeCoaching.description}
                </CardDescription>
                <div className="mt-6 text-center">
                  <div className="text-2xl font-bold mb-2" style={{color: '#FF7453'}}>{t.services.lifeCoaching.price}</div>
                  <div className="text-sm text-gray-500">{t.services.lifeCoaching.perSession}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-violet-600" />
                </div>
                <CardTitle className="text-xl">{t.services.wellnessCoaching.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  {t.services.wellnessCoaching.description}
                </CardDescription>
                <div className="mt-6 text-center">
                  <div className="text-2xl font-bold text-violet-600 mb-2">{t.services.wellnessCoaching.price}</div>
                  <div className="text-sm text-gray-500">{t.services.wellnessCoaching.perSession}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <CardTitle className="text-xl">{t.services.groupPrograms.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-gray-600 leading-relaxed">
                  {t.services.groupPrograms.description}
                </CardDescription>
                <div className="mt-6 text-center">
                  <div className="text-2xl font-bold text-emerald-600 mb-2">{t.services.groupPrograms.price}</div>
                  <div className="text-sm text-gray-500">{t.services.groupPrograms.perSession}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.testimonials.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-rose-50 to-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  &quot;{t.testimonials.reviews[0].text}&quot;
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    alt="Sarah M."
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold">{t.testimonials.reviews[0].name}</div>
                    <div className="text-sm text-gray-600">{t.testimonials.reviews[0].title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-violet-50 to-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  &quot;{t.testimonials.reviews[1].text}&quot;
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80"
                    alt="Michael R."
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold">{t.testimonials.reviews[1].name}</div>
                    <div className="text-sm text-gray-600">{t.testimonials.reviews[1].title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-50 to-white border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">
                  &quot;{t.testimonials.reviews[2].text}&quot;
                </p>
                <div className="flex items-center">
                  <img
                    src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1769&q=80"
                    alt="Emma L."
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="font-semibold">{t.testimonials.reviews[2].name}</div>
                    <div className="text-sm text-gray-600">{t.testimonials.reviews[2].title}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 bg-gradient-to-br from-gray-50 to-rose-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">{t.contact.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <MainContactForm />
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t.contact.connect}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-rose-600" />
                    </div>
                    <div>
                      <div className="font-semibold">{t.contact.phone}</div>
                      <div className="text-gray-600">+1 (555) 123-4567</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                      <Mail className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <div className="font-semibold">{t.contact.email}</div>
                      <div className="text-gray-600">hello@serenellacoaching.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-semibold">{t.contact.location}</div>
                      <div className="text-gray-600">{t.contact.virtualSessions}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-semibold text-gray-900 mb-4">{t.contact.followJourney}</h4>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center hover:bg-rose-200 transition-colors">
                    <Instagram className="w-6 h-6 text-rose-600" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center hover:bg-blue-200 transition-colors">
                    <Facebook className="w-6 h-6 text-blue-600" />
                  </a>
                  <a href="#" className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center hover:bg-violet-200 transition-colors">
                    <Linkedin className="w-6 h-6 text-violet-600" />
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-br from-rose-100 to-violet-100 p-6 rounded-2xl">
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{t.contact.readyToBegin}</h4>
                <p className="text-gray-700 mb-4">
                  {t.contact.discoveryCall}
                </p>
                <Button className="bg-rose-600 hover:bg-rose-700">
                  {t.contact.scheduleFreeCall}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-rose-400 mb-4">Serenella</div>
              <p className="text-gray-400 mb-4">
                {t.footer.description}
              </p>
              <div className="flex gap-4">
                <Instagram className="w-5 h-5 text-gray-400 hover:text-rose-400 cursor-pointer transition-colors" />
                <Facebook className="w-5 h-5 text-gray-400 hover:text-blue-400 cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 text-gray-400 hover:text-violet-400 cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.services}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.lifeCoaching}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.wellnessCoaching}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.groupPrograms}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.workshops}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.resources}</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.blog}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.freeGuides}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.meditationLibrary}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t.footer.successStories}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t.footer.contact}</h4>
              <ul className="space-y-2 text-gray-400">
                <li>hello@serenellacoaching.com</li>
                <li>+1 (555) 123-4567</li>
                <li>{t.contact.virtualSessions}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>{t.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
