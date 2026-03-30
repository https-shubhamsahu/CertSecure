
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

type UserRole = 'Student' | 'Employer' | 'University' | 'Admin';

const GUEST_ROLE_STORAGE_KEY = 'certsecure:guestRole';

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
    } catch (error: unknown) {
      console.error("Login failed:", error);
      const message = error instanceof Error ? error.message : "An unexpected error occurred.";
      toast({
        variant: "destructive",
        title: "Login Failed",
        description: message,
      });
      setIsLoading(false);
    }
  };

  const handleGuestLogin = (role: UserRole) => {
    try {
      localStorage.setItem(GUEST_ROLE_STORAGE_KEY, role);
      router.push('/app');
    } catch (error) {
      console.error('Failed to set guest role:', error);
      toast({
        variant: 'destructive',
        title: 'Guest Login Failed',
        description: 'Could not enable guest mode in this browser.',
      });
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
        <div className="pointer-events-none absolute top-0 left-0 -translate-x-1/4 -translate-y-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl opacity-40" />
        <div className="pointer-events-none absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-96 h-96 bg-accent/15 rounded-full blur-3xl opacity-40" />

      <Card className="w-full max-w-[420px] sm:max-w-md z-10 shadow-soft-lg">
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
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" variant="soft" className="w-full rounded-full border-primary/20 text-primary" disabled={isLoading}>
              {isLoading ? 'Signing In...' : (
                <>
                  <span>Sign In</span>
                  <LogIn className="ml-2 h-4 w-4" />
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

      <Card className="w-full max-w-[420px] sm:max-w-md mt-6 z-10">
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
        <CardFooter className="flex flex-col gap-2">
          <p className="text-xs text-muted-foreground">Or continue without an account:</p>
          <div className="grid w-full grid-cols-2 gap-2">
            <Button type="button" variant="soft" className="border-primary/10" onClick={() => handleGuestLogin('Admin')}>
              Guest Admin
            </Button>
            <Button type="button" variant="soft" className="border-primary/10" onClick={() => handleGuestLogin('University')}>
              Guest University
            </Button>
            <Button type="button" variant="soft" className="border-primary/10" onClick={() => handleGuestLogin('Employer')}>
              Guest Employer
            </Button>
            <Button type="button" variant="soft" className="border-primary/10" onClick={() => handleGuestLogin('Student')}>
              Guest Student
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
