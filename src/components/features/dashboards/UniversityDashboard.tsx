
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Database, FileText, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

const issuanceData = [
  { month: 'Jan', count: 120 },
  { month: 'Feb', count: 150 },
  { month: 'Mar', count: 170 },
  { month: 'Apr', count: 210 },
  { month: 'May', count: 250 },
  { month: 'Jun', count: 230 },
];

export default function UniversityDashboard({ user }: { user: unknown }) {
    void user;
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-glass">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Bulk Certificate Upload</CardTitle>
                            <UploadCloud className="h-8 w-8 text-primary" />
                        </div>
                        <CardDescription>Upload multiple certificates at once.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-gradient-primary text-primary-foreground bg-gradient-primary-hover">
                            <Link href="/app/upload">Upload Now</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="bg-glass">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Student Database</CardTitle>
                            <Database className="h-8 w-8 text-primary" />
                        </div>
                        <CardDescription>Manage student records and credentials.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-gradient-primary text-primary-foreground bg-gradient-primary-hover">
                            <Link href="/app/students">Manage Students</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="bg-glass">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Certificate Issuance</CardTitle>
                            <FileText className="h-8 w-8 text-primary" />
                        </div>
                        <CardDescription>Issue new digital certificates securely.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-gradient-primary text-primary-foreground bg-gradient-primary-hover">
                            <Link href="/app/upload">Issue Certificate</Link>
                        </Button>
                    </CardContent>
                </Card>
                <Card className="bg-glass">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Analytics & Reports</CardTitle>
                            <BarChart2 className="h-8 w-8 text-primary" />
                        </div>
                        <CardDescription>View issuance trends and statistics.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild className="w-full bg-gradient-primary text-primary-foreground bg-gradient-primary-hover">
                            <Link href="/app/analytics">View Analytics</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="bg-glass">
                <CardHeader>
                    <CardTitle>Monthly Issuance Analytics</CardTitle>
                    <CardDescription>Certificates issued over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={issuanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted)/0.2)" />
                            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                            <YAxis stroke="hsl(var(--muted-foreground))" />
                            <Tooltip contentStyle={{
                                backgroundColor: 'hsl(var(--background) / 0.8)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid hsl(var(--border))'
                            }}/>
                            <Area type="monotone" dataKey="count" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
