import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Skeleton } from "./ui/skeleton";
import { useState, useMemo, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown, ChevronLeft, ChevronRight, Search, Filter, MoreHorizontal, Eye } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';
import cn from "@/lib/utils";



export function DataTable({ 
  columns, 
  data, 
  isLoading, 
  emptyMessage = 'No data available',
  searchable = true,
  searchPlaceholder = 'Search...',
  onSearch,
  pagination = true,
  className = ""
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Handle search
  useEffect(() => {
    if (onSearch) {
      onSearch(debouncedSearchTerm);
    }
    setCurrentPage(1); // Reset to first page on search
  }, [debouncedSearchTerm, onSearch]);

  // Handle sorting
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Process and sort data
  const processedData = useMemo(() => {
    let sortableData = [...(data || [])];
    
    // Apply sorting
    if (sortConfig.key) {
      sortableData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];
        
        // Handle nested objects
        if (sortConfig.key.includes('.')) {
          const keys = sortConfig.key.split('.');
          aValue = keys.reduce((obj, key) => obj?.[key], a);
          bValue = keys.reduce((obj, key) => obj?.[key], b);
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
    
    return sortableData;
  }, [data, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(processedData.length / ITEMS_PER_PAGE);
  const paginatedData = pagination 
    ? processedData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
      )
    : processedData;

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-96 rounded-xl" />
            <Skeleton className="h-12 w-32 rounded-xl" />
          </div>
          <Skeleton className="h-12 w-24 rounded-xl" />
        </div>
        <div className="border border-border/30 rounded-2xl overflow-hidden shadow-professional bg-card/50 backdrop-blur-sm">
          <div className="p-6 border-b border-border/30 bg-muted/20">
            <div className="flex space-x-6">
              {columns.map((_, i) => (
                <Skeleton key={i} className="h-5 flex-1 rounded-lg" />
              ))}
            </div>
          </div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="p-6 border-b border-border/20 last:border-b-0">
              <div className="flex space-x-6">
                {columns.map((_, j) => (
                  <Skeleton key={j} className="h-8 flex-1 rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex h-80 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-border/50 bg-muted/20 backdrop-blur-sm">
        <div className="text-center space-y-4 animate-scale-in">
          <div className="w-20 h-20 bg-gradient-to-br from-muted to-muted/50 rounded-2xl flex items-center justify-center mx-auto shadow-professional">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-xl font-bold text-muted-foreground">{emptyMessage}</p>
            <p className="text-sm text-muted-foreground font-medium max-w-md">
              Try adjusting your search criteria or filters to find what you're looking for
            </p>
          </div>
          <Button variant="outline" className="mt-4 btn-professional">
            <Filter className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-professional", className)}>
      {searchable && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                className="pl-12 h-12 bg-background/60 border-border/50 focus:bg-background focus:border-primary/50 focus:shadow-professional transition-all duration-300 rounded-xl text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="btn-professional h-12 px-6 rounded-xl">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
          
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="px-3 py-1.5 font-semibold rounded-xl">
              {processedData.length} {processedData.length === 1 ? 'item' : 'items'}
            </Badge>
            <Button variant="outline" size="sm" className="btn-professional rounded-xl">
              <Eye className="h-4 w-4 mr-2" />
              View Options
            </Button>
          </div>
        </div>
      )}
      
      <div className="rounded-2xl border border-border/30 overflow-hidden shadow-professional-lg bg-card/80 backdrop-blur-sm">
        <div className="overflow-x-auto">
          <Table className="table-professional">
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-muted/40 to-muted/20 hover:from-muted/60 hover:to-muted/40 border-border/30 transition-all duration-300">
                {columns.map((column, index) => (
                  <TableHead
                    key={column.key}
                    className={cn(
                      "h-16 px-8 text-left align-middle font-bold text-foreground tracking-wide [&:has([role=checkbox])]:pr-0",
                      column.sortable ? 'cursor-pointer select-none hover:bg-muted/40 transition-all duration-200' : '',
                      "animate-slide-in-left"
                    )}
                    style={{ animationDelay: `${index * 50}ms` }}
                    onClick={() => column.sortable && requestSort(column.key)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm">{column.header}</span>
                      {column.sortable && (
                        <div className={cn(
                          "p-1 rounded-lg transition-all duration-200",
                          sortConfig.key === column.key 
                            ? 'bg-primary/20 text-primary' 
                            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                        )}>
                          <ArrowUpDown className="h-4 w-4" />
                        </div>
                      )}
                    </div>
                  </TableHead>
                ))}
                <TableHead className="w-16 px-8">
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((row, rowIndex) => (
                <TableRow 
                  key={rowIndex} 
                  className={cn(
                    "hover:bg-muted/30 transition-all duration-300 border-border/20 group cursor-pointer",
                    "animate-slide-up hover:shadow-professional"
                  )}
                  style={{ animationDelay: `${rowIndex * 50}ms` }}
                >
                  {columns.map((column) => (
                    <TableCell
                      key={`${rowIndex}-${column.key}`}
                      className={cn(
                        "px-8 py-6 align-middle [&:has([role=checkbox])]:pr-0 transition-all duration-200",
                        column.cellClassName || ''
                      )}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </TableCell>
                  ))}
                  <TableCell className="px-8 py-6">
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-accent/50"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6">
          <div className="text-sm text-muted-foreground font-semibold">
            Showing{' '}
            <span className="font-bold text-foreground bg-muted/50 px-2 py-1 rounded-lg">
              {(currentPage - 1) * ITEMS_PER_PAGE + 1}
            </span>{' '}
            to{' '}
            <span className="font-bold text-foreground bg-muted/50 px-2 py-1 rounded-lg">
              {Math.min(currentPage * ITEMS_PER_PAGE, processedData.length)}
            </span>{' '}
            of{' '}
            <span className="font-bold text-foreground bg-muted/50 px-2 py-1 rounded-lg">
              {processedData.length}
            </span>{' '}
            results
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentPage === 1}
              className="h-10 w-10 p-0 rounded-xl btn-professional"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            
            <div className="flex items-center space-x-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                const pageNum = i + 1;
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setCurrentPage(pageNum)}
                    className={cn(
                      "h-10 w-10 p-0 rounded-xl font-bold transition-all duration-200",
                      currentPage === pageNum 
                        ? "shadow-professional-lg scale-110" 
                        : "hover:bg-accent/50 hover:scale-105"
                    )}
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              {totalPages > 5 && (
                <>
                  <span className="px-2 text-muted-foreground">...</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setCurrentPage(totalPages)}
                    className="h-10 w-10 p-0 rounded-xl hover:bg-accent/50 hover:scale-105 transition-all duration-200"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className="h-10 w-10 p-0 rounded-xl btn-professional"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}