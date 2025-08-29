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
import { ArrowUpDown, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { useDebounce } from '@/hooks/useDebounce';

const ITEMS_PER_PAGE = 10;

export function DataTable({ 
  columns, 
  data, 
  isLoading, 
  emptyMessage = 'No data available',
  searchable = true,
  searchPlaceholder = 'Search...',
  onSearch,
  pagination = true
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  
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
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-12 w-full" />
        ))}
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 flex-col items-center justify-center rounded-md border">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {searchable && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
      
      <div className="rounded-md border">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                {columns.map((column) => (
                  <th
                    key={column.key}
                    className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${
                      column.sortable ? 'cursor-pointer select-none hover:bg-muted/50' : ''
                    }`}
                    onClick={() => column.sortable && requestSort(column.key)}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {column.sortable && (
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((row, rowIndex) => (
                <tr key={rowIndex} className="border-b hover:bg-muted/50">
                  {columns.map((column) => (
                    <td
                      key={`${rowIndex}-${column.key}`}
                      className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${column.cellClassName || ''}`}
                    >
                      {column.render ? column.render(row) : row[column.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-2">
          <div className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{(currentPage - 1) * ITEMS_PER_PAGE + 1}</span> to{' '}
            <span className="font-medium">
              {Math.min(currentPage * ITEMS_PER_PAGE, processedData.length)}
            </span>{' '}
            of <span className="font-medium">{processedData.length}</span> results
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePrevious}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="text-sm">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNext}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
