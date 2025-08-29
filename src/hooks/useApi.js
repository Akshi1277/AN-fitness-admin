import { useState, useCallback } from 'react';
import { toast } from '@/components/ui/use-toast';

export function useApi(apiFunction) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      try {
        setLoading(true);
        setError(null);
        const response = await apiFunction(...args);
        setData(response);
        return response;
      } catch (err) {
        setError(err);
        toast({
          title: 'Error',
          description: err.message || 'Something went wrong',
          variant: 'destructive',
        });
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, execute };
}
