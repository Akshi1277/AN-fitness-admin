'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, User, Users } from 'lucide-react';

// Mock data
import customersData from '@/mock-data/customers.json';

export default function CustomersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredCustomers(customersData.customers);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredCustomers(customersData.customers);
    } else {
      const filtered = customersData.customers.filter(customer =>
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
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
            <User className="h-5 w-5 text-gray-500" />
          </div>
          <div>
            <div className="font-medium">{customer.name}</div>
            <div className="text-sm text-muted-foreground">{customer.email}</div>
          </div>
        </div>
      )
    },
    { 
      key: 'segment', 
      header: 'Segment',
      render: (customer) => (
        <Badge variant={customer.segment === 'Premium' ? 'default' : 'secondary'}>
          {customer.segment}
        </Badge>
      )
    },
    { 
      key: 'orders', 
      header: 'Orders',
      render: (customer) => `${customer.totalOrders} orders`
    },
    { 
      key: 'spent', 
      header: 'Total Spent',
      render: (customer) => `$${customer.totalSpent.toLocaleString()}`
    },
    {
      key: 'lastOrder',
      header: 'Last Order',
      render: (customer) => new Date(customer.lastOrder).toLocaleDateString()
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
          <p className="text-muted-foreground">Manage your customers</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customersData.totalCustomers}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New vs Returning</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {customersData.newVsReturning.new}% New
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={filteredCustomers}
            isLoading={isLoading}
            emptyMessage="No customers found"
          />
        </CardContent>
      </Card>
    </div>
  );
}
