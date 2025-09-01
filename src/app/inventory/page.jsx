'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import cn from '@/lib/utils';
import { 
  Plus, 
  Package, 
  Search, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  Filter,
  Download,
  Boxes,
  ShoppingCart,
  BarChart3,
  Edit,
  Trash2
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

  // Enhanced table columns
  const columns = [
    { 
      key: 'name', 
      header: 'Product Details',
      render: (item) => (
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center border border-border/30 shadow-professional group-hover:shadow-professional-lg transition-all duration-300">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <div className="space-y-1">
            <div className="font-bold text-base group-hover:text-primary transition-colors duration-200">{item.name}</div>
            <div className="text-sm text-muted-foreground font-medium">SKU: {item.sku}</div>
            <Badge variant="outline" className="text-xs px-2 py-0.5 rounded-lg font-medium">
              {item.category}
            </Badge>
          </div>
        </div>
      ),
      cellClassName: 'font-medium'
    },
    { 
      key: 'stock', 
      header: 'Stock Status',
      render: (item) => (
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "h-4 w-4 rounded-full shadow-sm",
              item.stock === 0 ? 'bg-red-500 animate-pulse' :
              item.stock <= item.reorderLevel ? 'bg-yellow-500 animate-bounce-subtle' : 'bg-green-500'
            )} />
            <div className="space-y-0.5">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg">{item.stock}</span>
                <span className="text-sm text-muted-foreground font-medium">units</span>
              </div>
              <div className="text-xs text-muted-foreground font-medium">
                Reorder at {item.reorderLevel}
              </div>
            </div>
          </div>
          
          {/* Stock level bar */}
          <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
            <div 
              className={cn(
                "h-full rounded-full transition-all duration-500 shadow-sm",
                item.stock === 0 ? 'bg-red-500' :
                item.stock <= item.reorderLevel ? 'bg-yellow-500' : 'bg-green-500'
              )}
              style={{ 
                width: `${Math.min((item.stock / (item.reorderLevel * 3)) * 100, 100)}%` 
              }}
            />
          </div>
        </div>
      ),
      sortable: true
    },
    { 
      key: 'status', 
      header: 'Availability',
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
          <Badge className={cn(
            config.className, 
            "flex items-center space-x-2 font-bold px-4 py-2 rounded-xl shadow-sm hover:shadow-professional transition-all duration-200"
          )}>
            <Icon className="h-4 w-4" />
            <span>{config.label}</span>
          </Badge>
        );
      }
    },
    { 
      key: 'price', 
      header: 'Pricing',
      render: (item) => (
        <div className="space-y-1">
          <div className="font-bold text-lg text-primary">
            ${item.price.toFixed(2)}
          </div>
          <div className="text-xs text-muted-foreground font-medium">
            per unit
          </div>
        </div>
      ),
      sortable: true
    },
    {
      key: 'actions',
      header: 'Actions',
      render: (item) => (
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 px-3 rounded-xl hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900/30 transition-all duration-200"
          >
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-9 px-3 rounded-xl hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/30 transition-all duration-200"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            Delete
          </Button>
        </div>
      )
    }
  ];

  const inStockCount = inventoryData.items.filter(item => item.status === 'in-stock').length;
  const lowStockCount = inventoryData.items.filter(item => item.status === 'low-stock').length;
  const outOfStockCount = inventoryData.items.filter(item => item.status === 'out-of-stock').length;
  const totalValue = inventoryData.items.reduce((sum, item) => sum + (item.price * item.stock), 0);

  return (
    <div className="space-professional animate-slide-up">
      {/* Enhanced Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-12">
        <div className="space-y-3 animate-slide-in-left">
          <div className="flex items-center space-x-4">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 shadow-professional">
              <Boxes className="h-8 w-8 text-emerald-600" />
            </div>
            <div>
              <h2 className="text-4xl font-bold tracking-tight text-gradient">
                Inventory Management
              </h2>
              <p className="text-muted-foreground text-xl font-medium leading-relaxed">
                Monitor and manage your product inventory with precision
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4 animate-slide-in-right">
          <Button variant="outline" className="btn-professional h-12 px-6 rounded-xl">
            <Download className="mr-2 h-5 w-5" />
            Export Inventory
          </Button>
          <Button className="btn-professional h-12 px-6 rounded-xl shadow-professional-lg bg-gradient-to-r from-primary to-primary/90">
            <Plus className="mr-2 h-5 w-5" />
            Add New Product
          </Button>
        </div>
      </div>

      {/* Enhanced KPI Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
        <KpiCard
          title="Total Products"
          value={inventoryData.items.length.toString()}
          icon={Package}
          change="Active inventory items"
          changeType="none"
          color="from-blue-500/10 to-blue-600/5"
        />
        <KpiCard
          title="In Stock"
          value={inStockCount.toString()}
          icon={CheckCircle}
          change={`${Math.round((inStockCount / inventoryData.items.length) * 100)}% of total inventory`}
          changeType="increase"
          color="from-green-500/10 to-green-600/5"
        />
        <KpiCard
          title="Low Stock Alert"
          value={lowStockCount.toString()}
          icon={AlertTriangle}
          change="Requires immediate attention"
          changeType={lowStockCount > 0 ? "decrease" : "none"}
          color="from-yellow-500/10 to-yellow-600/5"
        />
        <KpiCard
          title="Inventory Value"
          value={`$${totalValue.toLocaleString()}`}
          icon={BarChart3}
          change="Total stock value"
          changeType="increase"
          color="from-purple-500/10 to-purple-600/5"
        />
      </div>

      {/* Enhanced Inventory Table */}
      <Card className="shadow-professional-xl card-professional">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 shadow-professional">
                  <ShoppingCart className="h-5 w-5 text-emerald-600" />
                </div>
                <CardTitle className="text-2xl font-bold tracking-tight">Product Inventory</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Complete overview of all products with real-time stock levels and status
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="font-bold px-4 py-2 rounded-xl">
                <Package className="h-4 w-4 mr-2" />
                {filteredItems.length} products
              </Badge>
              {lowStockCount > 0 && (
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 font-bold px-4 py-2 rounded-xl animate-bounce-subtle">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  {lowStockCount} low stock
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={filteredItems}
            isLoading={isLoading}
            emptyMessage="No products found in inventory"
            searchPlaceholder="Search products, SKU, category, or status..."
          />
        </CardContent>
      </Card>
    </div>
  );
}