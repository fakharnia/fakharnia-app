import type { Metadata } from 'next'
import { i18n } from '../../i18n.config'
import { Providers } from "./contexts/themeProvider"
import './globals.css'
import { GenosFont } from "./utils"



export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export const metadata: Metadata = {
  title: 'Fakharnia Dev',
  description: 'Fakharnia Developer!',
}

type propType = {
  children: React.ReactNode,
  params: { lang: any }
}

const RootLayout = ({ children, params }: propType) => {

  return (
    <html lang="en" className={GenosFont.className}>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout;