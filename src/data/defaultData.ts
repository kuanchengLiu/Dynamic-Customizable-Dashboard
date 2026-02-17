// Default sample data for demonstration and testing
export const DEFAULT_SAMPLE_DATA = {
  // Sales data for charts
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

  // Product metrics for dashboard
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

  // Pie chart data
  categoryDistribution: [
    { name: 'Electronics', value: 400 },
    { name: 'Clothing', value: 300 },
    { name: 'Food', value: 200 },
    { name: 'Books', value: 150 },
    { name: 'Other', value: 100 },
  ],
};

export type DefaultDataKey = keyof typeof DEFAULT_SAMPLE_DATA;

export const DEFAULT_DATA_OPTIONS: { label: string; value: DefaultDataKey; description: string }[] = [
  { label: 'Sales Data (Charts)', value: 'salesData', description: 'Monthly sales, revenue, and profit data' },
  { label: 'Users (Table)', value: 'users', description: 'Sample user directory data' },
  { label: 'Metrics (JSON)', value: 'metrics', description: 'Dashboard KPI metrics' },
  { label: 'Traffic Data (Line Chart)', value: 'trafficData', description: 'Daily website traffic analytics' },
  { label: 'Category Distribution (Pie)', value: 'categoryDistribution', description: 'Product category breakdown' },
];
