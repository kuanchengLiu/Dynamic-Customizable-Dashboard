// Default sample data for demonstration and testing
export const DEFAULT_SAMPLE_DATA = {
  // Sales data for bar charts
  salesData: [
    { month: 'Jan', sales: 4000, revenue: 2400, profit: 1600 },
    { month: 'Feb', sales: 3000, revenue: 1398, profit: 1200 },
    { month: 'Mar', sales: 2000, revenue: 9800, profit: 1800 },
    { month: 'Apr', sales: 2780, revenue: 3908, profit: 2100 },
    { month: 'May', sales: 1890, revenue: 4800, profit: 1500 },
    { month: 'Jun', sales: 2390, revenue: 3800, profit: 1700 },
    { month: 'Jul', sales: 3490, revenue: 4300, profit: 2200 },
  ],

  // User data for tables
  users: [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'User', status: 'Active' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Editor', status: 'Inactive' },
    { id: 4, name: 'David Brown', email: 'david@example.com', role: 'User', status: 'Active' },
    { id: 5, name: 'Eve Davis', email: 'eve@example.com', role: 'Admin', status: 'Active' },
  ],

  // Product metrics for dashboard stats
  metrics: {
    totalUsers: 15420,
    activeUsers: 8932,
    revenue: 125000,
    growth: 12.5,
    orders: 1847,
    conversionRate: 3.2,
  },

  // Time series data for line charts
  trafficData: [
    { date: '2024-01-01', visitors: 1200, pageViews: 4500, bounceRate: 35 },
    { date: '2024-01-02', visitors: 1350, pageViews: 5200, bounceRate: 32 },
    { date: '2024-01-03', visitors: 980, pageViews: 3800, bounceRate: 40 },
    { date: '2024-01-04', visitors: 1500, pageViews: 6100, bounceRate: 28 },
    { date: '2024-01-05', visitors: 1420, pageViews: 5800, bounceRate: 30 },
    { date: '2024-01-06', visitors: 1100, pageViews: 4200, bounceRate: 38 },
    { date: '2024-01-07', visitors: 1680, pageViews: 7200, bounceRate: 25 },
  ],

  // Donut/Pie chart data
  categoryDistribution: [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Food', value: 200 },
    { name: 'Books', value: 150 },
    { name: 'Other', value: 100 },
  ],

  // Radar chart data
  skillsRadar: [
    { subject: 'Performance', A: 120, B: 110, fullMark: 150 },
    { subject: 'Security', A: 98, B: 130, fullMark: 150 },
    { subject: 'Scalability', A: 86, B: 130, fullMark: 150 },
    { subject: 'Reliability', A: 99, B: 100, fullMark: 150 },
    { subject: 'Usability', A: 85, B: 90, fullMark: 150 },
    { subject: 'Efficiency', A: 65, B: 85, fullMark: 150 },
  ],

  // Progress bar data
  projectProgress: [
    { label: 'Frontend Development', value: 85, maxValue: 100 },
    { label: 'Backend API', value: 72, maxValue: 100 },
    { label: 'Database Design', value: 90, maxValue: 100 },
    { label: 'Testing Coverage', value: 65, maxValue: 100 },
    { label: 'Documentation', value: 45, maxValue: 100 },
  ],

  // Network/System metrics
  systemMetrics: {
    cpuUsage: 67,
    memoryUsage: 82,
    diskSpace: 45,
    networkLoad: 23,
    activeConnections: 1247,
    uptime: 99.9,
  },

  // Real-time style data
  liveMetrics: [
    { date: '00:00', cpu: 45, memory: 62, network: 30 },
    { date: '04:00', cpu: 32, memory: 58, network: 25 },
    { date: '08:00', cpu: 67, memory: 72, network: 45 },
    { date: '12:00', cpu: 89, memory: 85, network: 78 },
    { date: '16:00', cpu: 76, memory: 80, network: 65 },
    { date: '20:00', cpu: 54, memory: 68, network: 42 },
    { date: '24:00', cpu: 38, memory: 55, network: 28 },
  ],
};

export type DefaultDataKey = keyof typeof DEFAULT_SAMPLE_DATA;

export const DEFAULT_DATA_OPTIONS: { label: string; value: DefaultDataKey; description: string }[] = [
  { label: '📊 Sales Data (Bar Chart)', value: 'salesData', description: 'Monthly sales, revenue, and profit data' },
  { label: '📈 Traffic Data (Line Chart)', value: 'trafficData', description: 'Daily website traffic analytics' },
  { label: '🍩 Category Distribution (Donut)', value: 'categoryDistribution', description: 'Product category breakdown' },
  { label: '🎯 Skills Radar (Radar Chart)', value: 'skillsRadar', description: 'Multi-dimensional comparison' },
  { label: '⚡ Project Progress (Progress Bars)', value: 'projectProgress', description: 'Task completion status' },
  { label: '💻 System Metrics (Stats Grid)', value: 'systemMetrics', description: 'Server performance KPIs' },
  { label: '📡 Live Metrics (Area Chart)', value: 'liveMetrics', description: 'Real-time system monitoring' },
  { label: '👥 Users (Table)', value: 'users', description: 'Sample user directory data' },
  { label: '📋 Metrics (JSON)', value: 'metrics', description: 'Dashboard KPI metrics' },
];
