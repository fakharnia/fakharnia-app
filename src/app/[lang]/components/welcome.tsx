"use client"
import { useEffect, useState } from "react";
import { useTheme } from "next-themes"
import Image from "next/image";
import { Widget } from "./widget";
import Link from "next/link";
import styles from "../page.module.css";
import localFont from "@next/font/local";
import { GenerateClass } from "../utils";

type propType = {
    locale: any,
    language: string
}

const vazir = localFont({ src: "../../fonts/vazir.woff2" });

export const WelcomePage = (props: propType) => {

    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();
    const { locale, language } = props;
    const getClasses = GenerateClass(language, styles);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) {
        return null;
    }

    return (
        <div className={`${styles.welcomeBox} ${language === "fa" ? vazir.className : ""}`} >
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

            <div className={styles.welcomeTextBox} style={{ direction: language === "fa" ? "rtl" : "ltr" }}>
                <h5 className={getClasses("welcomeTitle")}>{locale.welcome.title}</h5>
                <p className={getClasses("welcomeText")}>{locale.welcome.text}</p>
            </div >

            <Link className={getClasses("welcomeButton")} href={`${language}/index`}>{locale.welcome.button}</Link>
        </div >
    );
}