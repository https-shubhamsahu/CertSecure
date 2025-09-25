'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UploadCloud, Database, FileText, BarChart2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const issuanceData = [
  { month: 'Jan', count: 120 },
  { month: 'Feb', count: 150 },
  { month: 'Mar', count: 170 },
  { month: 'Apr', count: 210 },
  { month: 'May', count: 250 },
  { month: 'Jun', count: 230 },
];

export default function UniversityDashboard({ user }: { user: any }) {
    return (
        <div className="grid gap-8" style={{
            '--tw-bg-opacity': '0.1',
            '--bg-color-rgb': '239 246 255',
            backgroundColor: 'rgba(var(--bg-color-rgb), var(--tw-bg-opacity))'
        }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/80 border-blue-200 shadow-md backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-blue-900">Bulk Certificate Upload</CardTitle>
                            <UploadCloud className="h-8 w-8 text-blue-500" />
                        </div>
                        <CardDescription className="text-blue-700">Upload multiple certificates at once.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Upload Now</Button>
                    </CardContent>
                </Card>
                <Card className="bg-white/80 border-blue-200 shadow-md backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-blue-900">Student Database</CardTitle>
                            <Database className="h-8 w-8 text-blue-500" />
                        </div>
                        <CardDescription className="text-blue-700">Manage student records and credentials.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Manage Students</Button>
                    </CardContent>
                </Card>
                <Card className="bg-white/80 border-blue-200 shadow-md backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-blue-900">Certificate Issuance</CardTitle>
                            <FileText className="h-8 w-8 text-blue-500" />
                        </div>
                        <CardDescription className="text-blue-700">Issue new digital certificates securely.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">Issue Certificate</Button>
                    </CardContent>
                </Card>
                <Card className="bg-white/80 border-blue-200 shadow-md backdrop-blur-sm">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-blue-900">Analytics & Reports</CardTitle>
                            <BarChart2 className="h-8 w-8 text-blue-500" />
                        </div>
                        <CardDescription className="text-blue-700">View issuance trends and statistics.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">View Analytics</Button>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="bg-white/80 border-blue-200 shadow-lg backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-blue-900">Monthly Issuance Analytics</CardTitle>
                    <CardDescription className="text-blue-700">Certificates issued over the last 6 months.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={issuanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                            <XAxis dataKey="month" stroke="#4b5563" />
                            <YAxis stroke="#4b5563" />
                            <Tooltip contentStyle={{
                                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                                border: '1px solid #d1d5db'
                            }}/>
                            <Area type="monotone" dataKey="count" stroke="#3b82f6" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}
