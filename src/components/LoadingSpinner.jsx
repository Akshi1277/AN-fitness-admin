import { Loader2 } from 'lucide-react';

export function LoadingSpinner({ size = 24, className = '' }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className={`h-${size} w-${size} animate-spin`} />
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LoadingOverlay({ isLoading, children }) {
  if (!isLoading) return children;
  
  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-background/80 flex items-center justify-center z-50">
        <LoadingSpinner size={48} />
      </div>
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <LoadingSpinner size={48} />
    </div>
  );
}
