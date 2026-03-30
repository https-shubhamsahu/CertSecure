
'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = [
    'hsl(var(--chart-1))',
    'hsl(var(--chart-2))',
    'hsl(var(--chart-3))',
    'hsl(var(--chart-4))',
];

type DistributionDatum = {
    name: string;
    value: number;
};

type TooltipPayloadItem = {
    name: string;
    value: number;
};

const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: TooltipPayloadItem[] }) => {
    if (active && payload && payload.length) {
        return (
            <div className="rounded-lg surface p-2">
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

export default function UniversityDistributionChart({ data }: { data: DistributionDatum[] }) {
    return (
        <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
            <div className="min-w-0">
                <ResponsiveContainer width="100%" height={220}>
                    <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
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
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 sm:flex-col sm:items-start sm:justify-start">
                {data.map((item, index) => (
                    <li key={item.name} className="flex items-center gap-2 text-sm text-foreground/90">
                        <span
                            className="h-2.5 w-2.5 shrink-0 rounded-full"
                            style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            aria-hidden="true"
                        />
                        <span className="whitespace-nowrap">{item.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
