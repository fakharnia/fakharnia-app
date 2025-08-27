"use client"

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Widget } from "../components/widget";
import styles from "../page.module.css";
import { GenerateClass, VazirFont } from "../utils";
import { usePathname } from "next/navigation";

type propType = {
    language: string,
    dictionary: any,
    title: string
}

export const Header = (props: propType) => {
    const wrapperRef = useRef<HTMLDivElement>(null);;
    const [mounted, setMounted] = useState(false);
    const pathname = usePathname();

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
        const isActive = `/${language}/${menuItem.link}`.startsWith(pathname);
        if (isActive) {
            return (
                <p
                    key={index}
                    className={`${getClasses("navLink")} ${getClasses("navItemActive")} ${!menuItem.isActive ? styles.navItemDeactive : ""}`}
                >
                    {menuItem.title}
                </p>
            );
        } else {
            return (
                <Link key={index} href={`/${language}/${menuItem.link}`} className={`${getClasses("navLink")} ${!menuItem.isActive ? styles.navItemDeactive : ""}`}>
                    {menuItem.title}
                </Link>
            );
        }
    };

    return (
        <div className={styles.header} ref={wrapperRef} style={{ direction: language === "fa" ? "rtl" : "ltr" }}>
            <h5 className={`${styles.headerTitle} ${language === "fa" ? `${VazirFont.className} ${styles.headerTitleFarsi}` : ""}`}>{title}</h5>

            <Link href={`/${language}`} className={styles.headerLogo}>
                <i className={`fakharnia-logo-long ${styles.headerLogo}`}></i>
            </Link>
            <button className={`fakharnia-menu ${styles.headerMoreButton}`} onClick={() => { setSmartMenu(!smartMenu) }}></button>
            <div className={`${styles.smartMenu} ${smartMenu ? `${styles.smartMenuDisplayed} ${language === "fa" ? styles.smartMenuDisplayedFarsi : ""}` : ""}`}>
                <Widget language={props.language} />
                <div className={`${styles.smartNav} ${props.language === "fa" ? VazirFont.className : ""}`}>
                    {
                        dictionary?.menu?.map((menu: any, index: number) => getLink(index, menu))
                    }
                </div>
            </div>
        </div>
    )
}