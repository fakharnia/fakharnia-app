"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import localFont from "@next/font/local";
import { useTheme } from "next-themes";
import { Widget } from "../../components/widget";
import styles from "../page.module.css";
import { GenerateClass } from "../../utils";

type propType = {
    language: string,
    dictionary: any,
    title: string
}
const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

export const Header = (props: propType) => {
    const wrapperRef = useRef<HTMLDivElement>(null);;
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme } = useTheme();

    const { language, dictionary, title } = props;
    const [smartMenu, setSmartMenu] = useState(false);

    useEffect(() => {

    }, []);

    useEffect(() => {
        setMounted(true);
        const handleClickOutside = (event: any) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSmartMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return
    }, [])

    if (!mounted) {
        return null;
    }

    const getClasses = GenerateClass(language, styles);

    const getLink = (index: number, menuItem: any) => {
        if (menuItem.isActive) {
            return <Link key={index} href={`/${language}/index/${menuItem.link}`} className={`${getClasses("navLink")} ${!menuItem.isActive ? styles.navItemDeactive : ""}`}>{menuItem.title}</Link>
        } else {
            return <p key={index} className={`${getClasses("navLink")} ${!menuItem.isActive ? styles.navItemDeactive : ""}`}>{menuItem.title}</p>;
        }
    }

    return (
        <div className={styles.header} ref={wrapperRef} style={{ direction: language === "fa" ? "rtl" : "ltr" }}>
            <Link href={`/${language}/index`} className={styles.headerLogo}>
                < Image className={styles.headerLogo} src={`/logo-${resolvedTheme ?? "light"}.svg`} alt="fakharnai.com-logo" width={100} height={100} />
            </Link>
            <h5 className={`${styles.headerTitle} ${language === "fa" ? `${vazir.className} ${styles.headerTitleFarsi}` : ""}`}>{title}</h5>
            <button className={`fakharnia-more ${styles.headerMoreButton}`} onClick={() => { setSmartMenu(!smartMenu) }}></button>
            <div className={`${styles.smartMenu} ${smartMenu ? `${styles.smartMenuDisplayed} ${language === "fa" ? styles.smartMenuDisplayedFarsi : ""}` : ""}`}>
                <Widget language={props.language} />
                <div className={`${styles.smartNav} ${props.language === "fa" ? vazir.className : ""}`}>
                    {
                        dictionary.menu.map((menu: any, index: number) => getLink(index, menu))
                    }
                </div>
            </div>
        </div>
    )
}