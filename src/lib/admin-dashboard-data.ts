
export const adminDashboardStats = [
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

export const recentActivity = [
    { id: 1, university: 'Delhi University', state: 'Delhi', status: 'Verified', timestamp: '2 minutes ago' },
    { id: 2, university: 'Mumbai University', state: 'Maharashtra', status: 'Fraudulent', timestamp: '5 minutes ago' },
    { id: 3, university: 'Anna University', state: 'Tamil Nadu', status: 'Verified', timestamp: '10 minutes ago' },
    { id: 4, university: 'JNU', state: 'Delhi', status: 'Pending', timestamp: '12 minutes ago' },
    { id: 5, university: 'IIT Bombay', state: 'Maharashtra', status: 'Verified', timestamp: '15 minutes ago' },
];
