'use client';

import { Download, FileText, FileSpreadsheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { exportToCsv, exportToJson, exportToExcel } from '@/lib/export-utils';

export function ExportButton({ data, columns, filename, disabled = false }) {
  const handleExport = (format) => {
    if (!data || data.length === 0) return;
    
    try {
      switch (format) {
        case 'csv':
          exportToCsv(data, filename, columns);
          break;
        case 'json':
          exportToJson(data, filename);
          break;
        case 'excel':
          exportToExcel(data, filename, columns);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Export failed:', error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" disabled={disabled}>
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleExport('csv')}>
          <FileText className="mr-2 h-4 w-4" />
          Export as CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('excel')}>
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('json')}>
          <FileText className="mr-2 h-4 w-4" />
          Export as JSON
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
