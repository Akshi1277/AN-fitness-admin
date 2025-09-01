'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Download, Filter, ArrowUpDown } from 'lucide-react';

// Mock data
import transactionsData from '@/mock-data/transactions.json';

export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredTransactions(transactionsData?.recentTransactions || []);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let result = [...(transactionsData?.recentTransactions || [])];
    
    // Apply search
    if (searchTerm.trim()) {
      result = result.filter(transaction =>
        transaction?.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction?.customer?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction?.items?.some(item => 
          item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue, bValue;
        
        if (sortConfig.key === 'customer') {
          aValue = a?.customer?.name || '';
          bValue = b?.customer?.name || '';
        } else if (sortConfig.key === 'items') {
          aValue = a?.items?.length || 0;
          bValue = b?.items?.length || 0;
        } else {
          aValue = a?.[sortConfig.key] || '';
          bValue = b?.[sortConfig.key] || '';
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredTransactions(result);
  }, [searchTerm, sortConfig]);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const columns = [
    { 
      key: 'id', 
      header: 'Order ID',
      render: (transaction) => (
        <span className="font-medium">#{transaction?.id || 'N/A'}</span>
      )
    },
    { 
      key: 'date', 
      header: 'Date',
      render: (transaction) => (
        <div className="flex items-center">
          <span>{transaction?.date ? new Date(transaction.date).toLocaleDateString() : 'N/A'}</span>
          <button 
            onClick={() => requestSort('date')}
            className="ml-2 hover:text-primary"
          >
            <ArrowUpDown className="h-4 w-4" />
          </button>
        </div>
      )
    },
    { 
      key: 'customer', 
      header: 'Customer',
      render: (transaction) => {
        const customerName = transaction?.customer?.name || 'Unknown Customer';
        return (
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mr-2">
              <span className="text-xs font-medium text-gray-600">
                {customerName.charAt(0).toUpperCase()}
              </span>
            </div>
            <span>{customerName}</span>
          </div>
        );
      }
    },
    { 
      key: 'items', 
      header: 'Items',
      render: (transaction) => (
        <div className="flex items-center">
          <span>{transaction?.items?.length || 0} items</span>
        </div>
      )
    },
    { 
      key: 'total', 
      header: 'Total',
      render: (transaction) => (
        <div className="font-medium">
          ${(transaction?.total || 0).toFixed(2)}
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (transaction) => (
        <Badge 
          variant={
            transaction?.status === 'completed' ? 'default' : 
            transaction?.status === 'processing' ? 'secondary' : 'outline'
          }
          className="capitalize"
        >
          {transaction?.status || 'unknown'}
        </Badge>
      )
    },
    { 
      key: 'payment', 
      header: 'Payment',
      render: (transaction) => (
        <div className="flex items-center">
          <div className={`h-2 w-2 rounded-full mr-2 ${
            transaction?.paymentStatus === 'paid' ? 'bg-green-500' : 'bg-yellow-500'
          }`} />
          <span className="capitalize">{transaction?.paymentStatus || 'pending'}</span>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Transactions</h2>
          <p className="text-muted-foreground">
            View and manage all transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <span className="text-sm font-medium">$</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(transactionsData?.kpis?.totalRevenue || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{transactionsData?.kpis?.revenueChange || 0}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <span className="text-sm font-medium">#</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(transactionsData?.kpis?.totalOrders || 0).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{transactionsData?.kpis?.orderChange || 0}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <span className="text-sm font-medium">AOV</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(transactionsData?.kpis?.avgOrderValue || 0).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +{transactionsData?.kpis?.aovChange || 0}% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Refund Rate</CardTitle>
            <span className="text-sm font-medium">%</span>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {transactionsData?.kpis?.refundRate || 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              {(transactionsData?.kpis?.refundChange || 0) > 0 ? '+' : ''}
              {transactionsData?.kpis?.refundChange || 0}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={filteredTransactions}
            isLoading={isLoading}
            emptyMessage="No transactions found"
          />
        </CardContent>
      </Card>
    </div>
  );
}