'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  Users, 
  ShoppingCart,
  Package,
  Calendar,
  Download,
  Filter,
  Eye,
  Target,
  Zap,
  Activity,
  PieChart,
  LineChart
} from 'lucide-react';
import { KpiCard } from '@/components/KpiCard';
import cn from '@/lib/utils';

// Mock analytics data
const analyticsData = {
  overview: {
    totalRevenue: 45230.89,
    revenueGrowth: 12.5,
    totalOrders: 1847,
    orderGrowth: 8.3,
    avgOrderValue: 94.52,
    aovGrowth: 4.2,
    conversionRate: 3.8,
    conversionGrowth: 0.5
  },
  salesTrend: [
    { month: 'Jan', revenue: 3200, orders: 89 },
    { month: 'Feb', revenue: 4100, orders: 112 },
    { month: 'Mar', revenue: 3800, orders: 98 },
    { month: 'Apr', revenue: 5200, orders: 145 },
    { month: 'May', revenue: 6100, orders: 167 },
    { month: 'Jun', revenue: 5800, orders: 156 },
    { month: 'Jul', revenue: 7200, orders: 189 },
    { month: 'Aug', revenue: 9830, orders: 234 }
  ],
  topProducts: [
    { name: 'Whey Protein 5lbs', revenue: 8450, units: 234, growth: 15.2 },
    { name: 'Pre-Workout Energy', revenue: 6230, units: 189, growth: 8.7 },
    { name: 'Resistance Bands', revenue: 4560, units: 156, growth: 12.1 },
    { name: 'Yoga Mat Premium', revenue: 3890, units: 98, growth: -2.3 },
    { name: 'Protein Shaker', revenue: 2340, units: 167, growth: 22.4 }
  ],
  customerSegments: [
    { segment: 'Premium', count: 234, revenue: 18450, percentage: 35 },
    { segment: 'Regular', count: 567, revenue: 15230, percentage: 45 },
    { segment: 'New', count: 189, revenue: 8950, percentage: 20 }
  ],
  trafficSources: [
    { source: 'Organic Search', visitors: 2340, conversions: 89, rate: 3.8 },
    { source: 'Social Media', visitors: 1890, conversions: 67, rate: 3.5 },
    { source: 'Direct', visitors: 1560, conversions: 78, rate: 5.0 },
    { source: 'Email', visitors: 890, conversions: 45, rate: 5.1 },
    { source: 'Paid Ads', visitors: 1200, conversions: 34, rate: 2.8 }
  ]
};

