import { useState, useCallback } from 'react';
import { errorHandler } from '@/lib/error-handler';

/**
 * Custom hook for handling async operations with loading and error states
 * @param {Function} asyncFunction - The async function to execute
 * @param {Object} options - Configuration options
 * @param {boolean} options.initialLoading - Initial loading state (default: false)
 * @param {Function} options.onSuccess - Callback on successful execution
 * @param {Function} options.onError - Callback on error
 * @returns {Object} - { execute, loading, error, data }
 */
export function useAsync(asyncFunction, options = {}) {
  const {
    initialLoading = false,
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState({
    loading: initialLoading,
    error: null,
    data: null,
  });

  const execute = useCallback(
    async (...args) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      
      try {
        const data = await asyncFunction(...args);
        setState({ loading: false, error: null, data });
        if (onSuccess) onSuccess(data);
        return { data, error: null };
      } catch (error) {
        const errorInfo = errorHandler(error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorInfo,
        }));
        
        if (onError) {
          onError(errorInfo);
        } else if (process.env.NODE_ENV === 'development') {
          console.error('Async operation failed:', errorInfo);
        }
        
        return { data: null, error: errorInfo };
      }
    },
    [asyncFunction, onSuccess, onError]
  );

  return {
    execute,
    loading: state.loading,
    error: state.error,
    data: state.data,
    setData: (data) => setState(prev => ({ ...prev, data })),
  };
}

/**
 * Hook for handling API requests with loading and error states
 * @param {Function} apiCall - The API call function
 * @param {Object} options - Configuration options
 * @returns {[Function, Object]} - [execute, { loading, error, data }]
 */
export function useApi(apiCall, options = {}) {
  const { onSuccess, onError } = options;
  
  const { execute, loading, error, data, setData } = useAsync(
    async (...args) => {
      const response = await apiCall(...args);
      return response.data;
    },
    { onSuccess, onError }
  );

  return [
    execute,
    { loading, error, data, setData }
  ];
}

/**
 * Hook for handling paginated API requests
 * @param {Function} fetchFunction - The function that fetches paginated data
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, pagination, fetchData, setData }
 */
export function usePagination(fetchFunction, options = {}) {
  const {
    initialPage = 1,
    pageSize = 10,
    initialData = [],
    onSuccess,
    onError,
  } = options;

  const [state, setState] = useState({
    data: initialData,
    loading: false,
    error: null,
    pagination: {
      page: initialPage,
      pageSize,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrevious: false,
    },
  });

  const fetchData = useCallback(
    async (params = {}) => {
      setState((prev) => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const response = await fetchFunction({
          page: state.pagination.page,
          pageSize: state.pagination.pageSize,
          ...params,
        });

        const { data, pagination } = response;

        setState((prev) => ({
          ...prev,
          data,
          loading: false,
          pagination: {
            ...prev.pagination,
            ...pagination,
            hasNext: pagination.page < pagination.totalPages,
            hasPrevious: pagination.page > 1,
          },
        }));

        if (onSuccess) onSuccess(response);
        return response;
      } catch (error) {
        const errorInfo = errorHandler(error);
        setState((prev) => ({
          ...prev,
          loading: false,
          error: errorInfo,
        }));

        if (onError) {
          onError(errorInfo);
        }

        throw error;
      }
    },
    [fetchFunction, onError, onSuccess, state.pagination.page, state.pagination.pageSize]
  );

  const setPage = useCallback(
    (page) => {
      setState((prev) => ({
        ...prev,
        pagination: {
          ...prev.pagination,
          page,
        },
      }));
    },
    []
  );

  const setPageSize = useCallback((size) => {
    setState((prev) => ({
      ...prev,
      pagination: {
        ...prev.pagination,
        pageSize: size,
        page: 1, // Reset to first page when page size changes
      },
    }));
  }, []);

  return {
    ...state,
    fetchData,
    setPage,
    setPageSize,
    setData: (data) => setState((prev) => ({ ...prev, data })),
  };
}
