import axios from 'axios';
import { errorHandler } from './error-handler';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for API calls
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or cookie
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for API calls
apiClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle 401 Unauthorized
    if (error.response?.status === 401) {
      // Clear auth data and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.location.href = '/login';
      }
    }
    
    const errorInfo = errorHandler(error);
    return Promise.reject(errorInfo);
  }
);

// API methods
const api = {
  // Auth
  login: (credentials) => apiClient.post('/auth/login', credentials),
  logout: () => apiClient.post('/auth/logout'),
  refreshToken: () => apiClient.post('/auth/refresh-token'),
  
  // Users
  getUsers: (params) => apiClient.get('/users', { params }),
  getUser: (id) => apiClient.get(`/users/${id}`),
  createUser: (data) => apiClient.post('/users', data),
  updateUser: (id, data) => apiClient.put(`/users/${id}`, data),
  deleteUser: (id) => apiClient.delete(`/users/${id}`),
  
  // Products/Inventory
  getProducts: (params) => apiClient.get('/products', { params }),
  getProduct: (id) => apiClient.get(`/products/${id}`),
  createProduct: (data) => apiClient.post('/products', data),
  updateProduct: (id, data) => apiClient.put(`/products/${id}`, data),
  deleteProduct: (id) => apiClient.delete(`/products/${id}`),
  
  // Categories
  getCategories: () => apiClient.get('/categories'),
  
  // Orders/Transactions
  getOrders: (params) => apiClient.get('/orders', { params }),
  getOrder: (id) => apiClient.get(`/orders/${id}`),
  createOrder: (data) => apiClient.post('/orders', data),
  updateOrderStatus: (id, status) => apiClient.patch(`/orders/${id}/status`, { status }),
  
  // Uploads
  uploadFile: (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('file', file);
    
    return apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });
  },
  
  // Custom request
  request: (config) => apiClient(config),
};

export default api;
