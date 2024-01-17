"use client"
import Link from "next/link"
import styles from "../page.module.css";
import localFont from "@next/font/local";

const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

type propsType = {
    language: string,
    menu: string[]
}
export const Menu = (props: propsType) => {

    const { language, menu } = props;

    return (
        <div className={`${styles.nav} ${language === "fa" ? vazir.className + " " + styles.farsiText : ""}`}>

            {
                menu.map((mn: string, index: number) => (
                    <Link key={index} href="/" className={`${styles.navItem} `}>{mn}</Link>
                ))
            }
        </div>
    )
}