import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TranslationProvider } from "@/components/translation-provider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Serenella - Wellness Coaching",
  description: "Transform your life with mindful coaching. Discover your inner strength, overcome limiting beliefs, and create the life you truly desire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <TranslationProvider>
          <Navbar />
          <main className="pt-20">{children}</main>
          <Footer />
        </TranslationProvider>
      </body>
    </html>
  );
}
