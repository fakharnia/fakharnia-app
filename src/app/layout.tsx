import type { Metadata } from 'next'
import './globals.css'


export const metadata: Metadata = {
  title: 'Fakharnia Dev',
  description: 'Fakharnia Developer!',
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout;