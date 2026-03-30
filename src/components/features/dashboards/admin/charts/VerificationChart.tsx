
'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type VerificationTrendPoint = {
    name: string;
    verified: number;
    fraud: number;
};

export default function VerificationTrendChart({ data }: { data: VerificationTrendPoint[] }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <AreaChart
                data={data}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted)/0.3)" />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                <Tooltip
                    contentStyle={{
                        backgroundColor: 'hsl(var(--background) / 0.8)',
                        backdropFilter: 'blur(10px)',
                        borderColor: 'hsl(var(--border))',
                        color: 'hsl(var(--foreground))'
                    }}
                />
                <defs>
                    <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="verified" stroke="hsl(var(--chart-1))" fill="url(#colorVerified)" />
                <Area type="monotone" dataKey="fraud" stroke="hsl(var(--destructive))" fill="url(#colorFraud)" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
