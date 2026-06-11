import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static files, Next.js internal requests, and API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // If the user navigates anywhere outside of /admin, destroy the admin session
  if (!pathname.startsWith('/admin')) {
    const response = NextResponse.next();
    if (request.cookies.has('admin_secret')) {
      response.cookies.delete('admin_secret');
    }
    return response;
  }

  return NextResponse.next();
}
