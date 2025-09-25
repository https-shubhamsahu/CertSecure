
'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Home, Upload, ShieldCheck, BarChart2, Users, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';
import Notifications from '@/components/features/Notifications';
import { useDoc } from '@/firebase/firestore/use-doc';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase/provider';
import { useMemo } from 'react';


export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const auth = useAuth();
  const firestore = useFirestore();

  const userDocRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userData } = useDoc(userDocRef);


  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [isUserLoading, user, router]);

  if (isUserLoading || !user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading CertSecure...</p>
        </div>
      </div>
    );
  }
  
  const handleSignOut = async () => {
    if (auth) {
      await auth.signOut();
    }
    router.push('/login');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('');
  }

  const renderNavLinks = () => {
    switch (userData?.role) {
      case 'Admin':
        return (
          <>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Dashboard" isActive={pathname === '/app'} onClick={() => router.push('/app')}>
                <Home />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton tooltip="Analytics" isActive={pathname === '/app/analytics'} onClick={() => router.push('/app/analytics')}>
                  <BarChart2 />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </>
        );
      case 'University':
        return (
          <>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Dashboard" isActive={pathname === '/app'} onClick={() => router.push('/app')}>
                <Home />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Upload Certificate" isActive={pathname === '/app/upload'} onClick={() => router.push('/app/upload')}>
                <Upload />
                <span>Upload</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
             <SidebarMenuItem>
                <SidebarMenuButton tooltip="Students" isActive={pathname === '/app/students'} onClick={() => router.push('/app/students')}>
                  <Database />
                  <span>Students</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton tooltip="Analytics" isActive={pathname === '/app/analytics'} onClick={() => router.push('/app/analytics')}>
                  <BarChart2 />
                  <span>Analytics</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
          </>
        );
        case 'Employer':
            return (
              <>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Dashboard" isActive={pathname === '/app'} onClick={() => router.push('/app')}>
                    <Home />
                    <span>Dashboard</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton tooltip="Verify Certificate" isActive={pathname === '/app/verify'} onClick={() => router.push('/app/verify')}>
                    <ShieldCheck />
                    <span>Verify</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </>
            );
        case 'Student':
        return (
          <>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Dashboard" isActive={pathname === '/app'} onClick={() => router.push('/app')}>
                <Home />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Upload Certificate" isActive={pathname === '/app/upload'} onClick={() => router.push('/app/upload')}>
                <Upload />
                <span>Upload</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </>
        );
      default:
        return (
            <SidebarMenuItem>
                <SidebarMenuButton tooltip="Dashboard" isActive={pathname === '/app'} onClick={() => router.push('/app')}>
                    <Home />
                    <span>Dashboard</span>
                </SidebarMenuButton>
            </SidebarMenuItem>
        );
    }
  }


  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-background/95">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center justify-between p-1">
              <div className='flex items-center gap-3'>
                <div className="p-2 bg-primary/10 rounded-lg">
                  <ShieldCheck className="h-6 w-6 text-primary" />
                </div>
                <span className="text-xl font-bold">CertSecure</span>
              </div>
              <div className='block md:hidden'>
                <Notifications role={userData?.role} />
              </div>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {renderNavLinks()}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-3 p-2 rounded-lg bg-background">
              <Avatar className="h-9 w-9 border-2 border-primary/50">
                <AvatarImage src={user.photoURL ?? undefined} />
                <AvatarFallback>{getInitials(user.displayName || user.email)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="font-semibold truncate text-sm">{user.displayName || userData?.firstName || 'User'}</span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleSignOut} className="ml-auto rounded-full h-9 w-9">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
            <header className='flex items-center justify-end p-2 md:hidden'>
              <SidebarTrigger />
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
              <div className='hidden md:flex items-center justify-end gap-4 mb-4'>
                  <Notifications role={userData?.role} />
                  <SidebarTrigger />
              </div>
              {children}
            </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
