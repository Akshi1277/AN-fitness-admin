'use client';

import { useState, useEffect } from 'react';
import { KpiCard } from '@/components/KpiCard';
import { ChartCard } from '@/components/ChartCard';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Package, Users, CreditCard } from 'lucide-react';

// Mock data imports
import salesData from '@/mock-data/sales.json';

// Chart components
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Process data for charts
  const salesOverTimeData = salesData.salesOverTime.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short' })
  }));

  const salesByCategoryData = salesData.byCategory.map((item, index) => ({
    name: item.category,
    value: item.revenue,
    color: COLORS[index % COLORS.length]
  }));

  // Table columns for recent orders
  const orderColumns = [
    { key: 'id', header: 'Order ID' },
    { key: 'product', header: 'Product' },
    { 
      key: 'customer', 
      header: 'Customer',
      cellClassName: 'font-medium'
    },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (row) => `$${row.amount.toFixed(2)}`
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (row) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          row.status === 'completed' ? 'bg-green-100 text-green-800' :
          row.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
        <div className="flex items-center space-x-2">
          <Button variant="outline">Export</Button>
          <Button>New Order</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="Total Revenue" 
          value={`$${salesData.kpis.totalRevenue.toLocaleString()}`} 
          change="+20.1%" 
          changeType="increase"
          icon={TrendingUp}
        />
        <KpiCard 
          title="Total Orders" 
          value={salesData.kpis.totalOrders.toLocaleString()}
          change="+12.5%"
          changeType="increase"
          icon={Package}
        />
        <KpiCard 
          title="Total Customers" 
          value={salesData.kpis.totalCustomers.toLocaleString()}
          change="+8.2%"
          changeType="increase"
          icon={Users}
        />
        <KpiCard 
          title="Avg. Order Value" 
          value={`$${salesData.kpis.avgOrderValue.toFixed(2)}`}
          change="+5.3%"
          changeType="increase"
          icon={CreditCard}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Sales Over Time */}
        <ChartCard title="Sales Over Time">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesOverTimeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#6b7280' }}
                  tickFormatter={(value) => `$${value/1000}k`}
                />
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        {/* Sales by Category */}
        <ChartCard title="Sales by Category">
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesByCategoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {salesByCategoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`$${value}`, 'Revenue']}
                />
                <Legend 
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  wrapperStyle={{ paddingTop: '20px' }}
                  formatter={(value, entry, index) => (
                    <span style={{ color: '#4B5563' }}>
                      {salesByCategoryData[index].name}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      {/* Recent Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={orderColumns} 
            data={salesData.recentOrders} 
            isLoading={isLoading}
            emptyMessage="No orders found"
          />
        </CardContent>
      </Card>
    </div>
  );
}
