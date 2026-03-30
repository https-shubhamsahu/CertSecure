
export type AdminDashboardStatId = 'totalUniversities' | 'certificatesVerified' | 'fraudDetected' | 'systemUptime';

export type AdminDashboardStat = {
    id: AdminDashboardStatId;
    title: string;
    value: string;
    change: string;
    changeType: 'increase' | 'decrease';
    period: string;
};

export const adminDashboardStats: AdminDashboardStat[] = [
    { id: 'totalUniversities', title: 'Total Universities', value: '2,847', change: '+12.5%', changeType: 'increase', period: 'this month' },
    { id: 'certificatesVerified', title: 'Verified (Today)', value: '45,231', change: '+5.2%', changeType: 'increase', period: 'vs yesterday' },
    { id: 'fraudDetected', title: 'Fraud Alerts (24h)', value: '127', change: '-2.1%', changeType: 'decrease', period: 'vs yesterday' },
    { id: 'systemUptime', title: 'System Uptime', value: '99.97%', change: '+0.02%', changeType: 'increase', period: 'last 30 days' },
];

export const universityDistributionData = [
    { name: 'Government', value: 45 },
    { name: 'Private', value: 35 },
    { name: 'Deemed', value: 15 },
    { name: 'Foreign', value: 5 },
];

export const verificationTrendData = [
  { name: 'Jan', verified: 4000, fraud: 24 },
  { name: 'Feb', verified: 3000, fraud: 13 },
  { name: 'Mar', verified: 5000, fraud: 98 },
  { name: 'Apr', verified: 4780, fraud: 39 },
  { name: 'May', verified: 5890, fraud: 48 },
  { name: 'Jun', verified: 4390, fraud: 38 },
  { name: 'Jul', verified: 5490, fraud: 43 },
  { name: 'Aug', verified: 4490, fraud: 33 },
  { name: 'Sep', verified: 5190, fraud: 63 },
  { name: 'Oct', verified: 6490, fraud: 53 },
  { name: 'Nov', verified: 7490, fraud: 43 },
  { name: 'Dec', verified: 8490, fraud: 33 },
];

export type IndiaStateParticipationDatum = {
        /** Two-letter state/UT code matching the TopoJSON feature id (e.g. "MH"). */
        id: string;
        /** Participation score from 0–100 (demo data). */
        value: number;
};

// Demo heatmap data (stable, deterministic) for the choropleth map.
// IDs follow the same convention as the referenced TopoJSON.
export const indiaParticipationData: IndiaStateParticipationDatum[] = [
        { id: 'AP', value: 64 },
        { id: 'AR', value: 28 },
        { id: 'AS', value: 52 },
        { id: 'BR', value: 58 },
        { id: 'CT', value: 49 },
        { id: 'GA', value: 61 },
        { id: 'GJ', value: 72 },
        { id: 'HR', value: 69 },
        { id: 'HP', value: 55 },
        { id: 'JH', value: 43 },
        { id: 'KA', value: 77 },
        { id: 'KL', value: 74 },
        { id: 'MP', value: 46 },
        { id: 'MH', value: 81 },
        { id: 'MN', value: 35 },
        { id: 'ML', value: 33 },
        { id: 'MZ', value: 31 },
        { id: 'NL', value: 29 },
        { id: 'OR', value: 51 },
        { id: 'PB', value: 63 },
        { id: 'RJ', value: 47 },
        { id: 'SK', value: 26 },
        { id: 'TN', value: 79 },
        { id: 'TG', value: 67 },
        { id: 'TR', value: 27 },
        { id: 'UT', value: 57 },
        { id: 'UP', value: 54 },
        { id: 'WB', value: 60 },
        { id: 'AN', value: 22 },
        { id: 'CH', value: 44 },
        { id: 'DN', value: 38 },
        { id: 'DD', value: 34 },
        { id: 'DL', value: 83 },
        { id: 'JK', value: 41 },
        { id: 'LA', value: 19 },
        { id: 'LD', value: 15 },
        { id: 'PY', value: 53 },
];

export type RecentActivityStatus = 'Verified' | 'Fraudulent' | 'Pending';

export const recentActivity: Array<{
    id: number;
    university: string;
    state: string;
    status: RecentActivityStatus;
    timestamp: string;
}> = [
    { id: 1, university: 'Delhi University', state: 'Delhi', status: 'Verified', timestamp: '2 minutes ago' },
    { id: 2, university: 'Mumbai University', state: 'Maharashtra', status: 'Fraudulent', timestamp: '5 minutes ago' },
    { id: 3, university: 'Anna University', state: 'Tamil Nadu', status: 'Verified', timestamp: '10 minutes ago' },
    { id: 4, university: 'JNU', state: 'Delhi', status: 'Pending', timestamp: '12 minutes ago' },
    { id: 5, university: 'IIT Bombay', state: 'Maharashtra', status: 'Verified', timestamp: '15 minutes ago' },
];
