
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { initiateEmailSignIn } from '@/firebase/non-blocking-login';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, LogIn, Users } from 'lucide-react';
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
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-background p-4 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-50" />

      <Card className="w-full max-w-md z-10 bg-glass border-primary/20 shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 border border-primary/20 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <ShieldCheck className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold">Welcome Back</CardTitle>
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
            <Button type="submit" className="w-full group transition-all duration-300 ease-in-out bg-gradient-primary text-primary-foreground bg-gradient-primary-hover" disabled={isLoading}>
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

      <Card className="w-full max-w-md mt-6 z-10 bg-glass border-primary/10 shadow-xl">
        <CardHeader>
          <div className='flex items-center gap-3'>
            <Users className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-bold">Demo Credentials</CardTitle>
          </div>
          <CardDescription>Use these credentials to explore different roles.</CardDescription>
        </CardHeader>
        <CardContent className="text-sm space-y-2 text-muted-foreground">
          <p><strong className='text-foreground'>Admin:</strong> admin@demo.com / demo123</p>
          <p><strong className='text-foreground'>University:</strong> university@demo.com / demo123</p>
          <p><strong className='text-foreground'>Employer:</strong> employer@demo.com / demo123</p>
          <p><strong className='text-foreground'>Student:</strong> student@demo.com / demo123</p>
        </CardContent>
      </Card>
    </div>
  );
}
