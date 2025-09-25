import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import './globals.css';

export const metadata: Metadata = {
  title: 'CertSecure Demo',
  description: 'Firebase project setup guide for a Next.js certificate verification app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Literata:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn(
        "h-full font-body antialiased",
      )}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
