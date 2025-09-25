'use client';

import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import { Sidebar, SidebarProvider, SidebarInset, SidebarTrigger, SidebarHeader, SidebarContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarFooter } from '@/components/ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Home, Upload, ShieldCheck, School, Building, UserCog } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/firebase';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const auth = useAuth();

  if (isUserLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }
  
  const handleSignOut = async () => {
    await auth.signOut();
    router.push('/login');
  };

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarHeader>
            <div className="flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-primary" />
              <span className="text-xl font-lexend font-semibold">CertSecure</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton href="/app" tooltip="Dashboard">
                  <Home />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/app/upload" tooltip="Upload Certificate">
                  <Upload />
                  <span>Upload</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton href="/app/verify" tooltip="Verify Certificate">
                  <ShieldCheck />
                  <span>Verify</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={user.photoURL ?? undefined} />
                <AvatarFallback>{getInitials(user.displayName || user.email)}</AvatarFallback>
              </Avatar>
              <div className="flex flex-col truncate">
                <span className="font-semibold truncate">{user.displayName || 'User'}</span>
                <span className="text-xs text-muted-foreground truncate">{user.email}</span>
              </div>
              <Button variant="ghost" size="icon" onClick={handleSignOut} className="ml-auto">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </SidebarFooter>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center justify-between border-b bg-background px-4">
            <SidebarTrigger className="md:hidden" />
            <h1 className="text-xl font-semibold">Dashboard</h1>
          </header>
          <main className="flex-1 p-4 md:p-6 lg:p-8">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
