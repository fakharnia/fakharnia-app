"use client"
import { useEffect, useState } from "react";
import { useTheme } from "next-themes"
import Image from "next/image";
import { Widget } from "./widget";
import Link from "next/link";
import styles from "../page.module.css";
import localFont from "@next/font/local";

type propType = {
    locale: any,
    language: string
}

const vazir = localFont({ src: "../../fonts/vazir.woff2" });

export const WelcomePage = (props: propType) => {

    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    const { locale, language } = props;

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        <div className={styles.welcomeBox} >
            <div className={styles.widgetBox}>
                <Image
                    src={`/logoC-${resolvedTheme ?? "light"}.svg`}
                    alt="fakharnia.com"
                    width={100}
                    height={100}
                    className={styles.welcomeLogo}
                />
                <Widget language={language} />
            </div>

            <div className={`${styles.welcomeTextBox} ${language === "fa" ? vazir.className : ""}`} style={{ direction: language === "fa" ? "rtl" : "ltr" }}>
                <h5 className={`${styles.welcomeTitle} ${language === "fa" ? styles.farsiTitle : ""}`}>{locale.welcome.title}</h5>
                <p className={`${styles.welcomeText} ${language === "fa" ? styles.farsiText : ""}`}>{locale.welcome.text}</p>
            </div>

            <Link className={`${styles.welcomeButton} ${language === "fa" ? vazir.className : ""}`} href={`${language}/index`}>{locale.welcome.button}</Link>
        </div >
    );
}