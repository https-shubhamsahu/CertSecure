'use client';

import { useUser, useDoc, useFirestore } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useEffect, useMemo, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { ShieldCheck } from 'lucide-react';
import AdminDashboard from '@/components/features/dashboards/AdminDashboard';
import EmployerDashboard from '@/components/features/dashboards/EmployerDashboard';
import UniversityDashboard from '@/components/features/dashboards/UniversityDashboard';
import StudentDashboard from '@/components/features/dashboards/StudentDashboard';

type UserRole = 'Student' | 'Employer' | 'University' | 'Admin';

type UserDoc = {
  firstName?: string;
  lastName?: string;
  email?: string | null;
  role?: UserRole;
};

const GUEST_ROLE_STORAGE_KEY = 'certsecure:guestRole';

export default function DashboardPage() {
  const { user } = useUser();
  const firestore = useFirestore();

  const [{ guestRole, isGuestRoleResolved }, setGuestState] = useState<{
    guestRole: UserRole | null;
    isGuestRoleResolved: boolean;
  }>({ guestRole: null, isGuestRoleResolved: false });
  const isGuestModeEnabled = process.env.NEXT_PUBLIC_ENABLE_GUEST !== 'false';

  useEffect(() => {
    let resolvedRole: UserRole | null = null;
    try {
      const stored = localStorage.getItem(GUEST_ROLE_STORAGE_KEY);
      const valid: UserRole[] = ['Student', 'Employer', 'University', 'Admin'];
      resolvedRole = valid.includes(stored as UserRole) ? (stored as UserRole) : null;
    } catch {
      resolvedRole = null;
    }
    setGuestState({ guestRole: resolvedRole, isGuestRoleResolved: true });
  }, []);
  
  const userDocRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userData, isLoading } = useDoc<UserDoc>(userDocRef);

  const isGuest = isGuestModeEnabled && !user && !!guestRole;
  const effectiveUserData: UserDoc | undefined = isGuest
    ? { firstName: 'Guest', role: guestRole ?? undefined }
    : (userData ?? undefined);
  const effectiveLoading = user ? isLoading : !isGuestRoleResolved;

  const renderDashboardByRole = () => {
    switch (effectiveUserData?.role) {
      case 'Admin':
        return <AdminDashboard user={{ firstName: effectiveUserData.firstName ?? 'Admin' }} />;
      case 'Employer':
        return <EmployerDashboard user={effectiveUserData} />;
      case 'University':
        return <UniversityDashboard user={effectiveUserData} />;
      case 'Student':
        return <StudentDashboard user={effectiveUserData} />;
      default:
        return (
            <div className="text-center">
                <h2 className="text-2xl font-semibold">Welcome!</h2>
                <p className="text-muted-foreground">Your role is not defined yet. Please contact support.</p>
            </div>
        );
    }
  }

  if (effectiveLoading || !effectiveUserData) {
    return (
      <div className="grid gap-6">
        <div className='flex items-center gap-3 mb-2'>
          <Skeleton className='w-8 h-8 rounded-full' />
          <Skeleton className="h-8 w-48" />
        </div>
        <Skeleton className="h-4 w-64" />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-32 w-full rounded-lg" />
        </div>

         <div className="mt-6">
            <Skeleton className="h-64 w-full rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
        <div className='flex items-center gap-3 mb-2'>
            <ShieldCheck className='w-8 h-8 text-primary' />
            <h1 className="text-3xl font-bold font-literata">Welcome, {effectiveUserData.firstName ?? 'User'}!</h1>
        </div>
        <p className="text-lg text-muted-foreground mb-6">
            You are logged in as a <span className="font-semibold text-primary">{effectiveUserData?.role}</span>. Here is your dashboard overview.
        </p>
        {renderDashboardByRole()}
    </div>
  );
}
