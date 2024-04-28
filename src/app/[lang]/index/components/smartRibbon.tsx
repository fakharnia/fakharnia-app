"use client"
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import localFont from "@next/font/local";
import { Logo } from "./logo";
import { Widget } from "../../components/widget";
import styles from "../page.module.css";
import { GenerateClass } from "../../utils";

type propType = {
    language: string,
    dictionary: any
}
const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

export const SmartRibbon = (props: propType) => {

    const { language, dictionary } = props;
    const [smartMenu, setSmartMenu] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);;
    const getClasses = GenerateClass(language, styles);

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSmartMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return
    }, []);

    const getLink = (index: number, menuItem: any) => {
        if (menuItem.isActive) {
            return <Link key={index} href={`/${language}/index/${menuItem.link}`} className={`${getClasses("navLink")} ${!menuItem.isActive ? styles.navItemDeactive : ""}`}>{menuItem.title}</Link>
        } else {
            return <p key={index} className={`${getClasses("navLink")} ${!menuItem.isActive ? styles.navItemDeactive : ""}`}>{menuItem.title}</p>;
        }
    }

    return (
        <>
            <div className={styles.smartRibbon} ref={wrapperRef}>
                <Logo />
                <button className={`fakharnia-more ${styles.moreButton}`} onClick={() => { setSmartMenu(!smartMenu) }}></button>
                <div className={`${styles.smartMenu} ${smartMenu ? `${styles.smartMenuDisplayed} ${language === "fa" ? styles.smartMenuDisplayedFarsi : ""}` : ""}`}>
                    <Widget language={props.language} />
                    <div className={`${styles.smartNav} ${props.language === "fa" ? vazir.className : ""}`}>
                        {
                            dictionary.menu.map((mn: any, index: number) => getLink(index, mn))
                        }
                    </div>
                </div>
            </div>
        </>);
}