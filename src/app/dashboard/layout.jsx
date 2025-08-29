"use client";

import { Inter } from 'next/font/google';
import '../globals.css';
import '../print.css';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/Sidebar';
import Toaster from '@/components/Toaster';
import ThemeProvider from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Printer, 
  Bell, 
  Search, 
  Menu,
  User,
  LogOut,
  Settings as SettingsIcon
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>AN Fitness Admin</title>
        <meta name="description" content="Admin dashboard for AN Fitness" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider>
          <div className="flex min-h-screen bg-background">
            <Sidebar className="no-print" />
            <div className="flex-1 flex flex-col min-w-0">
              {/* Enhanced Header */}
              <header className="h-20 border-b border-border/50 flex items-center px-6 bg-card/50 backdrop-blur-sm shadow-professional no-print sticky top-0 z-40">
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="lg:hidden">
                      <Menu className="h-5 w-5" />
                    </Button>
                    <div>
                      <h1 className="text-xl font-bold tracking-tight">Dashboard</h1>
                      <p className="text-sm text-muted-foreground">Welcome back, Admin</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    {/* Search */}
                    <div className="relative hidden md:block">
                      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        className="pl-10 w-64 bg-background/50 border-border/50 focus:bg-background"
                      />
                    </div>

                    {/* Notifications */}
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive">
                        3
                      </Badge>
                    </Button>

                    {/* Print Button */}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrint}
                      className="print:hidden hidden sm:flex"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>

                    {/* Theme Toggle */}
                    <ThemeToggle />

                    {/* User Menu */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold shadow-lg">
                            AG
                          </div>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-56" align="end" forceMount>
                        <DropdownMenuLabel className="font-normal">
                          <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">Admin User</p>
                            <p className="text-xs leading-none text-muted-foreground">
                              admin@anfitness.com
                            </p>
                          </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <SettingsIcon className="mr-2 h-4 w-4" />
                          <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="flex-1 bg-background print:p-0 print:bg-white">
                <div className="print-only p-4 text-center print:p-0">
                  <h1 className="text-2xl font-bold mb-2">AN Fitness</h1>
                  <p className="text-muted-foreground">Report generated on {new Date().toLocaleDateString()}</p>
                </div>
                <div className="p-8 print:mx-4 animate-fade-in">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}