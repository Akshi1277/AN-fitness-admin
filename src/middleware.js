import { NextResponse } from 'next/server';

// List of public routes that don't require authentication
const publicRoutes = ['/login', '/register', '/forgot-password', '/reset-password'];

// List of protected routes that require authentication
const protectedRoutes = ['/dashboard', '/inventory', '/customers', '/transactions', '/settings'];

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Check if the current route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));
  
  // Get the token from cookies
  const token = request.cookies.get('authToken')?.value;
  
  // Redirect to login if trying to access protected route without auth
  if (isProtectedRoute && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }
  
  // Redirect to dashboard if trying to access login/register while already authenticated
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  // For API routes, check authentication
  if (pathname.startsWith('/api') && !pathname.includes('/api/auth')) {
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // You can add additional API route protection logic here
  }
  
  return NextResponse.next();
}

// Configure which routes the middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
