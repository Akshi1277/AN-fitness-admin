'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { 
  Activity, 
  Sparkles, 
  Shield, 
  Eye, 
  EyeOff, 
  Lock, 
  Mail, 
  ArrowRight,
  Zap,
  CheckCircle2
} from 'lucide-react';
import cn from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get('from') || '/dashboard';
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Set a dummy auth token in development mode
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      document.cookie = 'authToken=dummy-token; path=/;';
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Redirect to the intended URL or dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-background bg-professional relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Animated Background Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-primary/10 to-purple-500/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:flex-1 lg:flex-col lg:justify-center lg:px-20 relative z-10">
        <div className="animate-slide-in-left">
          <div className="flex items-center space-x-4 mb-8">
            <div className="relative">

               <Image 
                    src="/anfitness.jpg" 
                    alt="AN Fitness Logo" 
                    width={70} 
                    height={100} 
                    className="rounded-xl object-cover"
                  />
              {/* <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/80 rounded-3xl flex items-center justify-center shadow-professional-lg animate-pulse-glow">
                <Activity className="h-9 w-9 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2">
                <Sparkles className="h-6 w-6 text-yellow-500 animate-bounce-subtle" />
              </div> */}
            </div>
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-gradient">AN Fitness</h1>
              <p className="text-lg text-muted-foreground font-medium tracking-wide">
                E-commerce Admin
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <h2 className="text-5xl font-bold tracking-tight">
              Manage Your
              <br />
              <span className="text-gradient">Gym Equipment Store</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed max-w-lg">
              Complete e-commerce management for gym equipment, fitness accessories, and spare parts. 
              Track inventory, process orders, and grow your fitness business.
            </p>
            
            {/* Feature Cards */}
            <div className="grid gap-4 mt-12">
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm shadow-professional">
                <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Inventory Management</p>
                  <p className="text-sm text-muted-foreground">Track stock levels and products</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm shadow-professional">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Order Processing</p>
                  <p className="text-sm text-muted-foreground">Manage customer orders efficiently</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 p-4 rounded-2xl bg-card/50 border border-border/30 backdrop-blur-sm shadow-professional">
                <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                  <Zap className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sales Analytics</p>
                  <p className="text-sm text-muted-foreground">Monitor performance and revenue</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 relative z-10">
        <div className="mx-auto w-full max-w-md animate-slide-in-right">
          {/* Mobile Logo */}
          <div className="flex lg:hidden items-center justify-center space-x-3 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-professional-lg">
              <Activity className="h-7 w-7 text-primary-foreground" />
            </div>
            <h1 className="text-2xl font-bold text-gradient">AN Fitness</h1>
          </div>

        

          <div className="bg-card/80 backdrop-blur-xl rounded-3xl p-8 shadow-professional-xl border border-border/30 relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-purple-500/5" />
            
            <div className="relative z-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-foreground">
                  Welcome Back
                </h2>
                <p className="mt-3 text-muted-foreground font-medium">
                  Sign in to manage your gym equipment store
                </p>
              </div>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                {/* Email Field */}
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-semibold text-foreground">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="pl-12 h-12 bg-background/60 border-border/50 focus:bg-background focus:border-primary/50 focus:shadow-professional transition-all duration-300 rounded-xl"
                      placeholder="admin@example.com"
                      defaultValue="admin@anfitness.com"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label htmlFor="password" className="block text-sm font-semibold text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      className="pl-12 pr-12 h-12 bg-background/60 border-border/50 focus:bg-background focus:border-primary/50 focus:shadow-professional transition-all duration-300 rounded-xl"
                      placeholder="Enter any password"
                      defaultValue="admin123"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-primary focus:ring-primary border-border rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 text-sm text-muted-foreground">
                      Remember me
                    </label>
                  </div>
                  <button
                    type="button"
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    "w-full h-12 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground font-semibold rounded-xl shadow-professional-lg transition-all duration-300 hover:shadow-professional-xl hover:scale-[1.02]",
                    isLoading && "opacity-80 cursor-not-allowed"
                  )}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      <span>Signing In...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <span>Enter Dashboard</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  )}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-8 p-4 bg-muted/30 rounded-2xl border border-border/30">
                <p className="text-sm font-medium text-foreground mb-2">Demo Credentials:</p>
                <div className="space-y-1 text-xs text-muted-foreground">
                  <p><span className="font-medium">Email:</span> Any valid email format</p>
                  <p><span className="font-medium">Password:</span> Any password</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Powered by AN Fitness © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
}