# Coaching Platform

A modern, full-stack coaching platform built with the latest 2025 web development best practices.

## 🚀 Tech Stack

This project leverages cutting-edge technologies for optimal performance and developer experience:

### Core Framework
- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe development
- **[Turbopack](https://turbo.build/pack)** - Ultra-fast development bundler

### Styling & UI
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Latest utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[class-variance-authority](https://cva.style/)** - Component variant management
- **[Lucide React](https://lucide.dev/)** - Beautiful & consistent icons

### Forms & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant form library
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation

### Code Quality
- **[ESLint](https://eslint.org/)** - JavaScript linting
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[Next.js ESLint Config](https://nextjs.org/docs/app/api-reference/config/eslint)** - Optimized rules

### Utilities
- **[clsx](https://github.com/lukeed/clsx)** - Conditional class utility
- **[tailwind-merge](https://github.com/dcastil/tailwind-merge)** - Tailwind class merging

## 🛠️ Getting Started

### Prerequisites
- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd coaching
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Building
npm run build        # Create production build
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run lint:biome   # Run Biome linter
npm run format       # Format code with Biome
npm run check        # Run Biome check and fix
```

## 📁 Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles with Tailwind
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   │   ├── button.tsx # Button component with variants
│   │   ├── input.tsx  # Input component
│   │   └── label.tsx  # Label component
│   └── contact-form.tsx # Example form with validation
└── lib/
    └── utils.ts        # Utility functions
```

## 🎨 Component Architecture

This project follows modern React patterns:

- **Compound Components**: Using Radix UI primitives as building blocks
- **Variant-based Design**: Leveraging `class-variance-authority` for component variants
- **Type Safety**: Full TypeScript coverage with proper prop typing
- **Accessibility**: Built-in a11y features from Radix UI
- **Form Handling**: Type-safe forms with React Hook Form + Zod

## 🔧 Configuration Files

- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.mjs` - ESLint configuration
- `biome.json` - Biome configuration
- `postcss.config.mjs` - PostCSS configuration

## 📚 Key Features

- ⚡ **Ultra-fast development** with Turbopack
- 🎨 **Beautiful UI** with Tailwind CSS and Radix UI
- 📝 **Type-safe forms** with validation
- 🌙 **Dark mode** support built-in
- 📱 **Responsive design** mobile-first approach
- ♿ **Accessibility** compliant components
- 🔍 **SEO optimized** with Next.js best practices

## 🚀 Deployment

Deploy easily on [Vercel](https://vercel.com/):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=your-repo-url)

Or build for any hosting platform:

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a pull request

## 📄 License

This project is licensed under the MIT License.

---

Built with ❤️ using the latest 2025 web development best practices.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
