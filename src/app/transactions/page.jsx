'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Download, 
  Filter, 
  ArrowUpDown, 
  CreditCard,
  DollarSign,
  TrendingUp,
  RefreshCw,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  User,
  Calendar,
  ShoppingCart
} from 'lucide-react';
import { KpiCard } from '@/components/KpiCard';
import cn from '@/lib/utils';

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
        transaction?.customer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction?.items?.some(item => 
          item?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        let aValue, bValue;
        
        if (sortConfig.key === 'customer') {
          aValue = a?.customer || '';
          bValue = b?.customer || '';
        } else if (sortConfig.key === 'items') {
          aValue = a?.items?.length || 0;
          bValue = b?.items?.length || 0;
        } else if (sortConfig.key === 'total') {
          aValue = a?.amount || 0;
          bValue = b?.amount || 0;
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
        <div className="space-y-1">
          <span className="font-bold text-base">#{transaction?.id || 'N/A'}</span>
          <div className="text-xs text-muted-foreground font-medium flex items-center space-x-1">
            <Calendar className="h-3 w-3" />
            <span>{transaction?.date ? new Date(transaction.date).toLocaleDateString() : 'N/A'}</span>
          </div>
        </div>
      )
    },
    { 
      key: 'customer', 
      header: 'Customer',
      render: (transaction) => {
        const customerName = transaction?.customer || 'Unknown Customer';
        return (
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-border/30 shadow-professional">
              <span className="text-sm font-bold text-primary">
                {customerName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="space-y-1">
              <span className="font-bold text-base">{customerName}</span>
              <div className="text-xs text-muted-foreground font-medium flex items-center space-x-1">
                <User className="h-3 w-3" />
                <span>Customer</span>
              </div>
            </div>
          </div>
        );
      }
    },
    { 
      key: 'method', 
      header: 'Payment Method',
      render: (transaction) => (
        <div className="space-y-1">
          <div className="font-medium text-base flex items-center space-x-2">
            <CreditCard className="h-4 w-4 text-primary" />
            <span>{transaction?.method || 'N/A'}</span>
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            {transaction?.items?.length || 0} items
          </div>
        </div>
      )
    },
    { 
      key: 'amount', 
      header: 'Amount',
      render: (transaction) => (
        <div className="space-y-1">
          <div className="font-bold text-lg text-primary">
            ${(transaction?.amount || 0).toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            transaction value
          </div>
        </div>
      ),
      sortable: true
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (transaction) => (
        <div className="space-y-2">
          <Badge 
            variant={
              transaction?.status === 'completed' ? 'default' : 
              transaction?.status === 'processing' ? 'secondary' : 
              transaction?.status === 'refunded' ? 'destructive' : 'outline'
            }
            className="capitalize font-bold px-3 py-1 rounded-xl"
          >
            {transaction?.status === 'completed' && <CheckCircle className="h-3 w-3 mr-1" />}
            {transaction?.status === 'processing' && <Clock className="h-3 w-3 mr-1" />}
            {transaction?.status === 'refunded' && <AlertCircle className="h-3 w-3 mr-1" />}
            {transaction?.status || 'unknown'}
          </Badge>
          <div className="text-xs text-muted-foreground font-medium">
            {transaction?.date ? new Date(transaction.date).toLocaleTimeString() : 'N/A'}
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (transaction) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 transition-all duration-200"
          >
            <Eye className="h-4 w-4 mr-1" />
            View
          </Button>
          {transaction?.status === 'processing' && (
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 px-3 rounded-xl hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/30 transition-all duration-200"
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              Process
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-professional animate-slide-up p-8">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div className="space-y-3 animate-slide-in-left">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/5 shadow-professional">
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gradient">
                Transaction Management
              </h2>
              <p className="text-muted-foreground text-xl font-medium leading-relaxed">
                Monitor payments, refunds, and financial transactions
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 animate-slide-in-right">
          <Button variant="outline" className="btn-professional h-12 px-6 rounded-xl">
            <RefreshCw className="mr-2 h-5 w-5" />
            Sync Payments
          </Button>
          <Button variant="outline" className="btn-professional h-12 px-6 rounded-xl">
            <Download className="mr-2 h-5 w-5" />
            Export Transactions
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <KpiCard
          title="Total Revenue"
          value={`$${(transactionsData?.kpis?.totalRevenue || 0).toLocaleString()}`}
          change="Monthly revenue"
          changeType="increase"
          icon={DollarSign}
          color="from-green-500/10 to-green-600/5"
        />
        <KpiCard
          title="Completed"
          value={`$${(transactionsData?.kpis?.completed || 0).toLocaleString()}`}
          change="Successfully processed"
          changeType="increase"
          icon={CheckCircle}
          color="from-blue-500/10 to-blue-600/5"
        />
        <KpiCard
          title="Pending"
          value={`$${(transactionsData?.kpis?.pending || 0).toLocaleString()}`}
          change="Awaiting processing"
          changeType="warning"
          icon={Clock}
          color="from-yellow-500/10 to-yellow-600/5"
        />
        <KpiCard
          title="Refunds"
          value={`$${(transactionsData?.kpis?.refunds || 0).toLocaleString()}`}
          change="Total refunded"
          changeType="decrease"
          icon={RefreshCw}
          color="from-red-500/10 to-red-600/5"
        />
      </div>

      {/* Enhanced Transactions Table */}
      <Card className="shadow-professional-xl card-professional">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-green-500/10 to-green-600/5 shadow-professional">
                  <ShoppingCart className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Transaction History</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Complete payment history with detailed transaction information
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="font-bold px-4 py-2 rounded-xl">
                <CreditCard className="h-4 w-4 mr-2" />
                {filteredTransactions.length} transactions
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
            data={filteredTransactions}
            isLoading={isLoading}
            emptyMessage="No transactions found in history"
            searchPlaceholder="Search transactions by ID, customer, or payment method..."
          />
        </CardContent>
      </Card>
    </div>
  );
}