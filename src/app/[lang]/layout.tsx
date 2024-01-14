import type { Metadata } from 'next'
import { i18n } from '../../i18n-config'
import { Providers } from "./contexts/themeProvider"
import './globals.css'

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: 'Fakharnia Dev',
  description: 'Fakharnia Developer!',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout;