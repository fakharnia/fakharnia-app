"use client"
import Link from "next/link"
import localFont from "@next/font/local";
import styles from "../page.module.css";

const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

type propsType = {
    language: string,
    menu: any[]
}
export const Menu = (props: propsType) => {

    const { language, menu } = props;

    return (
        <div className={`${styles.nav} ${language === "fa" ? vazir.className + " " + styles.farsiText : ""}`}>

            {
                menu.map((mn: any, index: number) => (
                    <Link key={index} href={`index/${mn.link}`} className={`${styles.navItem} `}>{mn.title}</Link>
                ))
            }
        </div>
    )
}