
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, Clock, FileUp, Search, XCircle } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const recentVerifications = [
  { id: 'CERT-001', student: 'John Doe', status: 'Verified', date: '2023-10-26' },
  { id: 'CERT-002', student: 'Jane Smith', status: 'Pending', date: '2023-10-25' },
  { id: 'CERT-003', student: 'Mike Johnson', status: 'Fraudulent', date: '2023-10-24' },
  { id: 'CERT-004', student: 'Emily Davis', status: 'Verified', date: '2023-10-23' },
];

export default function EmployerDashboard({ user }: { user: unknown }) {
  void user;
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid md:grid-cols-3 gap-6">
            <Card className="bg-glass">
                <CardHeader className="pb-2">
                    <CardTitle className="text-4xl font-bold text-primary">1,204</CardTitle>
                    <CardDescription>Total Verified</CardDescription>
                </CardHeader>
            </Card>
            <Card className="bg-glass">
                <CardHeader className="pb-2">
                    <CardTitle className="text-4xl font-bold text-destructive">17</CardTitle>
                    <CardDescription>Fraudulent Detected</CardDescription>
                </CardHeader>
            </Card>
            <Card className="bg-glass">
                <CardHeader className="pb-2">
                    <CardTitle className="text-4xl font-bold">98.6%</CardTitle>
                    <CardDescription>Success Rate</CardDescription>
                </CardHeader>
            </Card>
        </div>

        <Card className="bg-glass">
          <CardHeader>
            <CardTitle>Recent Verifications</CardTitle>
            <CardDescription>History of your recent certificate verifications.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Certificate ID</TableHead>
                  <TableHead>Student Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentVerifications.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-mono">{item.id}</TableCell>
                    <TableCell>{item.student}</TableCell>
                    <TableCell>
                      <Badge variant={
                        item.status === 'Verified' ? 'success' :
                        item.status === 'Pending' ? 'secondary' : 'destructive'
                      } className="gap-1">
                        {item.status === 'Verified' && <CheckCircle className="h-3 w-3" />}
                        {item.status === 'Pending' && <Clock className="h-3 w-3" />}
                        {item.status === 'Fraudulent' && <XCircle className="h-3 w-3" />}
                        {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{item.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        <Card className="bg-glass text-center">
            <CardHeader>
                <CardTitle>Quick Verification</CardTitle>
                <CardDescription>Instantly verify a single certificate.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" asChild className="w-full bg-gradient-primary text-primary-foreground bg-gradient-primary-hover">
                    <Link href="/app/verify">
                        <Search className="mr-2 h-5 w-5"/>
                        Verify a Certificate
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="bg-glass">
            <CardHeader>
                <CardTitle>Upload Certificate</CardTitle>
                <CardDescription>Not hiring? Upload your own certificate.</CardDescription>
            </CardHeader>
            <CardContent>
                <Link href="/app/upload" className="flex items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted/80 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <FileUp className="w-10 h-10 mb-3 text-muted-foreground" />
                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span></p>
                            <p className="text-xs text-muted-foreground">PDF, PNG, JPG (MAX. 10MB)</p>
                        </div>
                    </label>
                </Link> 
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
