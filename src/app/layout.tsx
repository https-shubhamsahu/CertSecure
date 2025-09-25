import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Inter, Literata } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const literata = Literata({
  subsets: ['latin'],
  variable: '--font-literata',
});

export const metadata: Metadata = {
  title: 'CertSecure - Certificate Verification Platform',
  description: 'A futuristic platform for secure certificate verification and management, built with Next.js and Firebase.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={cn(
        "h-full antialiased",
        inter.variable,
        literata.variable,
        "font-sans"
      )}>
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
