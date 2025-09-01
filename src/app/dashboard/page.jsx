'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import cn from '@/lib/utils';
import { 
  Users, 
  DollarSign, 
  ShoppingCart, 
  Package,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Zap,
  Target,
  Award,
  Truck,
  Eye,
  ShoppingBag,
  CreditCard
} from 'lucide-react';
import { KpiCard } from '@/components/KpiCard';

export default function DashboardPage() {
  const recentActivities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Ordered Whey Protein Premium 5lbs',
      time: '2 hours ago',
      type: 'order',
      avatar: 'JD',
      priority: 'high',
      amount: '$89.99'
    },
    {
      id: 2,
      user: 'Sarah Miller',
      action: 'Purchased Pre-Workout Bundle',
      time: '3 hours ago',
      type: 'purchase',
      avatar: 'SM',
      priority: 'normal',
      amount: '$129.50'
    },
    {
      id: 3,
      user: 'Mike Roberts',
      action: 'Left 5-star review on Creatine Monohydrate',
      time: '4 hours ago',
      type: 'review',
      avatar: 'MR',
      priority: 'normal'
    },
    {
      id: 4,
      user: 'Alex Kim',
      action: 'Added 3 items to wishlist',
      time: '6 hours ago',
      type: 'wishlist',
      avatar: 'AK',
      priority: 'normal'
    },
    {
      id: 5,
      user: 'Emma Wilson',
      action: 'Requested refund for Yoga Mat',
      time: '8 hours ago',
      type: 'refund',
      avatar: 'EW',
      priority: 'high',
      amount: '$45.00'
    }
  ];

  const lowStockProducts = [
    { name: 'Whey Protein Isolate', stock: 5, reorderLevel: 20, category: 'Supplements', status: 'critical' },
    { name: 'Resistance Bands Set', stock: 12, reorderLevel: 25, category: 'Equipment', status: 'low' },
    { name: 'Pre-Workout Energy', stock: 8, reorderLevel: 30, category: 'Supplements', status: 'critical' },
    { name: 'Yoga Mat Premium', stock: 15, reorderLevel: 20, category: 'Equipment', status: 'low' }
  ];

  const getActivityIcon = (type) => {
    const iconConfig = {
      order: { icon: ShoppingCart, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
      purchase: { icon: CreditCard, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
      review: { icon: Star, color: 'text-yellow-500', bg: 'bg-yellow-100 dark:bg-yellow-900/30' },
      wishlist: { icon: Eye, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
      refund: { icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
      default: { icon: ShoppingBag, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-900/30' }
    };
    
    const config = iconConfig[type] || iconConfig.default;
    const IconComponent = config.icon;
    
    return (
      <div className={cn("p-2 rounded-xl shadow-sm transition-all duration-200", config.bg)}>
        <IconComponent className={cn("h-4 w-4", config.color)} />
      </div>
    );
  };

  const getStockStatus = (status) => {
    const statusConfig = {
      critical: { variant: 'destructive', color: 'text-red-600' },
      low: { variant: 'secondary', color: 'text-orange-600' },
      good: { variant: 'default', color: 'text-green-600' }
    };
    return statusConfig[status] || statusConfig.good;
  };

  return (
    <div className="space-professional animate-slide-up">
      {/* Enhanced Welcome Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div className="space-y-3 animate-slide-in-left">
          <div className="flex items-center space-x-3">
            <h1 className="text-4xl font-bold tracking-tight text-gradient">
              Good morning, Admin
            </h1>
           
             
              {/* <Badge variant="outline" className="px-3 py-1 font-bold rounded-xl">
                Pro
              </Badge> */}
            
          </div>
          <p className="text-muted-foreground text-xl font-medium leading-relaxed">
            Here's what's happening at AN Fitness Store today
          </p>
          <div className="flex items-center space-x-4 mt-4">
            <Badge className="px-4 py-2 bg-green-100 text-green-800 border-green-200 dark:bg-white dark:text-blue-500 rounded-xl font-semibold">
              <CheckCircle className="h-4 w-4 mr-2" />
              Store Online & Operational
            </Badge>
            <Badge variant="outline" className="px-4 py-2 rounded-xl font-semibold">
              <Clock className="h-4 w-4 mr-2" />
              Last updated: {new Date().toLocaleTimeString()}
            </Badge>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 animate-slide-in-right">
          <Button variant="outline" className="btn-professional h-12 px-6 rounded-xl">
            <Target className="h-5 w-5 mr-2" />
            Set Sales Goals
          </Button>
          <Button className="btn-professional h-12 px-6 rounded-xl shadow-professional-lg bg-gradient-to-r from-primary to-primary/90">
            <ArrowUpRight className="h-5 w-5 mr-2" />
            View Analytics
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <KpiCard
          title="Total Customers"
          value="2,847"
          change="+18% from last month"
          changeType="increase"
          icon={Users}
          color="from-blue-500/10 to-blue-600/5"
          trend={[1245, 1568, 1772, 1989, 2112, 2425, 2847]}
        />
        <KpiCard
          title="Orders Today"
          value="47"
          change="+23% from yesterday"
          changeType="increase"
          icon={ShoppingCart}
          color="from-green-500/10 to-green-600/5"
          trend={[23, 31, 28, 35, 42, 38, 47]}
        />
        <KpiCard
          title="Revenue Today"
          value="$3,420"
          change="+12% from yesterday"
          changeType="increase"
          icon={DollarSign}
          color="from-purple-500/10 to-purple-600/5"
          trend={[1890, 2100, 1980, 2310, 2650, 3050, 3420]}
        />
        <KpiCard
          title="Products in Stock"
          value="156"
          change="4 items low stock"
          changeType="warning"
          icon={Package}
          color="from-orange-500/10 to-orange-600/5"
        />
      </div>

      {/* Enhanced Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Enhanced Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="shadow-professional-xl animate-scale-in card-professional">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 shadow-professional">
                      <Zap className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight">Recent Activity</CardTitle>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">
                    Latest customer orders, reviews, and store interactions
                  </p>
                </div>
                <Button variant="outline" className="btn-professional rounded-xl">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  View All Orders
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className={cn(
                    "flex items-center space-x-5 p-5 rounded-2xl transition-all duration-300 group cursor-pointer interactive-card",
                    "hover:bg-gradient-to-r hover:from-muted/30 hover:to-muted/10 border border-transparent hover:border-border/50",
                    activity.priority === 'high' && "bg-gradient-to-r from-primary/5 to-transparent border-primary/20"
                  )}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="w-14 h-14 bg-gradient-to-br from-card to-muted/20 rounded-2xl flex items-center justify-center font-bold text-base border border-border/30 group-hover:shadow-professional-lg transition-all duration-300 group-hover:scale-110">
                      {activity.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      {getActivityIcon(activity.type)}
                    </div>
                    {activity.priority === 'high' && (
                      <div className="absolute -top-1 -left-1">
                        <div className="w-4 h-4 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center shadow-professional">
                          <Star className="h-2.5 w-2.5 text-white" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <p className="font-bold text-base group-hover:text-primary transition-colors duration-200">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground font-medium leading-relaxed">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-xs text-muted-foreground font-bold bg-muted/30 px-3 py-1 rounded-xl">
                      {activity.time}
                    </div>
                    {activity.amount && (
                      <Badge variant="outline" className="text-xs px-2 py-0.5 rounded-lg font-semibold">
                        {activity.amount}
                      </Badge>
                    )}
                    {activity.priority === 'high' && !activity.amount && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 rounded-lg">
                        Priority
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-border/30">
                <Button variant="ghost" className="w-full h-12 rounded-xl hover:bg-accent/50 transition-all duration-200">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  View Order Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Inventory Alerts */}
        <div>
          <Card className="shadow-professional-xl animate-scale-in card-professional">
            <CardHeader className="pb-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 shadow-professional">
                    <Package className="h-5 w-5 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold tracking-tight">Inventory Alerts</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Products requiring attention and restocking
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {lowStockProducts.map((product, index) => {
                const statusConfig = getStockStatus(product.status);
                const stockPercentage = (product.stock / product.reorderLevel) * 100;
                
                return (
                  <div 
                    key={index} 
                    className={cn(
                      "p-5 rounded-2xl transition-all duration-300 group cursor-pointer interactive-card border border-border/30",
                      "bg-gradient-to-r from-card to-muted/10 hover:from-muted/20 hover:to-muted/5 hover:shadow-professional-lg",
                      product.status === 'critical' && "border-red-200 bg-red-50/30 dark:border-red-800 dark:bg-red-900/10"
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="space-y-1">
                        <p className="font-bold text-base group-hover:text-primary transition-colors duration-200">
                          {product.name}
                        </p>
                        <p className="text-sm text-muted-foreground font-medium">
                          {product.category}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-lg font-bold text-primary">{product.stock} left</p>
                        <Badge 
                          variant={statusConfig.variant} 
                          className="text-xs px-3 py-1 rounded-xl font-bold"
                        >
                          {product.status}
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Stock level bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground">Stock Level</span>
                        <span className={statusConfig.color}>
                          {product.stock}/{product.reorderLevel} (reorder level)
                        </span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-500 shadow-sm",
                            product.status === 'critical' ? "bg-gradient-to-r from-red-500 to-red-600" : "bg-gradient-to-r from-orange-500 to-orange-600"
                          )}
                          style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-4 space-y-3">
                <Button variant="outline" className="w-full h-12 rounded-xl btn-professional">
                  <Package className="h-4 w-4 mr-2" />
                  Manage Inventory
                </Button>
                <Button className="w-full h-12 rounded-xl btn-professional bg-gradient-to-r from-primary to-primary/90">
                  <Truck className="h-4 w-4 mr-2" />
                  Create Purchase Order
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Quick Actions */}
      <Card className="shadow-professional-xl animate-scale-in card-professional">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 shadow-professional">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Quick Actions</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Frequently used administrative tasks and store management tools
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Package, label: 'Add Product', color: 'from-blue-500 to-blue-600', description: 'Create new listing' },
              { icon: ShoppingCart, label: 'Process Orders', color: 'from-green-500 to-green-600', description: 'Manage fulfillment' },
              { icon: Users, label: 'Customer Support', color: 'from-purple-500 to-purple-600', description: 'Handle inquiries' },
              { icon: DollarSign, label: 'Sales Reports', color: 'from-orange-500 to-orange-600', description: 'View performance' }
            ].map((action, index) => (
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
                  `bg-gradient-to-br ${action.color} opacity-10 group-hover:opacity-20`
                )}>
                  <action.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div className="text-center space-y-1">
                  <span className="text-sm font-bold group-hover:text-primary transition-colors duration-200">
                    {action.label}
                  </span>
                  <p className="text-xs text-muted-foreground font-medium">
                    {action.description}
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