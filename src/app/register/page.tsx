
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useUser } from '@/firebase';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserPlus } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { createUserWithEmailAndPassword } from 'firebase/auth';

type UserRole = "Student" | "Employer" | "University" | "Admin";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole | ''>('');
  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push('/app');
    }
  }, [isUserLoading, user, router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "Please select a role.",
      });
      return;
    }
    setIsLoading(true);

    if (!auth || !firestore) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Firebase services are not available.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      if (newUser) {
        const userDocRef = doc(firestore, "users", newUser.uid);
        const userData = {
          id: newUser.uid,
          firstName,
          lastName,
          email: newUser.email,
          role,
        };
        setDocumentNonBlocking(userDocRef, userData, { merge: true });
        
        const roleCollectionPath = `roles_${role.toLowerCase()}`;
        const roleDocRef = doc(firestore, roleCollectionPath, newUser.uid);
        setDocumentNonBlocking(roleDocRef, { role: true }, { merge: true });

        router.push('/app');
      }
    } catch (error: any) {
      console.error("Registration failed:", error);
      if (error.code === 'auth/email-already-in-use') {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "This email is already in use. Please log in instead.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: error.message || "An unexpected error occurred.",
        });
      }
      setIsLoading(false);
    }
  };
  
  if (isUserLoading || user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background font-sans">
        <div className="flex flex-col items-center gap-2">
          <UserPlus className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-full bg-gradient-to-br from-green-50 via-teal-50 to-gray-100 dark:from-gray-900 dark:via-teal-900/20 dark:to-black p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <Card className="w-full max-w-lg shadow-2xl bg-card/80 backdrop-blur-lg border-primary/20">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary/10 border border-primary/20 text-primary rounded-full h-16 w-16 flex items-center justify-center mb-4">
            <UserPlus className="h-8 w-8" />
          </div>
          <CardTitle className="text-3xl font-bold font-literata">Create an Account</CardTitle>
          <CardDescription>Join CertSecure to manage and verify credentials securely.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSignUp}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-background/70"/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" required value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-background/70"/>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" placeholder="name@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background/70"/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required value={password} onChange={(e) => setPassword(e.target.value)} className="bg-background/70"/>
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I am a...</Label>
              <Select onValueChange={(value: UserRole) => setRole(value)} value={role}>
                <SelectTrigger id="role" className="bg-background/70">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Student">Student</SelectItem>
                  <SelectItem value="Employer">Employer</SelectItem>
                  <SelectItem value="University">University</SelectItem>
                  <SelectItem value="Admin">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button type="submit" className="w-full group transition-all duration-300 ease-in-out" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : (
                <>
                  <span className="bg-left-bottom bg-gradient-to-r from-primary to-accent bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500">
                    Register
                  </span>
                  <UserPlus className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
            <p className="text-sm text-center text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-semibold text-primary hover:underline">
                Sign in here
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

    