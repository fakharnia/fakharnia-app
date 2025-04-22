'use client';

import { useTheme } from 'next-themes';
import { useEffect } from 'react';

export function ThemeScript() {
    const { theme, systemTheme } = useTheme();

    useEffect(() => {
        document.cookie = `theme=${theme}; path=/`;
    }, [theme]);

    return null;
}