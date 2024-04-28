"use client"
import Link from "next/link"
import localFont from "@next/font/local";
import styles from "../page.module.css";
import { GenerateClass } from "../../utils";

const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

type propsType = {
    language: string,
    menu: any[]
}
export const Menu = (props: propsType) => {

    const { language, menu } = props;

    const getClasses = GenerateClass(language, styles);

    const getLink = (index: number, menuItem: any) => {
        if (menuItem.isActive) {
            return <Link key={index} href={`/${language}/index/${menuItem.link}`} className={`${getClasses("navItem")} ${!menuItem.isActive ? styles.navItemDeactive : ""}`}>{menuItem.title}</Link>
        } else {
            return <p key={index} className={`${getClasses("navItem")} ${!menuItem.isActive ? styles.navItemDeactive : ""}`}>{menuItem.title}</p>;
        }
    }

    return (
        <div className={`${styles.nav} ${language === "fa" ? vazir.className + " " + styles.farsiText : ""}`}>

            {
                menu.map((mn: any, index: number) => getLink(index, mn))
            }
        </div>
    )
}