"use client"
import Link from "next/link"
import styles from "../page.module.css";
import { GenerateClass, VazirFont } from "../utils";

type propsType = {
    language: string,
    menu: any[]
}
export const Menu = (props: propsType) => {

    const { language, menu } = props;

    const getClasses = GenerateClass(language, styles);

    const getLink = (index: number, menuItem: any) => {
        if (menuItem.isActive) {
            return <Link key={index} href={`/${language}/${menuItem.link}`} className={`${getClasses("navItem")} ${!menuItem.isActive ? styles.navItemDeactive : ""}`}>{menuItem.title}</Link>
        } else {
            return <p key={index} className={`${getClasses("navItem")} ${!menuItem.isActive ? styles.navItemDeactive : ""}`}>{menuItem.title}</p>;
        }
    }

    return (
        <div className={`${styles.nav} ${language === "fa" ? VazirFont.className + " " + styles.farsiText : ""}`}>

            {
                menu?.map((mn: any, index: number) => getLink(index, mn))
            }
        </div>
    )
}