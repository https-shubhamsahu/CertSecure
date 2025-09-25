
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
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Dummy data for students
const students = [
  {
    name: 'Liam Johnson',
    email: 'liam@example.com',
    role: 'Student',
    certificates: 5,
    status: 'Active',
    avatar: '/avatars/01.png',
  },
  {
    name: 'Olivia Smith',
    email: 'olivia@example.com',
    role: 'Student',
    certificates: 3,
    status: 'Active',
    avatar: '/avatars/02.png',
  },
  {
    name: 'Noah Williams',
    email: 'noah@example.com',
    role: 'Student',
    certificates: 8,
    status: 'Active',
    avatar: '/avatars/03.png',
  },
  {
    name: 'Emma Brown',
    email: 'emma@example.com',
    role: 'Student',
    certificates: 1,
    status: 'Suspended',
    avatar: '/avatars/04.png',
  },
  {
    name: 'Oliver Jones',
    email: 'oliver@example.com',
    role: 'Student',
    certificates: 12,
    status: 'Active',
    avatar: '/avatars/05.png',
  },
];

const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
}

export default function StudentDatabase() {
  return (
    <Card className="bg-glass">
      <CardHeader>
        <CardTitle>All Students</CardTitle>
        <CardDescription>A list of all students in the system.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Certificates</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {students.map((student) => (
              <TableRow key={student.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={student.avatar} alt={student.name} />
                      <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
                    </Avatar>
                    <div className='grid gap-0.5'>
                      <p className="font-medium">{student.name}</p>
                      <p className="text-sm text-muted-foreground">{student.email}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant={student.status === 'Active' ? 'success' : 'destructive'}>{student.status}</Badge>
                </TableCell>
                <TableCell className="text-center font-medium">{student.certificates}</TableCell>
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
  );
}
