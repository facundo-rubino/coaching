# GitHub Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a Next.js 15 project built with:
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 (latest version)
- **Linting**: ESLint + Biome for comprehensive code quality
- **Build Tool**: Turbopack for development
- **Package Manager**: npm
- **UI Components**: Radix UI primitives with custom variants
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Utilities**: class-variance-authority, clsx, tailwind-merge

## Architecture Guidelines
- Use the `src/` directory structure
- Follow Next.js App Router patterns
- Utilize server and client components appropriately
- Implement responsive design with Tailwind CSS
- Follow TypeScript best practices
- Use Radix UI primitives for accessible components
- Implement type-safe forms with React Hook Form + Zod

## Coding Standards
- Use TypeScript strict mode
- Follow ESLint rules and Next.js conventions
- Use Biome for additional linting and formatting
- Use functional components with hooks
- Implement proper error boundaries
- Use modern React patterns (Suspense, Error Boundaries, etc.)
- Follow component composition patterns with Radix UI

## File Organization
- Components in `src/components/`
  - UI primitives in `src/components/ui/`
  - Feature components in `src/components/`
- Pages in `src/app/`
- Utilities in `src/lib/`
- Types in `src/types/`
- Styles using Tailwind classes with the `cn()` utility

## Best Practices
- Use semantic HTML elements
- Implement accessibility features (leveraging Radix UI)
- Optimize for performance (Image optimization, lazy loading)
- Use Next.js built-in features (Image, Link, etc.)
- Follow responsive-first design approach
- Use class-variance-authority for component variants
- Combine classes with `cn()` utility (clsx + tailwind-merge)
- Validate forms with Zod schemas
- Use Lucide React for consistent iconography

## Form Handling
- Use React Hook Form for all forms
- Define Zod schemas for validation
- Use `@hookform/resolvers/zod` for integration
- Handle loading states and error display
- Implement proper form accessibility

## Component Development
- Create reusable UI components in `src/components/ui/`
- Use Radix UI primitives as base components
- Apply variants using class-variance-authority
- Export both component and variant types
- Follow the established component patterns
