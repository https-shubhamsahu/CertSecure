
'use client';

import { BarChart2 } from 'lucide-react';

export default function AnalyticsPage() {
  return (
    <div className="animate-fade-in">
        <div className='flex items-center gap-3 mb-6'>
            <BarChart2 className='w-8 h-8 text-primary' />
            <h1 className="text-3xl font-bold font-literata">Analytics & Reports</h1>
        </div>
        <p className="text-lg text-muted-foreground">
            This is where analytics and reports will be displayed.
        </p>
    </div>
  );
}
