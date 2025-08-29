'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  DollarSign, 
  Activity, 
  Calendar,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { KpiCard } from '@/components/KpiCard';

export default function DashboardPage() {
  const recentActivities = [
    {
      id: 1,
      user: 'John Doe',
      action: 'Checked in for Yoga Class',
      time: '2 hours ago',
      type: 'checkin',
      avatar: 'JD',
      priority: 'normal'
    },
    {
      id: 2,
      user: 'Sarah Miller',
      action: 'Purchased Whey Protein 5lbs',
      time: '3 hours ago',
      type: 'purchase',
      avatar: 'SM',
      priority: 'high'
    },
    {
      id: 3,
      user: 'Mike Roberts',
      action: 'Renewed Premium Membership',
      time: '5 hours ago',
      type: 'renewal',
      avatar: 'MR',
      priority: 'high'
    },
    {
      id: 4,
      user: 'Alex Kim',
      action: 'Booked Personal Training Session',
      time: '6 hours ago',
      type: 'booking',
      avatar: 'AK',
      priority: 'normal'
    },
    {
      id: 5,
      user: 'Emma Wilson',
      action: 'Completed HIIT Workout',
      time: '8 hours ago',
      type: 'workout',
      avatar: 'EW',
      priority: 'normal'
    }
  ];

  const upcomingClasses = [
    { name: 'Morning Yoga', time: '09:00 AM', instructor: 'Lisa Chen', spots: 8, capacity: 15, status: 'available' },
    { name: 'HIIT Training', time: '11:00 AM', instructor: 'Mark Johnson', spots: 12, capacity: 20, status: 'available' },
    { name: 'Pilates', time: '02:00 PM', instructor: 'Sarah Davis', spots: 6, capacity: 12, status: 'filling' },
    { name: 'Strength Training', time: '05:00 PM', instructor: 'Tom Wilson', spots: 15, capacity: 25, status: 'available' }
  ];

  const getActivityIcon = (type) => {
    const iconConfig = {
      checkin: { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
      purchase: { icon: DollarSign, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
      renewal: { icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
      booking: { icon: Calendar, color: 'text-orange-500', bg: 'bg-orange-100 dark:bg-orange-900/30' },
      workout: { icon: Activity, color: 'text-red-500', bg: 'bg-red-100 dark:bg-red-900/30' },
      default: { icon: AlertCircle, color: 'text-gray-500', bg: 'bg-gray-100 dark:bg-gray-900/30' }
    };
    
    const config = iconConfig[type] || iconConfig.default;
    const IconComponent = config.icon;
    
    return (
      <div className={cn("p-2 rounded-xl shadow-sm transition-all duration-200", config.bg)}>
        <IconComponent className={cn("h-4 w-4", config.color)} />
      </div>
    );
  };

  const getClassStatus = (status) => {
    const statusConfig = {
      available: { variant: 'default', color: 'text-green-600' },
      filling: { variant: 'secondary', color: 'text-orange-600' },
      full: { variant: 'destructive', color: 'text-red-600' }
    };
    return statusConfig[status] || statusConfig.available;
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
            <div className="flex items-center space-x-2">
              <Star className="h-6 w-6 text-yellow-500 animate-bounce-subtle" />
              <Badge variant="outline" className="px-3 py-1 font-bold rounded-xl">
                Pro
              </Badge>
            </div>
          </div>
          <p className="text-muted-foreground text-xl font-medium leading-relaxed">
            Here's what's happening at AN Fitness today
          </p>
          <div className="flex items-center space-x-4 mt-4">
            <Badge className="px-4 py-2 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 rounded-xl font-semibold">
              <CheckCircle className="h-4 w-4 mr-2" />
              All Systems Operational
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
            Set Goals
          </Button>
          <Button className="btn-professional h-12 px-6 rounded-xl shadow-professional-lg bg-gradient-to-r from-primary to-primary/90">
            <ArrowUpRight className="h-5 w-5 mr-2" />
            View Full Reports
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        <KpiCard
          title="Total Members"
          value="1,234"
          change="+12% from last month"
          changeType="increase"
          icon={Users}
          color="from-blue-500/10 to-blue-600/5"
          trend={[45, 68, 72, 89, 112, 125, 134]}
        />
        <KpiCard
          title="Active Members"
          value="856"
          change="+8% from last month"
          changeType="increase"
          icon={Activity}
          color="from-green-500/10 to-green-600/5"
          trend={[523, 545, 567, 589, 612, 634, 656]}
        />
        <KpiCard
          title="Monthly Revenue"
          value="$24,560"
          change="+15% from last month"
          changeType="increase"
          icon={DollarSign}
          color="from-purple-500/10 to-purple-600/5"
          trend={[1245, 1890, 2100, 1980, 2310, 1928, 2000]}
        />
        <KpiCard
          title="Classes Today"
          value="8"
          change="Next class in 2 hours"
          changeType="none"
          icon={Calendar}
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
                    Latest member interactions and transactions across the platform
                  </p>
                </div>
                <Button variant="outline" className="btn-professional rounded-xl">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  View All Activity
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
                    {activity.priority === 'high' && (
                      <Badge variant="secondary" className="text-xs px-2 py-0.5 rounded-lg">
                        Priority
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t border-border/30">
                <Button variant="ghost" className="w-full h-12 rounded-xl hover:bg-accent/50 transition-all duration-200">
                  <Activity className="h-4 w-4 mr-2" />
                  View Activity Timeline
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Enhanced Today's Classes */}
        <div>
          <Card className="shadow-professional-xl animate-scale-in card-professional">
            <CardHeader className="pb-6">
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-br from-orange-500/10 to-orange-600/5 shadow-professional">
                    <Calendar className="h-5 w-5 text-orange-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold tracking-tight">Today's Classes</CardTitle>
                </div>
                <p className="text-sm text-muted-foreground font-medium">
                  Upcoming fitness sessions and availability
                </p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingClasses.map((classItem, index) => {
                const statusConfig = getClassStatus(classItem.status);
                const fillPercentage = ((classItem.capacity - classItem.spots) / classItem.capacity) * 100;
                
                return (
                  <div 
                    key={index} 
                    className={cn(
                      "p-5 rounded-2xl transition-all duration-300 group cursor-pointer interactive-card border border-border/30",
                      "bg-gradient-to-r from-card to-muted/10 hover:from-muted/20 hover:to-muted/5 hover:shadow-professional-lg"
                    )}
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="space-y-1">
                        <p className="font-bold text-base group-hover:text-primary transition-colors duration-200">
                          {classItem.name}
                        </p>
                        <p className="text-sm text-muted-foreground font-medium">
                          with {classItem.instructor}
                        </p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-lg font-bold text-primary">{classItem.time}</p>
                        <Badge 
                          variant={statusConfig.variant} 
                          className="text-xs px-3 py-1 rounded-xl font-bold"
                        >
                          {classItem.spots} spots left
                        </Badge>
                      </div>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-muted-foreground">Capacity</span>
                        <span className={statusConfig.color}>
                          {classItem.capacity - classItem.spots}/{classItem.capacity} enrolled
                        </span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-500 shadow-sm"
                          style={{ width: `${fillPercentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
              
              <div className="pt-4 space-y-3">
                <Button variant="outline" className="w-full h-12 rounded-xl btn-professional">
                  <Calendar className="h-4 w-4 mr-2" />
                  View Full Schedule
                </Button>
                <Button className="w-full h-12 rounded-xl btn-professional bg-gradient-to-r from-primary to-primary/90">
                  <Award className="h-4 w-4 mr-2" />
                  Manage Classes
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
                Frequently used administrative tasks and shortcuts
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Users, label: 'Add New Member', color: 'from-blue-500 to-blue-600', description: 'Register new customer' },
              { icon: Calendar, label: 'Schedule Class', color: 'from-green-500 to-green-600', description: 'Create new session' },
              { icon: DollarSign, label: 'Process Payment', color: 'from-purple-500 to-purple-600', description: 'Handle transactions' },
              { icon: Activity, label: 'View Analytics', color: 'from-orange-500 to-orange-600', description: 'Check performance' }
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