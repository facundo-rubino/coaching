import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Serenella Coaching - Transform Your Life with Mindful Coaching",
  description: "Certified wellness coach helping individuals discover their potential and create lasting positive change. Life coaching, wellness coaching, and group programs available.",
  keywords: "life coach, wellness coach, personal development, mindfulness, transformation, coaching services",
  authors: [{ name: "Serenella" }],
  openGraph: {
    title: "Serenella Coaching - Transform Your Life with Mindful Coaching",
    description: "Certified wellness coach helping individuals discover their potential and create lasting positive change.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={cn(inter.className, "antialiased")}>
        {children}
      </body>
    </html>
  );
}
