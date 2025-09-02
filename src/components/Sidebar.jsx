'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
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
  Badge,
  ChevronDown
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
    <>
      {/* Fixed sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:left-0 lg:z-50 lg:block lg:w-64 lg:overflow-y-auto lg:bg-card/95 lg:backdrop-blur-xl lg:border-r lg:border-border/30 lg:shadow-professional-xl scrollbar-hide">
        {/* Background Pattern */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        

        
        {/* Header */}
        <div className="relative z-10 flex items-center h-24 px-8 border-b border-border/30 bg-gradient-to-r from-primary/8 via-primary/5 to-transparent">
          <div className="flex items-center space-x-4">
            <div className="relative">
              {/* <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-professional-lg animate-pulse-glow">
                <Activity className="h-7 w-7 text-primary-foreground" />
              </div>
              <div className="absolute -top-1 -right-1">
                <Sparkles className="h-4 w-4 text-yellow-500 animate-bounce-subtle" />
              </div> */}
               <Image 
                    src="/anfitness.jpg" 
                    alt="AN Fitness Logo" 
                    width={70} 
                    height={70} 
                    className="rounded-xl object-cover"
                  />
            </div>
            <div>
              <h1 className="font-bold tracking-tight text-gradient">AN Fitness</h1>
              <p className="text-sm text-muted-foreground font-medium tracking-wide">
                Admin Panel
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative z-10 p-6 space-y-2">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest px-1">
                Navigation
              </p>
              <div className="flex items-center space-x-2">
                <div className="h-px flex-1 bg-gradient-to-r from-border/50 to-transparent" />
                <div className="flex items-center space-x-1 text-xs text-muted-foreground bg-card/50 border border-border/30 rounded-full px-2 py-1">
                  <ChevronDown className="h-3 w-3 text-primary animate-bounce" />
                  <span className="font-medium text-[10px] tracking-tight">Scroll for more</span>
                </div>
              </div>
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
                        ? 'glass text-foreground shadow-professional-lg scale-[1.02] border-primary/20'
                        : 'text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground hover:shadow-professional hover:scale-[1.01]',
                      'animate-slide-in-left'
                    )}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Background gradient for active state - now glassmorphism */}
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-primary/8 to-primary/6 backdrop-blur-sm border border-primary/20 rounded-2xl" />
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
                          ? 'bg-primary/15 shadow-inner-professional border border-primary/20 backdrop-blur-sm' 
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
                            ? 'text-primary/90' 
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
                            isActive && "bg-primary/20 text-primary border-primary/30 backdrop-blur-sm"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      <ChevronRight className={cn(
                        'h-5 w-5 transition-all duration-300',
                        isActive 
                          ? 'rotate-90 text-primary/80' 
                          : 'group-hover:translate-x-1 group-hover:text-accent-foreground'
                      )} />
                    </div>
                    
                    {/* Active indicator - glassmorphism style */}
                    {isActive && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-primary/80 rounded-r-full shadow-lg backdrop-blur-sm" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="mt-8 p-4 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/30 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-foreground">Store Stats</h3>
              <Zap className="h-4 w-4 text-primary" />
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-medium">Active Orders</span>
                <span className="text-sm font-bold text-green-600">42</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-medium">Today's Sales</span>
                <span className="text-sm font-bold text-blue-600">$3,420</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground font-medium">Low Stock Items</span>
                <span className="text-sm font-bold text-orange-600">8</span>
              </div>
            </div>
          </div>

          {/* Remove the old scroll indicator since we have a fixed one now */}
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
      
      {/* Spacer for main content - this prevents content from being hidden behind the fixed sidebar */}
      <div className="hidden lg:block lg:w-64 lg:flex-shrink-0" aria-hidden="true">
        {/* This empty div creates space so main content doesn't overlap with fixed sidebar */}
      </div>
    </>
  );
}