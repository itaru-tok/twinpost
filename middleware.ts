import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const { pathname } = req.nextUrl
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/billing')) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    if (!url || !anon) return res
    const supabase = createServerClient(url, anon, {
      cookies: {
        get(name: string) { return req.cookies.get(name)?.value },
        set(name: string, value: string, options: any) { res.cookies.set({ name, value, ...options }) },
        remove(name: string, options: any) { res.cookies.set({ name, value: '', ...options }) },
      },
      headers: {
        get(name: string) { return req.headers.get(name) ?? undefined },
        set(name: string, value: string) { res.headers.set(name, value) },
      }
    })
    const { data, error } = await supabase.auth.getUser()
    if (error || !data?.user) {
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = '/auth/signup'
      return NextResponse.redirect(redirectUrl)
    }
  }
  return res
}

export const config = { matcher: ['/dashboard/:path*','/billing/:path*'] }
