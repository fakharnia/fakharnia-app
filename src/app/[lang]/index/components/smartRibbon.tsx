"use client"
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import localFont from "@next/font/local";
import { Logo } from "./logo";
import { Widget } from "../../components/widget";
import styles from "../page.module.css";

type propType = {
    language: string,
    dictionary: any
}
const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

export const SmartRibbon = (props: propType) => {

    const { language, dictionary } = props;
    const [smartMenu, setSmartMenu] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);;

    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSmartMenu(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return
    }, []);

    return (
        <>
            <div className={styles.smartRibbon} ref={wrapperRef}>
                <Logo />
                <h5>Fakharnia</h5>
                <button className={`fakharnia-more ${styles.moreButton}`} onClick={() => { setSmartMenu(!smartMenu) }}></button>
                <div className={`${styles.smartMenu} ${smartMenu ? `${styles.smartMenuDisplayed} ${language === "fa" ? styles.smartMenuDisplayedFarsi : ""}` : ""}`}>
                    <Widget language={props.language} />
                    <div className={`${styles.smartNav} ${props.language === "fa" ? vazir.className : ""}`}>
                        {
                            dictionary.menu.map((menu: any, index: number) => (
                                <Link key={index} href={`index/${menu.link}`} className={`${styles.navLink} ${props.language === "fa" ? styles.farsiLink : ""}`}>{menu.title}</Link>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>);
}