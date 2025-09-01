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
  Activity,
  Zap,
  Sparkles,
  Badge
} from 'lucide-react';
import cn from '@/lib/utils';

const navItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Analytics',
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: Package,
    description: 'Product Management',
    badge: '8',
    badgeVariant: 'destructive',
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: Users,
    description: 'Customer Database',
    color: 'from-purple-500 to-purple-600'
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: CreditCard,
    description: 'Payment History',
    color: 'from-orange-500 to-orange-600'
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart2,
    description: 'Reports & Insights',
    color: 'from-pink-500 to-pink-600'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'System Configuration',
    color: 'from-gray-500 to-gray-600'
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 bg-card/95 backdrop-blur-xl border-r border-border/30 shadow-professional-xl relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        
        {/* Header */}
        <div className="relative z-10 flex items-center h-24 px-8 border-b border-border/30 bg-gradient-to-r from-primary/8 via-primary/5 to-transparent">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-professional-lg animate-pulse-glow">
                <Activity className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-4 w-4 text-yellow-500 animate-bounce-subtle" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gradient">AN Fitness</h1>
              <p className="text-sm text-muted-foreground font-medium tracking-wide">
                Admin Portal
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-6 space-y-2 relative z-10">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
                Navigation
              </p>
              <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent ml-4" />
            </div>
            
            <div className="space-y-2">
              {navItems.map((item, index) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group relative flex items-center justify-between px-4 py-4 text-sm font-medium rounded-2xl transition-all duration-300 ease-out overflow-hidden',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-professional-lg scale-[1.02]'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground hover:shadow-professional hover:scale-[1.01]',
                      'animate-slide-in-left'
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Background gradient for active state */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/80 opacity-100" />
                    )}
                    
                    {/* Hover background */}
                    <div className={cn(
                      'absolute inset-0 bg-gradient-to-r opacity-0 transition-opacity duration-300',
                      `bg-gradient-to-r ${item.color}`,
                      !isActive && 'group-hover:opacity-10'
                    )} />

                    <div className="relative z-10 flex items-center space-x-4 flex-1">
                      <div className={cn(
                        'p-3 rounded-xl transition-all duration-300 relative overflow-hidden',
                        isActive 
                          ? 'bg-primary-foreground/15 shadow-inner-professional' 
                          : 'bg-muted/50 group-hover:bg-accent-foreground/10 group-hover:shadow-professional'
                      )}>
                        {/* Icon background gradient */}
                        <div className={cn(
                          'absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-300',
                          `bg-gradient-to-br ${item.color}`,
                          !isActive && 'group-hover:opacity-20'
                        )} />
                        <item.icon className="h-6 w-6 relative z-10" />
                      </div>
                      
                      <div className="flex flex-col min-w-0 flex-1">
                        <span className="font-bold text-base tracking-tight">{item.name}</span>
                        <span className={cn(
                          'text-xs transition-colors duration-300 font-medium',
                          isActive 
                            ? 'text-primary-foreground/80' 
                            : 'text-muted-foreground group-hover:text-accent-foreground/80'
                        )}>
                          {item.description}
                        </span>
                      </div>
                    </div>
                    
                    <div className="relative z-10 flex items-center space-x-3">
                      {item.badge && (
                        <Badge 
                          variant={item.badgeVariant || (isActive ? "secondary" : "outline")} 
                          className={cn(
                            "text-xs px-2.5 py-1 font-bold shadow-sm",
                            isActive && "bg-primary-foreground/20 text-primary-foreground border-primary-foreground/30"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className={cn(
                        'h-5 w-5 transition-all duration-300',
                        isActive 
                          ? 'rotate-90 text-primary-foreground/80' 
                          : 'group-hover:translate-x-1 group-hover:text-accent-foreground'
                      )} />
                    </div>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary-foreground rounded-r-full shadow-lg" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">Quick Stats</h3>
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-medium">Active Members</span>
                <span className="text-sm font-bold text-green-600">856</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-medium">Today's Revenue</span>
                <span className="text-sm font-bold text-blue-600">$2,340</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-medium">Low Stock Items</span>
                <span className="text-sm font-bold text-orange-600">8</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Enhanced Footer */}
        <div className="relative z-10 p-6 border-t border-border/30 bg-gradient-to-r from-muted/20 to-muted/10 backdrop-blur-sm">
          <div className="flex items-center space-x-4 p-4 rounded-2xl bg-card/50 border border-border/30 shadow-professional hover:shadow-professional-lg transition-all duration-300 hover-lift">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center text-primary-foreground font-bold text-lg shadow-professional">
                AG
              </div>
              <div className="status-indicator online absolute" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold truncate">Admin User</p>
              <p className="text-xs text-muted-foreground font-medium">admin@anfitness.com</p>
              <div className="flex items-center mt-1">
                <div className="h-1.5 w-1.5 bg-green-500 rounded-full mr-2 animate-pulse" />
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}