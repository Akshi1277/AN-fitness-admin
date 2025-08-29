'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Package, 
  Search, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Filter,
  Download
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { KpiCard } from '@/components/KpiCard';

// Mock data imports
import inventoryData from '@/mock-data/inventory.json';

export default function InventoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      setFilteredItems(inventoryData.items);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredItems(inventoryData.items);
    } else {
      const filtered = inventoryData.items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm]);

  // Table columns
  const columns = [
    { 
      key: 'name', 
      header: 'Product',
      render: (item) => (
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center border border-border/50">
            <Package className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="font-semibold text-sm">{item.name}</div>
            <div className="text-xs text-muted-foreground font-medium">SKU: {item.sku}</div>
          </div>
        </div>
      ),
      cellClassName: 'font-medium'
    },
    { 
      key: 'category', 
      header: 'Category',
      render: (item) => (
        <Badge variant="secondary" className="font-medium">
          {item.category}
        </Badge>
      )
    },
    { 
      key: 'stock', 
      header: 'Stock Level',
      render: (item) => (
        <div className="flex items-center space-x-2">
          <div className={`h-3 w-3 rounded-full ${
            item.stock === 0 ? 'bg-red-500' :
            item.stock <= item.reorderLevel ? 'bg-yellow-500' : 'bg-green-500'
          }`} />
          <span className="font-bold text-sm">{item.stock}</span>
          <span className="text-xs text-muted-foreground">units</span>
        </div>
      ),
      sortable: true
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (item) => {
        const statusConfig = {
          'in-stock': { 
            variant: 'default', 
            icon: CheckCircle, 
            label: 'In Stock',
            className: 'bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400'
          },
          'low-stock': { 
            variant: 'secondary', 
            icon: AlertTriangle, 
            label: 'Low Stock',
            className: 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400'
          },
          'out-of-stock': { 
            variant: 'destructive', 
            icon: XCircle, 
            label: 'Out of Stock',
            className: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/30 dark:text-red-400'
          }
        };
        
        const config = statusConfig[item.status];
        const Icon = config.icon;
        
        return (
          <Badge className={`${config.className} flex items-center space-x-1 font-medium`}>
            <Icon className="h-3 w-3" />
            <span>{config.label}</span>
          </Badge>
        );
      }
    },
    { 
      key: 'price', 
      header: 'Price',
      render: (item) => (
        <div className="font-bold text-sm">
          ${item.price.toFixed(2)}
        </div>
      ),
      sortable: true
    },
    {
      key: 'actions',
      header: '',
      render: () => (
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="h-8 px-3">
            Edit
          </Button>
          <Button variant="ghost" size="sm" className="h-8 px-3 text-muted-foreground hover:text-destructive">
            Delete
          </Button>
        </div>
      )
    }
  ];

  const inStockCount = inventoryData.items.filter(item => item.status === 'in-stock').length;
  const lowStockCount = inventoryData.items.filter(item => item.status === 'low-stock').length;
  const outOfStockCount = inventoryData.items.filter(item => item.status === 'out-of-stock').length;

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Inventory Management
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">
            Monitor and manage your product inventory
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button className="shadow-lg">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Products"
          value={inventoryData.items.length.toString()}
          icon={Package}
          change="Active inventory items"
          changeType="none"
        />
        <KpiCard
          title="In Stock"
          value={inStockCount.toString()}
          icon={CheckCircle}
          change={`${Math.round((inStockCount / inventoryData.items.length) * 100)}% of total`}
          changeType="increase"
        />
        <KpiCard
          title="Low Stock"
          value={lowStockCount.toString()}
          icon={AlertTriangle}
          change="Requires attention"
          changeType={lowStockCount > 0 ? "decrease" : "none"}
        />
        <KpiCard
          title="Out of Stock"
          value={outOfStockCount.toString()}
          icon={XCircle}
          change="Needs restocking"
          changeType={outOfStockCount > 0 ? "decrease" : "none"}
        />
      </div>

      {/* Inventory Table */}
      <Card className="shadow-professional-lg">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-bold">Product Inventory</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Complete list of all products and their stock levels
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="font-medium">
                {filteredItems.length} items
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={filteredItems}
            isLoading={isLoading}
            emptyMessage="No products found"
            searchPlaceholder="Search products, SKU, or category..."
          />
        </CardContent>
      </Card>
    </div>
  );
}