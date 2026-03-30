
'use client';

import { BarChart2, CheckCircle, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, Sector } from 'recharts';
import { useState } from 'react';


const verificationData = [
  { name: 'Jan', verifications: 420, fraudulent: 24 },
  { name: 'Feb', verifications: 350, fraudulent: 13 },
  { name: 'Mar', verifications: 510, fraudulent: 38 },
  { name: 'Apr', verifications: 680, fraudulent: 39 },
  { name: 'May', verifications: 590, fraudulent: 48 },
  { name: 'Jun', verifications: 720, fraudulent: 38 },
];

const statusData = [
    { name: 'Verified', value: 1250 },
    { name: 'Fraudulent', value: 85 },
    { name: 'Pending', value: 210 },
];

const COLORS = {
    Verified: 'hsl(var(--chart-2))',
    Fraudulent: 'hsl(var(--destructive))',
    Pending: 'hsl(var(--warning))',
};

type ActiveShapeProps = {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    startAngle: number;
    endAngle: number;
    fill: string;
    payload: { name: string };
    percent: number;
    value: number;
};

const renderActiveShape = (props: unknown) => {
  const RADIAN = Math.PI / 180;
    const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props as ActiveShapeProps;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill} className="font-bold text-lg">
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="hsl(var(--foreground))">{`Count ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="hsl(var(--muted-foreground))">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};


export default function AnalyticsPage() {
    const [activeIndex, setActiveIndex] = useState(0);
    const onPieEnter = (_data: unknown, index: number) => {
        setActiveIndex(index);
    };

  return (
    <div className="animate-fade-in space-y-6">
        <div className='flex items-center gap-3'>
            <BarChart2 className='w-8 h-8 text-primary' />
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-glass">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Verifications</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">3,200</div>
                    <p className="text-xs text-muted-foreground">+15.2% from last month</p>
                </CardContent>
            </Card>
            <Card className="bg-glass">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Fraudulent Detections</CardTitle>
                    <ShieldAlert className="h-4 w-4 text-destructive" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-destructive">162</div>
                    <p className="text-xs text-muted-foreground">-5.1% from last month</p>
                </CardContent>
            </Card>
             <Card className="bg-glass">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Verification Success Rate</CardTitle>
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-emerald-500">95.2%</div>
                    <p className="text-xs text-muted-foreground">Represents overall accuracy</p>
                </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            <Card className="lg:col-span-3 bg-glass">
                <CardHeader>
                    <CardTitle>Verification Trends</CardTitle>
                    <CardDescription>Verifications vs. Fraudulent detections over time.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={verificationData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--muted)/0.3)" />
                            <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false}/>
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'hsl(var(--background) / 0.8)',
                                    backdropFilter: 'blur(10px)',
                                    borderColor: 'hsl(var(--border))',
                                    color: 'hsl(var(--foreground))'
                                }}
                            />
                            <Legend wrapperStyle={{fontSize: "14px"}}/>
                            <Bar dataKey="verifications" fill="hsl(var(--primary))" name="Verifications" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="fraudulent" fill="hsl(var(--destructive))" name="Fraudulent" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
            <Card className="lg:col-span-2 bg-glass">
                <CardHeader>
                    <CardTitle>Verification Status Distribution</CardTitle>
                    <CardDescription>A breakdown of all verification outcomes.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie
                                activeIndex={activeIndex}
                                activeShape={renderActiveShape}
                                data={statusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="hsl(var(--primary))"
                                dataKey="value"
                                onMouseEnter={onPieEnter}
                            >
                                {statusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                                ))}
                            </Pie>
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
