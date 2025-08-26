"use client"
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import styles from "../page.module.css";

export const Logo = () => {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        // < Image className={styles.logo} src={`/logoC-${resolvedTheme ?? "light"}.svg`} alt="fakharnai.com-logo" width={100} height={100} />
        <i className={`fakharnia-logo ${styles.logo}`} ></i>
    )
}

