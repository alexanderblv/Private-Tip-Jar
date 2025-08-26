import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const host = request.headers.get('host')
  if (host) {
    res.headers.set('x-base-url', `${request.nextUrl.protocol}//${host}`)
  }
  return res
}

export const config = {
  matcher: ['/((?!_next|.*\..*).*)'],
}