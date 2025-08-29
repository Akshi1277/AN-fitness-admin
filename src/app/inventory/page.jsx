'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Package, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

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
        item.sku.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredItems(filtered);
    }
  }, [searchTerm]);

  // Table columns
  const columns = [
    { 
      key: 'name', 
      header: 'Product Name',
      cellClassName: 'font-medium'
    },
    { 
      key: 'sku', 
      header: 'SKU',
      cellClassName: 'text-muted-foreground'
    },
    { 
      key: 'category', 
      header: 'Category'
    },
    { 
      key: 'stock', 
      header: 'Stock',
      render: (item) => (
        <div className="flex items-center">
          <div 
            className={`h-2 w-2 rounded-full mr-2 ${
              item.stock === 0 ? 'bg-red-500' :
              item.stock <= item.reorderLevel ? 'bg-yellow-500' : 'bg-green-500'
            }`}
          />
          {item.stock}
        </div>
      )
    },
    { 
      key: 'status', 
      header: 'Status',
      render: (item) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          item.status === 'in-stock' ? 'bg-green-100 text-green-800' :
          item.status === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {item.status === 'in-stock' ? 'In Stock' :
           item.status === 'low-stock' ? 'Low Stock' : 'Out of Stock'}
        </span>
      )
    },
    { 
      key: 'price', 
      header: 'Price',
      render: (item) => `$${item.price.toFixed(2)}`
    },
    {
      key: 'actions',
      header: '',
      render: () => (
        <Button variant="ghost" size="sm">
          Edit
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Inventory Management</h2>
          <p className="text-muted-foreground">
            Manage your product inventory and stock levels
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Package className="mr-2 h-4 w-4" />
            All Products
          </Button>
          <Button variant="outline">
            Filter
          </Button>
        </div>
      </div>

      {/* Inventory Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{inventoryData.items.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Stock</CardTitle>
            <div className="h-4 w-4 rounded-full bg-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryData.items.filter(item => item.status === 'in-stock').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <div className="h-4 w-4 rounded-full bg-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryData.items.filter(item => item.status === 'low-stock').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Out of Stock</CardTitle>
            <div className="h-4 w-4 rounded-full bg-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryData.items.filter(item => item.status === 'out-of-stock').length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable 
            columns={columns} 
            data={filteredItems}
            isLoading={isLoading}
            emptyMessage="No products found"
          />
        </CardContent>
      </Card>
    </div>
  );
}
