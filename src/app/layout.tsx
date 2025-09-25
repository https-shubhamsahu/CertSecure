import type { Metadata } from 'next';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Inter, Lexend } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const lexend = Lexend({
  subsets: ['latin'],
  variable: '--font-lexend',
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
        lexend.variable
      )}>
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
