'use client'

import { ThemeProvider } from 'next-themes'

type propType = {
    children: React.ReactNode,
}

export function Providers({ children }: propType) {
    return <ThemeProvider>{children}</ThemeProvider>
}