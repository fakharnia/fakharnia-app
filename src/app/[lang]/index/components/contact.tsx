"use client"

import Link from "next/link";
import styles from "../page.module.css";
import localFont from "@next/font/local";

type propType = {
    language: string,
    contacts: any[],
    dictionary: any
}

const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

export const Contact = (props: propType) => {

    const { contacts, dictionary, language } = props;

    return (
        <>
            <h5 className={`${styles.boxTitle} ${language === "fa" ? `${vazir.className} ${styles.boxTitleFarsi}` : ""}`}>{dictionary.landing.contact}</h5>
            <div className={styles.contactList}>
                <Link href="/" className={`fakharnia-linkedin ${styles.contactIcon}`}></Link>
                <Link href="/" className={`fakharnia-github ${styles.contactIcon}`}></Link>
                <Link href="/" className={`fakharnia-mail ${styles.contactIcon}`}></Link>
                <Link href="/" className={`fakharnia-telegram ${styles.contactIcon}`}></Link>
                <Link href="/" className={`fakharnia-x ${styles.contactIcon}`}></Link>
                <Link href="/" className={`fakharnia-instagram ${styles.contactIcon}`}></Link>
                <Link href="/" className={`fakharnia-threads ${styles.contactIcon}`}></Link>
            </div>
        </>
    )
}