"use client";

import { ReactNode } from "react";

interface ClientBodyProps {
  children: ReactNode;
}

export function ClientBody({ children }: ClientBodyProps) {
  return (
    <body className="min-h-screen bg-background font-sans antialiased">
      {children}
    </body>
  );
}
