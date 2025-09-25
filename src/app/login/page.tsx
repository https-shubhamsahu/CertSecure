'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/app');
    }
  }, [isUserLoading, user, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!auth) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Authentication service is not available.",
      });
      setIsLoading(false);
      return;
    }

    try {
      initiateEmailSignIn(auth, email, password);
    } catch (error: any) {
      console.error("Login failed:", error);
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: error.message || "An unexpected error occurred.",
      });
      setIsLoading(false);
    }
  };
  
  if (isUserLoading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background font-sans">
        <div className="text-center">
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-green-50 via-teal-50 to-gray-100 dark:from-gray-900 dark:via-teal-900/20 dark:to-black p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Card className="w-full max-w-md shadow-2xl bg-card/80 backdrop-blur-lg border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 border border-primary/20 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold font-literata">Welcome Back</CardTitle>
          <CardDescription>Sign in to access the CertSecure dashboard.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignIn}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className="bg-background/70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="bg-background/70"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full group transition-all duration-300 ease-in-out" disabled={isLoading}>
              {isLoading ? 'Signing In...' : (
                <>
                  <span className="bg-left-bottom bg-gradient-to-r from-primary to-accent bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500">
                    Sign In
                  </span>
                  <LogIn className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-semibold text-primary hover:underline">
                Register here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
