"use client"
import Link from "next/link";
import localFont from "next/font/local";
import styles from "../page.module.css";
import { IContact } from "@/app/interfaces/resume.interface";

type propType = {
    language: string,
    data: IContact[],
    dictionary: any
}

const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

export const Contact = (props: propType) => {

    const { data, dictionary, language } = props;

    return (
        <>
            <h5 className={`${styles.boxTitle} ${language === "fa" ? `${vazir.className} ${styles.boxTitleFarsi}` : ""}`}>{dictionary.landing.contact}</h5>
            <div className={styles.contactList}>
                {
                    data?.sort((a, b) => a.priority - b.priority)?.map((contact: IContact, index: number) => (
                        <Link key={index} href={contact.link} className={`${contact.iconClass} ${styles.contactIcon}`} target="_blank"></Link>
                    )
                    )
                }
            </div>
        </>
    )
}