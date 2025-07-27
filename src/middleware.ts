import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { i18n } from './i18n.config'
import { match as matchLocale } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

async function fetchCountryFromIP(ip: string): Promise<string | null> {
  try {
    const response = await fetch(`https://ipapi.co/${ip}/country/`)
    if (!response.ok) return null
    return (await response.text()).trim()
  } catch {
    return null
  }
}

function getClientIP(request: NextRequest): string | null {

  if (process.env.NODE_ENV === 'development' && process.env.FAKE_IP) {
    return process.env.FAKE_IP
  }

  const cfIP = request.headers.get('cf-connecting-ip')
  const realIP = request.headers.get('x-real-ip')
  const forwardedFor = request.headers.get('x-forwarded-for')

  return cfIP || realIP || forwardedFor?.split(',')[0] || null
}

function getBrowserLocale(request: NextRequest): string {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(i18n.locales)
  return matchLocale(languages, i18n.locales, i18n.defaultLocale)
}

async function detectPreferredLocale(request: NextRequest): Promise<string> {
  const host = request.headers.get('host') || ''
  if (host.endsWith('.ir')) return 'fa'

  const ip = getClientIP(request)
  const country = ip ? await fetchCountryFromIP(ip) : null
  console.log("IP: ", ip);
  console.log("Country: ", country);
  if (country === 'IR') return 'fa'

  return getBrowserLocale(request)
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const publics = [/\.svg$/, /\.ico$/]
  const isPublic = publics.some((pattern) => pattern.test(pathname))

  if (isPublic) return

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = await detectPreferredLocale(request)

    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    )
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
