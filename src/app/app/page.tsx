'use client';

import { useUser, useDoc, useFirestore } from '@/firebase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { doc } from 'firebase/firestore';
import { useMemo } from 'react';

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  
  const userDocRef = useMemo(() => {
    if (!user) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userData, isLoading } = useDoc(userDocRef);

  if (isLoading) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Welcome, {userData?.firstName || 'User'}!</CardTitle>
          <CardDescription>
            You are logged in as a {userData?.role || 'User'}. Here is your dashboard overview.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Your user ID is: {user?.uid}</p>
        </CardContent>
      </Card>
    </div>
  );
}
