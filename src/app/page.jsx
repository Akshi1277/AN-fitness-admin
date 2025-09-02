'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/dashboard';

  // Set a dummy auth token in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      document.cookie = 'authToken=dummy-token; path=/;';
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Redirect to the intended URL or dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Welcome to Admin Panel
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Development Mode - No Authentication Required
          </p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email (any value)
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                className="mt-1"
                placeholder="email@example.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password (any value)
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                className="mt-1"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <Button
              type="submit"
              className="w-full flex justify-center"
            >
              Enter Dashboard
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}