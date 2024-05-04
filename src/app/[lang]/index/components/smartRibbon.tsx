"use client"
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Logo } from "./logo";
import { Widget } from "../../components/widget";
import styles from "../page.module.css";
import { GenerateClass, VazirFont } from "../../utils";

type propType = {
    language: string,
    dictionary: any
}

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
                <h5 className={`${getClasses("homeTitle")} ${props.language === "fa" ? VazirFont.className : ""}`}>{dictionary.landing.home}</h5>
                <button className={`fakharnia-more ${styles.moreButton}`} onClick={() => { setSmartMenu(!smartMenu) }}></button>
                <div className={`${styles.smartMenu} ${smartMenu ? `${styles.smartMenuDisplayed} ${language === "fa" ? styles.smartMenuDisplayedFarsi : ""}` : ""}`}>
                    <Widget language={props.language} />
                    <div className={`${styles.smartNav} ${props.language === "fa" ? VazirFont.className : ""}`}>
                        {
                            dictionary?.menu?.map((mn: any, index: number) => getLink(index, mn))
                        }
                    </div>
                </div>
            </div>
        </>);
}