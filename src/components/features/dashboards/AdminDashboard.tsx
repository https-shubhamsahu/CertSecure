
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Map } from 'lucide-react';
import {
    adminDashboardStats,
    indiaParticipationData,
    universityDistributionData,
    verificationTrendData,
} from '@/lib/admin-dashboard-data';
import StatCards from './admin/StatCards';
import VerificationTrendChart from './admin/charts/VerificationChart';
import UniversityDistributionChart from './admin/charts/UniversityDistributionChart';
import { IndiaChoroplethMap } from './admin/charts/IndiaChoroplethMap';
import RecentActivity from './admin/RecentActivity';
import Link from 'next/link';

type DashboardUser = {
    firstName: string;
};

export default function AdminDashboard({ user }: { user: DashboardUser }) {
    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back, {user.firstName}. Here&apos;s the nationwide overview.</p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search universities..." className="pl-10" />
                    </div>
                    <Button variant="soft" className="border-primary/10" asChild>
                        <Link href="/app/analytics">
                            <Map className="mr-2 h-4 w-4" />
                            View Regions
                        </Link>
                    </Button>
                </div>
            </header>
            
            <StatCards stats={adminDashboardStats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Nationwide Participation</CardTitle>
                        <CardDescription>Participation index by state/UT (demo data).</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[360px] sm:h-[420px] lg:h-[450px] rounded-lg surface-press p-3 sm:p-4">
                        <IndiaChoroplethMap
                            data={indiaParticipationData}
                            valueLabel="Participation"
                            valueFormatter={(v) => `${v}%`}
                        />
                    </CardContent>
                </Card>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Activity</CardTitle>
                            <CardDescription>Live feed of verifications and alerts.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <RecentActivity />
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>University Distribution</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <UniversityDistributionChart data={universityDistributionData} />
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Verification Trends</CardTitle>
                    <CardDescription>Last 12 months of activity.</CardDescription>
                </CardHeader>
                <CardContent>
                    <VerificationTrendChart data={verificationTrendData} />
                </CardContent>
            </Card>

        </div>
    );
}
