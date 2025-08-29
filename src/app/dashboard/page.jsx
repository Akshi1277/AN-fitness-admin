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
  AlertCircle
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
      avatar: 'JD'
    },
    {
      id: 2,
      user: 'Sarah Miller',
      action: 'Purchased Whey Protein 5lbs',
      time: '3 hours ago',
      type: 'purchase',
      avatar: 'SM'
    },
    {
      id: 3,
      user: 'Mike Roberts',
      action: 'Renewed Premium Membership',
      time: '5 hours ago',
      type: 'renewal',
      avatar: 'MR'
    },
    {
      id: 4,
      user: 'Alex Kim',
      action: 'Booked Personal Training Session',
      time: '6 hours ago',
      type: 'booking',
      avatar: 'AK'
    },
    {
      id: 5,
      user: 'Emma Wilson',
      action: 'Completed HIIT Workout',
      time: '8 hours ago',
      type: 'workout',
      avatar: 'EW'
    }
  ];

  const upcomingClasses = [
    { name: 'Morning Yoga', time: '09:00 AM', instructor: 'Lisa Chen', spots: 8 },
    { name: 'HIIT Training', time: '11:00 AM', instructor: 'Mark Johnson', spots: 12 },
    { name: 'Pilates', time: '02:00 PM', instructor: 'Sarah Davis', spots: 6 },
    { name: 'Strength Training', time: '05:00 PM', instructor: 'Tom Wilson', spots: 15 }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'checkin': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'purchase': return <DollarSign className="h-4 w-4 text-blue-500" />;
      case 'renewal': return <TrendingUp className="h-4 w-4 text-purple-500" />;
      case 'booking': return <Calendar className="h-4 w-4 text-orange-500" />;
      case 'workout': return <Activity className="h-4 w-4 text-red-500" />;
      default: return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Welcome Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Good morning, Admin
          </h1>
          <p className="text-muted-foreground mt-1 text-lg">
            Here's what's happening at AN Fitness today
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Badge variant="outline" className="px-3 py-1">
            <Clock className="h-3 w-3 mr-1" />
            Last updated: {new Date().toLocaleTimeString()}
          </Badge>
          <Button size="sm" className="shadow-lg">
            <ArrowUpRight className="h-4 w-4 mr-2" />
            View Reports
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total Members"
          value="1,234"
          change="+12% from last month"
          changeType="increase"
          icon={Users}
        />
        <KpiCard
          title="Active Members"
          value="856"
          change="+8% from last month"
          changeType="increase"
          icon={Activity}
        />
        <KpiCard
          title="Monthly Revenue"
          value="$24,560"
          change="+15% from last month"
          changeType="increase"
          icon={DollarSign}
        />
        <KpiCard
          title="Classes Today"
          value="8"
          change="Next class in 2 hours"
          changeType="none"
          icon={Calendar}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <Card className="shadow-professional-lg animate-scale-in">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold">Recent Activity</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Latest member interactions and transactions
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div 
                  key={activity.id} 
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-200 group cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center font-bold text-sm border border-border/50 group-hover:shadow-md transition-shadow">
                      {activity.avatar}
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {activity.user}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {activity.time}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Today's Classes */}
        <div>
          <Card className="shadow-professional-lg animate-scale-in">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold">Today's Classes</CardTitle>
              <p className="text-sm text-muted-foreground">
                Upcoming fitness sessions
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-muted/30 to-muted/10 border border-border/50 hover:shadow-md transition-all duration-200 group"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="space-y-1">
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {classItem.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {classItem.instructor}
                    </p>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-bold">{classItem.time}</p>
                    <Badge variant="secondary" className="text-xs">
                      {classItem.spots} spots
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">
                View Schedule
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-professional animate-scale-in">
        <CardHeader>
          <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Frequently used administrative tasks
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col space-y-2 hover:shadow-lg transition-all duration-200">
              <Users className="h-6 w-6" />
              <span className="text-sm font-medium">Add Member</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 hover:shadow-lg transition-all duration-200">
              <Calendar className="h-6 w-6" />
              <span className="text-sm font-medium">Schedule Class</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 hover:shadow-lg transition-all duration-200">
              <DollarSign className="h-6 w-6" />
              <span className="text-sm font-medium">Process Payment</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col space-y-2 hover:shadow-lg transition-all duration-200">
              <Activity className="h-6 w-6" />
              <span className="text-sm font-medium">View Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}