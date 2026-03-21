import { NextRequest, NextResponse } from 'next/server'
import { createHmac } from 'crypto'

const COOKIE_NAME = 'assistant_session'
const LOGIN_PATH = '/admin/assistant/login'
const PROTECTED_PREFIX = '/admin/assistant'

function verifyToken(token: string, secret: string): boolean {
  const lastDot = token.lastIndexOf('.')
  if (lastDot === -1) return false
  const payload = token.slice(0, lastDot)
  const sig = token.slice(lastDot + 1)
  const expected = createHmac('sha256', secret).update(payload).digest('hex')
  return sig === expected
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  if (!pathname.startsWith(PROTECTED_PREFIX)) return NextResponse.next()
  if (pathname === LOGIN_PATH || pathname.startsWith(LOGIN_PATH + '/')) return NextResponse.next()

  const secret = process.env.ADMIN_SECRET
  if (!secret) return NextResponse.next() // misconfigured — fail open in dev

  const token = req.cookies.get(COOKIE_NAME)?.value
  if (token && verifyToken(token, secret)) return NextResponse.next()

  const loginUrl = req.nextUrl.clone()
  loginUrl.pathname = LOGIN_PATH
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: ['/admin/assistant/:path*'],
}
