'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Users, ShieldAlert, Building2, Settings } from 'lucide-react';
import { AreaChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', verifications: 4000, fraud: 24 },
  { name: 'Feb', verifications: 3000, fraud: 13 },
  { name: 'Mar', verifications: 2000, fraud: 98 },
  { name: 'Apr', verifications: 2780, fraud: 39 },
  { name: 'May', verifications: 1890, fraud: 48 },
  { name: 'Jun', verifications: 2390, fraud: 38 },
  { name: 'Jul', verifications: 3490, fraud: 43 },
];


export default function AdminDashboard({ user }: { user: any }) {
    return (
        <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-slate-800/60 border-slate-700 text-white backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">10,234</div>
                        <p className="text-xs text-slate-400">+5.2% from last month</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-800/60 border-slate-700 text-white backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Fraud Alerts</CardTitle>
                        <ShieldAlert className="h-4 w-4 text-red-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-red-400">12</div>
                        <p className="text-xs text-slate-400">Action Required</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-800/60 border-slate-700 text-white backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">Universities</CardTitle>
                        <Building2 className="h-4 w-4 text-slate-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">89</div>
                        <p className="text-xs text-slate-400">+3 since last week</p>
                    </CardContent>
                </Card>
                <Card className="bg-slate-800/60 border-slate-700 text-white backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-slate-300">System Status</CardTitle>
                        <Settings className="h-4 w-4 text-green-400" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">Operational</div>
                        <p className="text-xs text-slate-400">All systems normal</p>
                    </CardContent>
                </Card>
            </div>
            
            <Card className="bg-slate-800/60 border-slate-700 text-white backdrop-blur-sm col-span-1 lg:col-span-2">
                <CardHeader>
                    <CardTitle>System Overview</CardTitle>
                    <CardDescription className="text-slate-400">Real-time verification & fraud statistics</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                    <ResponsiveContainer width="100%" height={350}>
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted) / 0.2)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'hsl(var(--background) / 0.8)',
                                borderColor: 'hsl(var(--border))',
                                color: 'hsl(var(--foreground))'
                              }}
                            />
                            <Legend wrapperStyle={{fontSize: "14px"}}/>
                            <Bar dataKey="verifications" fill="hsl(var(--primary))" name="Verifications" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="fraud" fill="hsl(var(--destructive))" name="Fraud Detected" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>

        </div>
    );
}