export default function AnalyticsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="space-professional animate-slide-up p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-20 bg-muted/50 rounded-2xl" />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-muted/50 rounded-2xl" />
            ))}
          </div>
          <div className="grid gap-8 lg:grid-cols-2">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-96 bg-muted/50 rounded-2xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-professional animate-slide-up p-8">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div className="space-y-3 animate-slide-in-left">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 shadow-professional">
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gradient">
                Analytics & Reports
              </h2>
              <p className="text-muted-foreground text-xl font-medium leading-relaxed">
                Comprehensive insights into your business performance
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 animate-slide-in-right">
          <div className="flex items-center space-x-2">
            <Button 
              variant={timeRange === '7d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setTimeRange('7d')}
              className="rounded-xl"
            >
              7 Days
            </Button>
            <Button 
              variant={timeRange === '30d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setTimeRange('30d')}
              className="rounded-xl"
            >
              30 Days
            </Button>
            <Button 
              variant={timeRange === '90d' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setTimeRange('90d')}
              className="rounded-xl"
            >
              90 Days
            </Button>
          </div>
          <Button variant="outline" className="btn-professional h-12 px-6 rounded-xl">
            <Download className="mr-2 h-5 w-5" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <KpiCard
          title="Total Revenue"
          value={`$${analyticsData.overview.totalRevenue.toLocaleString()}`}
          change={`+${analyticsData.overview.revenueGrowth}% from last month`}
          changeType="increase"
          icon={DollarSign}
          color="from-green-500/10 to-green-600/5"
          trend={analyticsData.salesTrend.map(d => d.revenue)}
        />
        <KpiCard
          title="Total Orders"
          value={analyticsData.overview.totalOrders.toLocaleString()}
          change={`+${analyticsData.overview.orderGrowth}% from last month`}
          changeType="increase"
          icon={ShoppingCart}
          color="from-blue-500/10 to-blue-600/5"
          trend={analyticsData.salesTrend.map(d => d.orders)}
        />
        <KpiCard
          title="Avg Order Value"
          value={`$${analyticsData.overview.avgOrderValue}`}
          change={`+${analyticsData.overview.aovGrowth}% from last month`}
          changeType="increase"
          icon={Target}
          color="from-purple-500/10 to-purple-600/5"
        />
        <KpiCard
          title="Conversion Rate"
          value={`${analyticsData.overview.conversionRate}%`}
          change={`+${analyticsData.overview.conversionGrowth}% from last month`}
          changeType="increase"
          icon={TrendingUp}
          color="from-orange-500/10 to-orange-600/5"
        />
      </div>

      {/* Charts Grid */}
      <div className="grid gap-8 lg:grid-cols-2 mb-12">
        {/* Sales Trend Chart */}
        <Card className="shadow-professional-xl card-professional">
          <CardHeader className="pb-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 shadow-professional">
                    <LineChart className="h-5 w-5 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold tracking-tight">Sales Trend</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Revenue and order trends over the last 8 months
                </p>
              </div>
              <Badge variant="outline" className="font-bold px-4 py-2 rounded-xl">
                <TrendingUp className="h-4 w-4 mr-2" />
                +12.5% Growth
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-end space-x-2 p-4 bg-gradient-to-t from-muted/20 to-transparent rounded-2xl">
              {analyticsData.salesTrend.map((data, index) => (
                <div key={index} className="flex-1 flex flex-col items-center space-y-2">
                  <div 
                    className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all duration-500 hover:from-primary/80 hover:to-primary/40 cursor-pointer group relative"
                    style={{ 
                      height: `${(data.revenue / Math.max(...analyticsData.salesTrend.map(d => d.revenue))) * 100}%`,
                      minHeight: '20px'
                    }}
                  >
                    <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-card border border-border/30 rounded-lg px-2 py-1 shadow-professional">
                      <span className="text-xs font-bold">${data.revenue.toLocaleString()}</span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{data.month}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Products */}
        <Card className="shadow-professional-xl card-professional">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 shadow-professional">
                  <Package className="h-5 w-5 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Top Products</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Best performing products by revenue and units sold
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.topProducts.map((product, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-transparent border border-border/30 hover:shadow-professional transition-all duration-300 group cursor-pointer"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-border/30 shadow-professional group-hover:shadow-professional-lg transition-all duration-300">
                    <Package className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-base group-hover:text-primary transition-colors duration-200">
                      {product.name}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium">
                      {product.units} units sold
                    </p>
                  </div>
                </div>
                <div className="text-right space-y-1">
                  <p className="font-bold text-lg text-primary">
                    ${product.revenue.toLocaleString()}
                  </p>
                  <Badge 
                    variant={product.growth > 0 ? 'default' : 'destructive'}
                    className="text-xs px-2 py-0.5 rounded-lg font-bold"
                  >
                    {product.growth > 0 ? '+' : ''}{product.growth}%
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Customer Segments & Traffic Sources */}
      <div className="grid gap-8 lg:grid-cols-2 mb-12">
        {/* Customer Segments */}
        <Card className="shadow-professional-xl card-professional">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-pink-500/10 to-pink-600/5 shadow-professional">
                  <Users className="h-5 w-5 text-pink-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Customer Segments</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Revenue distribution across customer segments
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {analyticsData.customerSegments.map((segment, index) => (
              <div key={index} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={cn(
                      "w-4 h-4 rounded-full",
                      index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-purple-500'
                    )} />
                    <span className="font-bold text-base">{segment.segment}</span>
                    <Badge variant="outline" className="text-xs px-2 py-0.5 rounded-lg font-medium">
                      {segment.count} customers
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-primary">
                      ${segment.revenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {segment.percentage}% of total
                    </p>
                  </div>
                </div>
                <div className="w-full bg-muted/50 rounded-full h-3 overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-500",
                      index === 0 ? 'bg-gradient-to-r from-blue-500 to-blue-600' :
                      index === 1 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      'bg-gradient-to-r from-purple-500 to-purple-600'
                    )}
                    style={{ width: `${segment.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Traffic Sources */}
        <Card className="shadow-professional-xl card-professional">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 shadow-professional">
                  <Activity className="h-5 w-5 text-orange-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Traffic Sources</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Website traffic and conversion rates by source
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {analyticsData.trafficSources.map((source, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-transparent border border-border/30 hover:shadow-professional transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-1">
                  <p className="font-bold text-base group-hover:text-primary transition-colors duration-200">
                    {source.source}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {source.visitors.toLocaleString()} visitors
                  </p>
                </div>
                <div className="text-right space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-lg text-primary">
                      {source.conversions}
                    </span>
                    <span className="text-sm text-muted-foreground">conversions</span>
                  </div>
                  <Badge 
                    variant="outline"
                    className="text-xs px-2 py-0.5 rounded-lg font-bold"
                  >
                    {source.rate}% rate
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-professional-xl card-professional">
        <CardHeader className="pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 shadow-professional">
                <Zap className="h-5 w-5 text-indigo-600" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight">Analytics Tools</CardTitle>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Advanced analytics and reporting tools for deeper insights
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: PieChart, label: 'Revenue Breakdown', color: 'from-blue-500 to-blue-600', description: 'Detailed analysis' },
              { icon: LineChart, label: 'Trend Analysis', color: 'from-green-500 to-green-600', description: 'Growth patterns' },
              { icon: Users, label: 'Customer Insights', color: 'from-purple-500 to-purple-600', description: 'Behavior analysis' },
              { icon: Target, label: 'Goal Tracking', color: 'from-orange-500 to-orange-600', description: 'Performance metrics' }
            ].map((tool, index) => (
              <Button 
                key={index}
                variant="outline" 
                className={cn(
                  "h-24 flex-col space-y-3 transition-all duration-300 group rounded-2xl border-border/30",
                  "hover:shadow-professional-lg hover:scale-105 hover:border-primary/30 interactive-card"
                )}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn(
                  "p-3 rounded-xl bg-gradient-to-br transition-all duration-300 shadow-professional group-hover:shadow-professional-lg",
                  `bg-gradient-to-br ${tool.color} opacity-10 group-hover:opacity-20`
                )}>
                  <tool.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-sm font-bold group-hover:text-primary transition-colors duration-200">
                    {tool.label}
                  </span>
                  <p className="text-xs text-muted-foreground font-medium">
                    {tool.description}
                  </p>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}