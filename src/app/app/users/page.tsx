
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dummy data for users
const users = [
  {
    name: 'Liam Johnson',
    email: 'liam@example.com',
    role: 'Student',
    status: 'Active',
    avatar: '/avatars/01.png',
  },
  {
    name: 'Olivia Smith',
    email: 'olivia@example.com',
    role: 'Student',
    status: 'Active',
    avatar: '/avatars/02.png',
  },
  {
    name: 'Noah Williams',
    email: 'noah@example.com',
    role: 'University',
    status: 'Active',
    avatar: '/avatars/03.png',
  },
  {
    name: 'Emma Brown',
    email: 'emma@example.com',
    role: 'Employer',
    status: 'Suspended',
    avatar: '/avatars/04.png',
  },
  {
    name: 'Oliver Jones',
    email: 'oliver@example.com',
    role: 'Admin',
    status: 'Active',
    avatar: '/avatars/05.png',
  },
];

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
}

export default function UsersPage() {
  return (
    <div className="animate-fade-in space-y-6">
        <div className='flex items-center gap-3'>
            <Users className='w-8 h-8 text-primary' />
            <h1 className="text-3xl font-bold">User Management</h1>
        </div>
        <Card className="bg-glass">
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>A list of all users in the system.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.email}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                        </Avatar>
                        <div className='grid gap-0.5'>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                        <Badge variant="outline">{user.role}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.status === 'Active' ? 'success' : 'destructive'}>{user.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
    </div>
  );
}
