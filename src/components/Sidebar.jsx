import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Package, Users, CreditCard, BarChart2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    name: 'Inventory',
    href: '/inventory',
    icon: Package,
  },
  {
    name: 'Customers',
    href: '/customers',
    icon: Users,
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: CreditCard,
  },
  {
    name: 'Analytics',
    href: '/analytics',
    icon: BarChart2,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-shrink-0">
      <div className="flex flex-col w-64 border-r bg-white">
        <div className="flex items-center h-16 px-4 border-b">
          <h1 className="text-xl font-bold">AN Fitness</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-3 py-2 text-sm font-medium rounded-md',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  'transition-colors duration-200'
                )}
              >
                <item.icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
