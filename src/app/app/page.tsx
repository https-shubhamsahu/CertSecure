'use client';

import { useUser, useDoc, useFirestore } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { doc } from 'firebase/firestore';
import { useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldCheck } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  
  const userDocRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userData, isLoading } = useDoc(userDocRef);

  if (isLoading || !userData) {
    return (
      <div className="grid gap-6">
        <Card className="bg-card/80 backdrop-blur-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-4 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid gap-6 animate-fade-in">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className='flex items-center gap-3 mb-2'>
            <ShieldCheck className='w-8 h-8 text-primary' />
            <CardTitle className="text-3xl font-literata">Welcome, {userData?.firstName}!</CardTitle>
          </div>
          <CardDescription className="text-lg">
            You are logged in as a <span className="font-semibold text-primary">{userData?.role}</span>. Here is your dashboard overview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Your User ID is: <code className="bg-muted px-1.5 py-0.5 rounded text-foreground">{user?.uid}</code></p>
        </CardContent>
      </Card>
    </div>
  );
}
