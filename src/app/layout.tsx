
import type { Metadata } from 'next';
import Script from 'next/script';
import { Toaster } from "@/components/ui/toaster"
import { cn } from '@/lib/utils';
import './globals.css';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
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
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className={cn(
        "h-full antialiased",
        inter.variable,
        "font-sans"
      )}>
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){
  try {
    var key = 'certsecure:theme';
    var stored = localStorage.getItem(key);
    var isDark;
    if (stored === 'dark') isDark = true;
    else if (stored === 'light') isDark = false;
    else isDark = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    var root = document.documentElement;
    if (isDark) root.classList.add('dark');
    else root.classList.remove('dark');

    root.style.colorScheme = isDark ? 'dark' : 'light';
  } catch (e) {}
})();`}
        </Script>
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
