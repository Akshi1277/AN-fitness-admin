"use client";

import { Inter } from 'next/font/google';
import '../globals.css';
import '../print.css';
import { cn } from '@/lib/utils';
import { Sidebar } from '@/components/Sidebar';
import Toaster from '@/components/Toaster';
import ThemeProvider from '@/components/ThemeProvider';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

const inter = Inter({ subsets: ['latin'] });

// Print function
const handlePrint = () => {
  window.print();
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>AN Fitness Admin</title>
        <meta name="description" content="Admin dashboard for AN Fitness" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", inter.className)}>
        <ThemeProvider>
          <div className="flex min-h-screen bg-background">
            <Sidebar className="no-print" />
            <div className="flex-1 flex flex-col">
              <header className="h-16 border-b flex items-center px-6 bg-card shadow-sm no-print">
                <div className="flex items-center justify-between w-full">
                  <h1 className="text-xl font-semibold">Dashboard</h1>
                  <div className="flex items-center space-x-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={handlePrint}
                      className="print:hidden"
                    >
                      <Printer className="h-4 w-4 mr-2" />
                      Print
                    </Button>
                    <ThemeToggle />
                    <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                      <span className="text-sm font-medium">AG</span>
                    </div>
                  </div>
                </div>
              </header>
              <main className="flex-1 p-6 bg-background print:p-0 print:bg-white">
                <div className="print-only p-4 text-center print:p-0">
                  <h1 className="text-2xl font-bold mb-2">AN Fitness</h1>
                  <p className="text-muted-foreground">Report generated on {new Date().toLocaleDateString()}</p>
                </div>
                <div className="print:mx-4">
                  {children}
                </div>
              </main>
            </div>
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
