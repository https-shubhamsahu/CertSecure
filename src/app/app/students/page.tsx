
'use client';

import StudentDatabase from '@/components/features/StudentDatabase';
import { Database } from 'lucide-react';

export default function StudentsPage() {
  return (
    <div className="animate-fade-in">
        <div className='flex items-center gap-3 mb-6'>
            <Database className='w-8 h-8 text-primary' />
            <h1 className="text-3xl font-bold font-literata">Student Database</h1>
        </div>
        <StudentDatabase />
    </div>
  );
}
