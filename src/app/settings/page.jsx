'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Save,
  CheckCircle,
  Upload
} from 'lucide-react';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [settings, setSettings] = useState({
    profile: {
      name: 'Admin User',
      email: 'admin@anfitness.com',
      role: 'Administrator'
    },
    notifications: {
      lowStockAlerts: true,
      orderNotifications: true
    }
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleSave = (section) => {
    // Simulate save operation
    console.log(`Saving ${section} settings:`, settings[section]);
  };

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="space-professional animate-slide-up p-8">
        <div className="animate-pulse space-y-8">
          <div className="h-20 bg-muted/50 rounded-2xl" />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="h-96 bg-muted/50 rounded-2xl" />
            <div className="h-96 bg-muted/50 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-professional animate-slide-up p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div className="space-y-3 animate-slide-in-left">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-500/10 to-gray-600/5 shadow-professional">
              <SettingsIcon className="h-8 w-8 text-gray-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gradient">
                Settings
              </h2>
              <p className="text-muted-foreground text-xl font-medium leading-relaxed">
                Manage your account preferences
              </p>
            </div>
          </div>
        </div>
        
        <div className="animate-slide-in-right">
          <Badge className="px-4 py-2 bg-green-100 text-green-800 border-green-200 dark:bg-white dark:text-blue-400 rounded-xl font-semibold">
            <CheckCircle className="h-4 w-4 mr-2" />
            All Settings Saved
          </Badge>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Profile Settings */}
        <Card className="shadow-professional-xl card-professional">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 shadow-professional">
                  <User className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Profile</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Update your personal information
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-2xl shadow-professional-lg">
                AG
              </div>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="rounded-xl">
                  <Upload className="h-4 w-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-xs text-muted-foreground font-medium">
                  JPG or PNG. Max 2MB.
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={settings.profile.name}
                  onChange={(e) => handleInputChange('profile', 'name', e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) => handleInputChange('profile', 'email', e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={settings.profile.role}
                  disabled
                  className="h-12 rounded-xl bg-muted/50"
                />
              </div>
            </div>
            
            <Button 
              onClick={() => handleSave('profile')}
              className="w-full h-12 rounded-xl btn-professional"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="shadow-professional-xl card-professional">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 shadow-professional">
                  <Bell className="h-5 w-5 text-yellow-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Notifications</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Choose what alerts you want to receive
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-transparent border border-border/30">
                <div className="space-y-1">
                  <p className="font-bold text-base">Low Stock Alerts</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    Get notified when products are running low
                  </p>
                </div>
                <Button
                  variant={settings.notifications.lowStockAlerts ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('notifications', 'lowStockAlerts', !settings.notifications.lowStockAlerts)}
                  className="rounded-xl"
                >
                  {settings.notifications.lowStockAlerts ? 'On' : 'Off'}
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-transparent border border-border/30">
                <div className="space-y-1">
                  <p className="font-bold text-base">Order Notifications</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    Receive alerts for new customer orders
                  </p>
                </div>
                <Button
                  variant={settings.notifications.orderNotifications ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('notifications', 'orderNotifications', !settings.notifications.orderNotifications)}
                  className="rounded-xl"
                >
                  {settings.notifications.orderNotifications ? 'On' : 'Off'}
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={() => handleSave('notifications')}
              className="w-full h-12 rounded-xl btn-professional"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Simple Status Card */}
      <Card className="shadow-professional-xl card-professional mt-8">
        <CardContent className="p-8">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-2xl shadow-professional">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold">Everything looks good!</h3>
              <p className="text-muted-foreground font-medium">
                Your settings are configured and your store is running smoothly.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}