'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  User, 
  Users, 
  Mail, 
  Phone, 
  Calendar,
  ShoppingBag,
  TrendingUp,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  Star,
  Clock,
  DollarSign
} from 'lucide-react';
import { KpiCard } from '@/components/KpiCard';
import cn from '@/lib/utils';

// Mock data
import customersData from '@/mock-data/customers.json';

export default function CustomersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredCustomers(customersData.recentCustomers);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCustomers(customersData.recentCustomers);
    } else {
      const filtered = customersData.recentCustomers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  }, [searchTerm]);

  const columns = [
    { 
      key: 'name', 
      header: 'Customer',
      render: (customer) => (
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-border/30 shadow-professional group-hover:shadow-professional-lg transition-all duration-300">
            <User className="h-7 w-7 text-primary" />
          </div>
          <div className="space-y-1">
            <div className="font-bold text-base group-hover:text-primary transition-colors duration-200">{customer.name}</div>
            <div className="text-sm text-muted-foreground font-medium flex items-center space-x-2">
              <Mail className="h-3 w-3" />
              <span>{customer.email}</span>
            </div>
            <div className="text-xs text-muted-foreground font-medium flex items-center space-x-2">
              <Calendar className="h-3 w-3" />
              <span>Joined {new Date(customer.joinDate).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      )
    },
    { 
      key: 'segment', 
      header: 'Segment',
      render: (customer) => (
        <Badge 
          variant={customer.segment === 'Active' ? 'default' : customer.segment === 'New' ? 'secondary' : 'outline'}
          className="font-bold px-3 py-1 rounded-xl"
        >
          {customer.segment}
        </Badge>
      )
    },
    { 
      key: 'orders', 
      header: 'Orders',
      render: (customer) => (
        <div className="space-y-1">
          <div className="font-bold text-lg text-primary">
            {customer.orders}
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            total orders
          </div>
        </div>
      )
    },
    { 
      key: 'spent', 
      header: 'Total Spent',
      render: (customer) => (
        <div className="space-y-1">
          <div className="font-bold text-lg text-primary">
            ${customer.totalSpent.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            lifetime value
          </div>
        </div>
      )
    },
    {
      key: 'lastOrder',
      header: 'Last Order',
      render: (customer) => (
        <div className="space-y-1">
          <div className="font-medium text-base">
            {customer.lastOrder ? new Date(customer.lastOrder).toLocaleDateString() : 'Never'}
          </div>
          <div className="text-xs text-muted-foreground font-medium flex items-center space-x-1">
            <Clock className="h-3 w-3" />
            <span>
              {customer.lastOrder 
                ? `${Math.floor((new Date() - new Date(customer.lastOrder)) / (1000 * 60 * 60 * 24))} days ago`
                : 'No orders'
              }
            </span>
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (customer) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 transition-all duration-200"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 px-3 rounded-xl hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 transition-all duration-200"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
        </div>
      )
    }
  ];

  const activeCustomers = customersData.recentCustomers.filter(c => c.segment === 'Active').length;
  const newCustomers = customersData.recentCustomers.filter(c => c.segment === 'New').length;
  const totalRevenue = customersData.recentCustomers.reduce((sum, c) => sum + c.totalSpent, 0);
  const avgOrderValue = totalRevenue / customersData.recentCustomers.reduce((sum, c) => sum + c.orders, 0) || 0;

  return (
    <div className="space-professional animate-slide-up p-8">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div className="space-y-3 animate-slide-in-left">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 shadow-professional">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gradient">
                Customer Management
              </h2>
              <p className="text-muted-foreground text-xl font-medium leading-relaxed">
                Manage customer relationships and analyze behavior patterns
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 animate-slide-in-right">
          <Button variant="outline" className="btn-professional h-12 px-6 rounded-xl">
            <Download className="mr-2 h-5 w-5" />
            Export Customers
          </Button>
          <Button className="btn-professional h-12 px-6 rounded-xl shadow-professional-lg bg-gradient-to-r from-primary to-primary/90">
            <Plus className="mr-2 h-5 w-5" />
            Add New Customer
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <KpiCard
          title="Total Customers"
          value={customersData.total.toString()}
          change="Active customer base"
          changeType="none"
          icon={Users}
          color="from-blue-500/10 to-blue-600/5"
        />
        <KpiCard
          title="Active Customers"
          value={activeCustomers.toString()}
          change={`${Math.round((activeCustomers / customersData.recentCustomers.length) * 100)}% of total`}
          changeType="increase"
          icon={TrendingUp}
          color="from-green-500/10 to-green-600/5"
        />
        <KpiCard
          title="New This Month"
          value={newCustomers.toString()}
          change="Recent acquisitions"
          changeType="increase"
          icon={Star}
          color="from-purple-500/10 to-purple-600/5"
        />
        <KpiCard
          title="Avg Order Value"
          value={`$${avgOrderValue.toFixed(2)}`}
          change="Per customer average"
          changeType="increase"
          icon={DollarSign}
          color="from-orange-500/10 to-orange-600/5"
        />
      </div>

      {/* Enhanced Customer Table */}
      <Card className="shadow-professional-xl card-professional">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-blue-500/10 to-blue-600/5 shadow-professional">
                  <ShoppingBag className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Customer Database</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Complete customer information with purchase history and engagement metrics
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="font-bold px-4 py-2 rounded-xl">
                <Users className="h-4 w-4 mr-2" />
                {filteredCustomers.length} customers
              </Badge>
              <Button variant="outline" size="sm" className="btn-professional rounded-xl">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={filteredCustomers}
            isLoading={isLoading}
            emptyMessage="No customers found in database"
            searchPlaceholder="Search customers by name, email, or segment..."
          />
        </CardContent>
      </Card>
    </div>
  );
}
