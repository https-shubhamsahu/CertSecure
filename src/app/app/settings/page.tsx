'use client';

import { useEffect, useMemo, useState } from 'react';
import { doc } from 'firebase/firestore';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useDoc, useFirestore, useUser } from '@/firebase';
import { setDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { Settings, ShieldCheck } from 'lucide-react';

type UserRole = 'Student' | 'Employer' | 'University' | 'Admin';

type UserDoc = {
  firstName?: string;
  lastName?: string;
  email?: string | null;
  role?: UserRole;
};

const GUEST_ROLE_STORAGE_KEY = 'certsecure:guestRole';

const formSchema = z.object({
  firstName: z.string().trim().min(1, 'First name is required.'),
  lastName: z.string().trim().min(1, 'Last name is required.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function SettingsPage() {
  const { user } = useUser();
  const firestore = useFirestore();
  const { toast } = useToast();

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

  const isGuest = isGuestModeEnabled && !user && !!guestRole;

  const userDocRef = useMemo(() => {
    if (!user || !firestore) return null;
    return doc(firestore, 'users', user.uid);
  }, [user, firestore]);

  const { data: userData, isLoading } = useDoc<UserDoc>(userDocRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
    },
    mode: 'onTouched',
  });

  useEffect(() => {
    if (!userData) return;
    form.reset({
      firstName: userData.firstName ?? '',
      lastName: userData.lastName ?? '',
    });
  }, [userData, form]);

  const effectiveRole = isGuest ? guestRole : userData?.role;
  const effectiveEmail = isGuest ? 'Guest session' : (user?.email ?? userData?.email ?? '');

  const isPageReady = user ? !isLoading : isGuestRoleResolved;
  const canSave = !!user && !!firestore && !!userDocRef;

  const onSubmit = (values: FormValues) => {
    if (!canSave || !userDocRef) {
      toast({
        variant: 'destructive',
        title: 'Cannot Save Settings',
        description: isGuest
          ? 'Guest sessions cannot save settings.'
          : 'Your account is not ready yet. Please try again.',
      });
      return;
    }

    setDocumentNonBlocking(
      userDocRef,
      {
        firstName: values.firstName,
        lastName: values.lastName,
      },
      { merge: true }
    );

    toast({
      title: 'Settings Updated',
      description: 'Your profile information was saved.',
    });
  };

  if (!isPageReady) {
    return (
      <div className="flex h-[70vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <ShieldCheck className="h-10 w-10 animate-spin text-primary" />
          <p className="text-lg font-medium">Loading settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-3">
        <Settings className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your profile information.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            {isGuest
              ? 'You are in guest mode. You can view settings but cannot save changes.'
              : 'Update your personal details for this account.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="First name" {...field} disabled={!canSave} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Last name" {...field} disabled={!canSave} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <FormLabel>Email</FormLabel>
                  <Input value={effectiveEmail} disabled />
                  <FormDescription>This is tied to your authentication account.</FormDescription>
                </div>
                <div className="space-y-2">
                  <FormLabel>Role</FormLabel>
                  <Input value={effectiveRole ?? ''} disabled />
                  <FormDescription>Your role controls available modules.</FormDescription>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Button
                  type="submit"
                  variant="soft"
                  className="rounded-full border-primary/20 text-primary"
                  disabled={!canSave || form.formState.isSubmitting}
                >
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
