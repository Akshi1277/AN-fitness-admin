'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Database,
  Mail,
  Globe,
  Key,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Zap,
  Lock,
  Eye,
  EyeOff,
  Upload,
  Download
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import cn from '@/lib/utils';

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [settings, setSettings] = useState({
    profile: {
      name: 'Admin User',
      email: 'admin@anfitness.com',
      role: 'Administrator',
      avatar: ''
    },
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      lowStockAlerts: true,
      orderNotifications: true,
      weeklyReports: true
    },
    store: {
      storeName: 'AN Fitness Store',
      storeUrl: 'anfitness.com',
      currency: 'USD',
      timezone: 'America/New_York',
      taxRate: 8.5
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordExpiry: 90
    },
    api: {
      apiKey: 'sk_live_51H7...',
      webhookUrl: 'https://anfitness.com/webhooks',
      rateLimitPerHour: 1000
    }
  });

  const { theme, toggleTheme } = useTheme();

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
            {[...Array(4)].map((_, i) => (
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
            <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-500/10 to-gray-600/5 shadow-professional">
              <SettingsIcon className="h-8 w-8 text-gray-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gradient">
                Settings & Configuration
              </h2>
              <p className="text-muted-foreground text-xl font-medium leading-relaxed">
                Manage your store settings, preferences, and security
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 animate-slide-in-right">
          <Badge className="px-4 py-2 bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 rounded-xl font-semibold">
            <CheckCircle className="h-4 w-4 mr-2" />
            All Systems Operational
          </Badge>
          <Button variant="outline" className="btn-professional h-12 px-6 rounded-xl">
            <Download className="mr-2 h-5 w-5" />
            Export Settings
          </Button>
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
                <CardTitle className="text-2xl font-bold tracking-tight">Profile Settings</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Manage your personal account information
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
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground font-medium">
                  JPG, PNG or GIF. Max size 2MB.
                </p>
              </div>
            </div>
            
            <Separator />
            
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
              Save Profile Changes
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
                Configure how you receive alerts and updates
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {Object.entries(settings.notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-transparent border border-border/30">
                <div className="space-y-1">
                  <p className="font-bold text-base">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </p>
                  <p className="text-sm text-muted-foreground font-medium">
                    {getNotificationDescription(key)}
                  </p>
                </div>
                <Button
                  variant={value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('notifications', key, !value)}
                  className="rounded-xl"
                >
                  {value ? 'Enabled' : 'Disabled'}
                </Button>
              </div>
            ))}
            
            <Button 
              onClick={() => handleSave('notifications')}
              className="w-full h-12 rounded-xl btn-professional"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Notification Settings
            </Button>
          </CardContent>
        </Card>

        {/* Store Settings */}
        <Card className="shadow-professional-xl card-professional">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 shadow-professional">
                  <Globe className="h-5 w-5 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Store Configuration</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Basic store information and regional settings
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="storeName">Store Name</Label>
                <Input
                  id="storeName"
                  value={settings.store.storeName}
                  onChange={(e) => handleInputChange('store', 'storeName', e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="storeUrl">Store URL</Label>
                <Input
                  id="storeUrl"
                  value={settings.store.storeUrl}
                  onChange={(e) => handleInputChange('store', 'storeUrl', e.target.value)}
                  className="h-12 rounded-xl"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Input
                    id="currency"
                    value={settings.store.currency}
                    onChange={(e) => handleInputChange('store', 'currency', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    step="0.1"
                    value={settings.store.taxRate}
                    onChange={(e) => handleInputChange('store', 'taxRate', parseFloat(e.target.value))}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
            </div>
            
            <Button 
              onClick={() => handleSave('store')}
              className="w-full h-12 rounded-xl btn-professional"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Store Settings
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-professional-xl card-professional">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 shadow-professional">
                  <Shield className="h-5 w-5 text-red-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Security & Privacy</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Manage security settings and access controls
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-transparent border border-border/30">
                <div className="space-y-1">
                  <p className="font-bold text-base">Two-Factor Authentication</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Button
                  variant={settings.security.twoFactorAuth ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('security', 'twoFactorAuth', !settings.security.twoFactorAuth)}
                  className="rounded-xl"
                >
                  {settings.security.twoFactorAuth ? 'Enabled' : 'Enable'}
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                <Input
                  id="sessionTimeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => handleInputChange('security', 'sessionTimeout', parseInt(e.target.value))}
                  className="h-12 rounded-xl"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="passwordExpiry">Password Expiry (days)</Label>
                <Input
                  id="passwordExpiry"
                  type="number"
                  value={settings.security.passwordExpiry}
                  onChange={(e) => handleInputChange('security', 'passwordExpiry', parseInt(e.target.value))}
                  className="h-12 rounded-xl"
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-bold text-base">Change Password</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    Update your account password
                  </p>
                </div>
                <Button variant="outline" className="rounded-xl">
                  <Lock className="h-4 w-4 mr-2" />
                  Change Password
                </Button>
              </div>
            </div>
            
            <Button 
              onClick={() => handleSave('security')}
              className="w-full h-12 rounded-xl btn-professional"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Security Settings
            </Button>
          </CardContent>
        </Card>

        {/* API Settings */}
        <Card className="shadow-professional-xl card-professional lg:col-span-2">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-600/5 shadow-professional">
                  <Key className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">API & Integrations</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Manage API keys, webhooks, and third-party integrations
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key</Label>
                  <div className="relative">
                    <Input
                      id="apiKey"
                      type={showApiKey ? "text" : "password"}
                      value={settings.api.apiKey}
                      onChange={(e) => handleInputChange('api', 'apiKey', e.target.value)}
                      className="h-12 rounded-xl pr-12"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhookUrl">Webhook URL</Label>
                  <Input
                    id="webhookUrl"
                    value={settings.api.webhookUrl}
                    onChange={(e) => handleInputChange('api', 'webhookUrl', e.target.value)}
                    className="h-12 rounded-xl"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="rateLimit">Rate Limit (per hour)</Label>
                  <Input
                    id="rateLimit"
                    type="number"
                    value={settings.api.rateLimitPerHour}
                    onChange={(e) => handleInputChange('api', 'rateLimitPerHour', parseInt(e.target.value))}
                    className="h-12 rounded-xl"
                  />
                </div>
                
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-blue-50/50 dark:from-blue-900/20 dark:to-blue-900/10 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                    <p className="font-bold text-sm text-blue-800 dark:text-blue-400">API Status</p>
                  </div>
                  <p className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                    Last request: 2 minutes ago • 847 requests today
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex space-x-4">
              <Button 
                variant="outline"
                onClick={() => {/* Generate new API key */}}
                className="flex-1 h-12 rounded-xl btn-professional"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Regenerate API Key
              </Button>
              <Button 
                onClick={() => handleSave('api')}
                className="flex-1 h-12 rounded-xl btn-professional"
              >
                <Save className="h-4 w-4 mr-2" />
                Save API Settings
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Theme & Appearance */}
        <Card className="shadow-professional-xl card-professional">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/10 to-indigo-600/5 shadow-professional">
                  <Palette className="h-5 w-5 text-indigo-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Appearance</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Customize the look and feel of your dashboard
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-transparent border border-border/30">
                <div className="space-y-1">
                  <p className="font-bold text-base">Dark Mode</p>
                  <p className="text-sm text-muted-foreground font-medium">
                    Switch between light and dark themes
                  </p>
                </div>
                <Button
                  variant={theme === 'dark' ? "default" : "outline"}
                  size="sm"
                  onClick={toggleTheme}
                  className="rounded-xl"
                >
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </Button>
              </div>
              
              <div className="p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-transparent border border-border/30">
                <div className="space-y-3">
                  <p className="font-bold text-base">Color Scheme</p>
                  <div className="flex space-x-3">
                    {[
                      { name: 'Blue', color: 'bg-blue-500' },
                      { name: 'Green', color: 'bg-green-500' },
                      { name: 'Purple', color: 'bg-purple-500' },
                      { name: 'Orange', color: 'bg-orange-500' }
                    ].map((color, index) => (
                      <button
                        key={index}
                        className={cn(
                          "w-8 h-8 rounded-xl shadow-professional hover:shadow-professional-lg transition-all duration-200 hover:scale-110",
                          color.color,
                          index === 0 && "ring-2 ring-primary ring-offset-2"
                        )}
                        title={color.name}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card className="shadow-professional-xl card-professional">
          <CardHeader className="pb-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-gray-500/10 to-gray-600/5 shadow-professional">
                  <Database className="h-5 w-5 text-gray-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">System Information</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Application version and system status
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              {[
                { label: 'Application Version', value: 'v2.1.4', status: 'current' },
                { label: 'Database Status', value: 'Connected', status: 'healthy' },
                { label: 'Last Backup', value: '2 hours ago', status: 'recent' },
                { label: 'Storage Used', value: '2.4 GB / 10 GB', status: 'normal' }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-muted/20 to-transparent border border-border/30">
                  <div className="space-y-1">
                    <p className="font-bold text-base">{item.label}</p>
                    <p className="text-sm text-muted-foreground font-medium">{item.value}</p>
                  </div>
                  <Badge 
                    variant={item.status === 'healthy' || item.status === 'current' ? 'default' : 'outline'}
                    className="rounded-xl font-bold"
                  >
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {item.status}
                  </Badge>
                </div>
              ))}
            </div>
            
            <div className="flex space-x-4">
              <Button variant="outline" className="flex-1 h-12 rounded-xl btn-professional">
                <RefreshCw className="h-4 w-4 mr-2" />
                Check Updates
              </Button>
              <Button variant="outline" className="flex-1 h-12 rounded-xl btn-professional">
                <Database className="h-4 w-4 mr-2" />
                Backup Now
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Danger Zone */}
      <Card className="shadow-professional-xl border-red-200 dark:border-red-800 bg-red-50/30 dark:bg-red-900/10 mt-12">
        <CardHeader className="pb-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-red-500/10 to-red-600/5 shadow-professional">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
              <CardTitle className="text-2xl font-bold tracking-tight text-red-800 dark:text-red-400">
                Danger Zone
              </CardTitle>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 font-medium">
              Irreversible and destructive actions
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-2xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20">
            <div className="space-y-1">
              <p className="font-bold text-base text-red-800 dark:text-red-400">Reset All Settings</p>
              <p className="text-sm text-red-700 dark:text-red-300 font-medium">
                This will reset all settings to their default values
              </p>
            </div>
            <Button variant="destructive" className="rounded-xl">
              <RefreshCw className="h-4 w-4 mr-2" />
              Reset Settings
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function getNotificationDescription(key) {
  const descriptions = {
    emailNotifications: 'Receive updates via email',
    pushNotifications: 'Browser push notifications',
    lowStockAlerts: 'Alerts when inventory is low',
    orderNotifications: 'New order notifications',
    weeklyReports: 'Weekly performance summaries'
  };
  return descriptions[key] || 'Notification setting';
}