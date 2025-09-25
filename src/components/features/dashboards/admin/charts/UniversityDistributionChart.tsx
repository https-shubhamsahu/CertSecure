
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const COLORS = ['#2563eb', '#10b981', '#f59e0b', '#6366f1'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg border bg-background p-2 shadow-sm">
                <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                            {payload[0].name}
                        </span>
                        <span className="font-bold text-muted-foreground">
                            {payload[0].value}%
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    return null;
};

export default function UniversityDistributionChart({ data }: { data: any[] }) {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <PieChart>
                <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    nameKey="name"
                >
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend iconSize={10} layout="vertical" verticalAlign="middle" align="right" />
            </PieChart>
        </ResponsiveContainer>
    );
}
