
'use client';

import { recentActivity } from '@/lib/admin-dashboard-data';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Check, ShieldAlert, Clock } from 'lucide-react';

import type { ReactNode } from 'react';
import type { RecentActivityStatus } from '@/lib/admin-dashboard-data';

const activityIcons: Record<RecentActivityStatus, ReactNode> = {
    Verified: <Check className="h-4 w-4 text-emerald-500" />,
    Fraudulent: <ShieldAlert className="h-4 w-4 text-red-500" />,
    Pending: <Clock className="h-4 w-4 text-amber-500" />,
};

export default function RecentActivity() {
    return (
        <ScrollArea className="h-48">
            <div className="space-y-4">
                {recentActivity.map((item) => (
                    <div key={item.id} className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                           {activityIcons[item.status]}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium">
                                {item.university} ({item.state})
                            </p>
                            <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                        </div>
                        <Badge
                            variant={
                                item.status === 'Verified' ? 'success' :
                                item.status === 'Fraudulent' ? 'destructive' :
                                'secondary'
                            }
                            className="text-xs"
                        >
                            {item.status}
                        </Badge>
                    </div>
                ))}
            </div>
        </ScrollArea>
    );
}
