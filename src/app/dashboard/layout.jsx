"use client";

import { Inter } from 'next/font/google';
import '../globals.css';
import '../print.css';
import cn from '@/lib/utils';
import { Sidebar } from '@/components/Sidebar';
import Toaster from '@/components/Toaster';
import ThemeProvider from '@/components/ThemeProvider';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Printer, 
  Bell, 
  Search, 
  Menu,
  User,
  LogOut,
  Settings as SettingsIcon,
  HelpCircle,
  MessageSquare,
  Zap,
  Clock,
  Activity
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const inter = Inter({ subsets: ['latin'] });

// Print function
const handlePrint = () => {
  window.print();
};

export default function RootLayout({ children }) {
  return (
    <div className={cn("layout-professional font-sans antialiased", inter.className)}>
      <ThemeProvider>
        <div className="flex min-h-screen bg-background bg-professional">
          <Sidebar className="no-print" />
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header without Dark Mode Toggle */}
            <header className="h-24 border-b border-border bg-card text-card-foreground flex items-center px-8 no-print sticky top-0 z-40 shadow-professional backdrop-blur-sm">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-6">
                  <Button variant="ghost" size="icon" className="lg:hidden hover-lift">
                    <Menu className="h-5 w-5" />
                  </Button>
                  <div className="animate-slide-in-left">
                    <h1 className="text-2xl font-bold tracking-tight text-gradient">Dashboard</h1>
                    <p className="text-sm text-muted-foreground font-medium">Welcome back, Admin</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 animate-slide-in-right">
                  {/* Enhanced Search */}
                  <div className="relative hidden md:block">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search anything..."
                      className="pl-12 w-80 bg-background/60 border-border/50 focus:bg-background focus:border-primary/50 focus:shadow-professional transition-all duration-300 rounded-xl h-11"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Badge variant="outline" className="text-xs px-2 py-0.5 font-medium">
                        ⌘K
                      </Badge>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <Badge variant="outline" className="px-4 py-2 rounded-xl font-semibold text-slate-900">
                    <Clock className="h-4 w-4 mr-2" />
                    Last updated: {new Date().toLocaleTimeString()}
                  </Badge>

                  {/* Enhanced Notifications */}
                  <div className="relative">
                    <Button variant="ghost" size="icon" className="relative hover-lift h-11 w-11 rounded-xl">
                      <Bell className="h-5 w-5" />
                      <div className="notification-dot">
                        <span className="sr-only">3 notifications</span>
                      </div>
                    </Button>
                  </div>

                  {/* Enhanced Print Button */}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handlePrint}
                    className="print:hidden hidden sm:flex btn-professional h-11 px-4 rounded-xl"
                  >
                    <Printer className="h-4 w-4 mr-2" />
                    Print Report
                  </Button>

                  {/* Enhanced User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-12 w-12 rounded-2xl hover-lift p-0">
                        <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-lg shadow-professional-lg relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                          <span className="relative z-10">AG</span>
                        </div>
                        <div className="status-indicator online absolute" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-64 mr-4 mt-2 rounded-2xl border-border/50 shadow-professional-xl bg-card/95 backdrop-blur-xl" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold shadow-professional">
                            AG
                          </div>
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-bold leading-none text-card-foreground">Admin User</p>
                            <p className="text-xs leading-none text-muted-foreground font-medium">
                              admin@anfitness.com
                            </p>
                            <div className="flex items-center mt-1">
                              <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-2" />
                              <span className="text-xs text-green-600 font-medium">Online</span>
                            </div>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-border/50" />
                      <div className="p-2 space-y-1">
                        <DropdownMenuItem className="rounded-xl p-3 hover:bg-accent/50 transition-colors">
                          <User className="mr-3 h-4 w-4" />
                          <span className="font-medium">Profile Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl p-3 hover:bg-accent/50 transition-colors">
                          <SettingsIcon className="mr-3 h-4 w-4" />
                          <span className="font-medium">Preferences</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl p-3 hover:bg-accent/50 transition-colors">
                          <HelpCircle className="mr-3 h-4 w-4" />
                          <span className="font-medium">Help & Support</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="rounded-xl p-3 hover:bg-accent/50 transition-colors">
                          <MessageSquare className="mr-3 h-4 w-4" />
                          <span className="font-medium">Feedback</span>
                        </DropdownMenuItem>
                      </div>
                      <DropdownMenuSeparator className="bg-border/50" />
                      <div className="p-2">
                        <DropdownMenuItem className="text-destructive rounded-xl p-3 hover:bg-destructive/10 transition-colors">
                          <LogOut className="mr-3 h-4 w-4" />
                          <span className="font-medium">Sign Out</span>
                        </DropdownMenuItem>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </header>

            {/* Enhanced Main Content */}
            <main className="flex-1 bg-background print:p-0 print:bg-white relative">
              {/* Background Elements */}
              <div className="absolute inset-0 bg-professional opacity-40" />
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
              
              <div className="print-only p-6 text-center print:p-0 bg-card rounded-2xl mx-8 mt-8 shadow-professional">
                <div className="flex items-center justify-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-primary rounded-xl flex items-center justify-center">
                    <Activity className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <h1 className="text-3xl font-bold text-gradient">AN Fitness</h1>
                </div>
                <p className="text-muted-foreground font-medium">
                  Professional Report • Generated on {new Date().toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
              
              <div className="relative z-10 content-professional py-12 animate-fade-in">
                {children}
              </div>
            </main>
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    </div>
  );
}