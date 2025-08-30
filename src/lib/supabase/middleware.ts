// lib/supabase/middleware.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Use getSession() instead of getUser() for better reliability
  const { data: { session }, error } = await supabase.auth.getSession()

  if (error) {
    console.error('Session error:', error);
    // Continue without session - let client side handle it
    return supabaseResponse;
  }

  // Check if the user is trying to access protected routes
  const { pathname } = request.nextUrl;
  const protectedRoutes = ['/my-profile', '/saved-posts'];
  
  // ONLY redirect if NO session exists and trying to access protected routes
  if (protectedRoutes.some(route => pathname.startsWith(route))) {
    if (!session) {
      // Redirect to homepage only if no session
      return NextResponse.redirect(new URL('/', request.url));
    }
    // If session exists, allow access to protected routes
  }

  return supabaseResponse;
}