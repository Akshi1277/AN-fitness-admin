'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  CreditCard, 
  BarChart2, 
  Settings,
  ChevronRight,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Analytics'
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: Package,
    description: 'Product Management',
    badge: '8'
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: Users,
    description: 'Customer Database'
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: CreditCard,
    description: 'Payment History'
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart2,
    description: 'Reports & Insights'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'System Configuration'
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-72 bg-card border-r border-border/50 shadow-professional">
        {/* Header */}
        <div className="flex items-center h-20 px-6 border-b border-border/50 bg-gradient-to-r from-primary/5 to-primary/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg">
              <Activity className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">AN Fitness</h1>
              <p className="text-xs text-muted-foreground font-medium">Admin Portal</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          <div className="mb-6">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3 mb-3">
              Main Menu
            </p>
            <div className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-xl transition-all duration-200 ease-in-out',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground hover:shadow-md',
                      'relative overflow-hidden'
                    )}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={cn(
                        'p-2 rounded-lg transition-colors',
                        isActive 
                          ? 'bg-primary-foreground/20' 
                          : 'bg-muted group-hover:bg-accent-foreground/10'
                      )}>
                        <item.icon className="h-5 w-5" />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold">{item.name}</span>
                        <span className={cn(
                          'text-xs transition-colors',
                          isActive 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground group-hover:text-accent-foreground/70'
                        )}>
                          {item.description}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {item.badge && (
                        <Badge 
                          variant={isActive ? "secondary" : "outline"} 
                          className="text-xs px-2 py-0.5"
                        >
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className={cn(
                        'h-4 w-4 transition-transform duration-200',
                        isActive ? 'rotate-90' : 'group-hover:translate-x-1'
                      )} />
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-foreground rounded-r-full" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border/50 bg-muted/30">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm">
              AG
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@anfitness.com</p>
            </div>
            <div className="status-indicator online" />
          </div>
        </div>
      </div>
    </div>
  );
}