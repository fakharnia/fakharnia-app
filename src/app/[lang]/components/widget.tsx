"use client"
import { useEffect, useState } from "react";
import { usePathname } from 'next/navigation'
import { i18n } from "@/i18n.config";
import { useTheme } from "next-themes";
import Link from "next/link";
import styles from "../page.module.css";
import { GenerateClass } from "../utils";

type propType = {
    language: string
}

export const Widget = (props: propType) => {

    const { language } = props;
    const [mounted, setMounted] = useState(false)
    const { resolvedTheme, setTheme } = useTheme();

    const pathName = usePathname()

    const getClasses = GenerateClass(language, styles);


    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    const redirectedPathName = (locale: string) => {
        if (!pathName) {
            return '/';
        }
        const segments = pathName.split('/');
        segments[1] = locale;
        return segments.join('/');
    }

    const changeTheme = () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
    }

    return (
        <div className={styles.languageBox}>
            {i18n.locales.map((locale, index) => {
                return (
                    <Link key={index} className={`${locale === language ? styles.activeLanguage : ""} ${styles.languageLink}`} href={redirectedPathName(locale)}>{locale.toUpperCase()}</Link>
                )
            }
            )}
            <button className={`${resolvedTheme === "dark" ? "fakharnia-day" : "fakharnia-night"} ${styles.themeButton}`} onClick={() => { changeTheme() }}></button>
        </div>
    );
}