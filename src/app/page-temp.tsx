import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/contact-form";
import { Heart, Star, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-900">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <Image
            className="mx-auto mb-8 dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
            Welcome to Your
            <span className="text-blue-600 dark:text-blue-400"> Coaching </span>
            Platform
          </h1>
          <p className="mb-8 text-lg text-gray-600 dark:text-gray-300">
            A modern Next.js 15 application built with the latest 2025 best practices.
            Featuring TypeScript, Tailwind CSS, Biome, and more.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="text-lg">
              Get Started
            </Button>
            <Button variant="outline" size="lg" className="text-lg">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Modern Tech Stack
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Built with cutting-edge technologies for 2025
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Next.js 15 + Turbopack
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Latest Next.js with App Router and Turbopack for lightning-fast development.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900">
              <Star className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Modern UI Components
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Radix UI primitives with Tailwind CSS and class-variance-authority.
            </p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900">
              <Heart className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
              Type-Safe Forms
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              React Hook Form with Zod validation for robust form handling.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            Try the Form
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Experience our modern form with validation
          </p>
        </div>
        
        <div className="flex justify-center">
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 dark:bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Built with ❤️ using Next.js 15, TypeScript, Tailwind CSS, and modern tools
          </p>
        </div>
      </footer>
    </div>
  );
}
