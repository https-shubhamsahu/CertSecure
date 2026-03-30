
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, CheckCircle, ShieldAlert, Server, ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const iconMap = {
    totalUniversities: <Users className="h-5 w-5 text-muted-foreground" />,
    certificatesVerified: <CheckCircle className="h-5 w-5 text-muted-foreground" />,
    fraudDetected: <ShieldAlert className="h-5 w-5 text-red-500" />,
    systemUptime: <Server className="h-5 w-5 text-emerald-500" />,
};

type StatId = keyof typeof iconMap;

type Stat = {
    id: StatId;
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
    period: string;
};

export default function StatCards({ stats }: { stats: Stat[] }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <Card key={stat.id} className="bg-glass">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        {iconMap[stat.id]}
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="flex items-center text-xs text-muted-foreground">
                             <span className={cn(
                                'flex items-center gap-1',
                                stat.changeType === 'increase' ? 'text-emerald-500' : 'text-red-500'
                            )}>
                                {stat.changeType === 'increase' ? <ArrowUp className="h-3 w-3" /> : <ArrowDown className="h-3 w-3" />}
                                {stat.change}
                            </span>
                            <span className="ml-2">{stat.period}</span>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
