'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import api from '@/lib/api-client';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in on initial load
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Optionally validate token with backend
          // const { data } = await api.get('/auth/me');
          // setUser(data);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await api.login({ email, password });
      localStorage.setItem('authToken', data.token);
      setUser(data.user);
      router.push('/dashboard');
      toast.success('Logged in successfully');
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      toast.error(error.message || 'Login failed. Please try again.');
      return { success: false, error };
    }
  };

  const logout = () => {
    try {
      // Call logout API if needed
      // await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('authToken');
      setUser(null);
      router.push('/login');
    }
  };

  const updateUser = (userData) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Protected Route Component
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, loading, router]);

  if (loading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return isAuthenticated ? children : null;
};
