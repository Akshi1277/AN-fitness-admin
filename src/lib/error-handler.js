/**
 * Error handler utility for API calls and async operations
 */

export class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (error) => {
  console.error('Error:', error);
  
  // Handle different types of errors
  if (error instanceof AppError) {
    return {
      message: error.message,
      status: error.statusCode,
      details: error.details,
      isOperational: true
    };
  }

  // Handle API errors with response
  if (error.response) {
    const { status, data } = error.response;
    return {
      message: data?.message || 'An error occurred',
      status: status,
      details: data?.errors || null,
      isOperational: status >= 400 && status < 500
    };
  }

  // Handle network errors
  if (error.request) {
    return {
      message: 'Network error. Please check your connection and try again.',
      status: 503,
      details: null,
      isOperational: false
    };
  }

  // Handle other errors
  return {
    message: error.message || 'An unexpected error occurred',
    status: 500,
    details: process.env.NODE_ENV === 'development' ? error.stack : null,
    isOperational: false
  };
};

/**
 * Error boundary component for React
 */
export const withErrorBoundary = (WrappedComponent) => {
  return class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
      return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div className="p-4 bg-red-50 border border-red-200 rounded-md">
            <h3 className="text-lg font-medium text-red-800">Something went wrong</h3>
            <p className="mt-2 text-sm text-red-700">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            {process.env.NODE_ENV === 'development' && (
              <pre className="mt-4 p-2 bg-black bg-opacity-5 text-xs overflow-auto rounded">
                {this.state.error?.stack}
              </pre>
            )}
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
};

/**
 * Error display component
 */
export const ErrorMessage = ({ error, className = '' }) => {
  if (!error) return null;
  
  const errorInfo = typeof error === 'string' 
    ? { message: error, status: 400 }
    : error.response 
      ? { 
          message: error.response.data?.message || 'An error occurred',
          status: error.response.status 
        }
      : { message: error.message || 'An unexpected error occurred', status: 500 };

  return (
    <div className={`p-4 bg-red-50 border border-red-200 rounded-md ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            {errorInfo.status} {getStatusText(errorInfo.status)}
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{errorInfo.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get status text
function getStatusText(status) {
  const statusTexts = {
    400: 'Bad Request',
    401: 'Unauthorized',
    403: 'Forbidden',
    404: 'Not Found',
    500: 'Internal Server Error',
    503: 'Service Unavailable',
  };
  
  return statusTexts[status] || 'Error';
}
