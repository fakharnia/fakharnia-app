"use client"
import Link from "next/link";
import styles from "../page.module.css";
import { IContact } from "@/app/interfaces/resume.interface";
import { VazirFont } from "../../utils";

type propType = {
    language: string,
    data: IContact[],
    dictionary: any
}

export const Contact = (props: propType) => {

    const { data, dictionary, language } = props;

    return (
        <>
            <h5 className={`${styles.boxTitle} ${language === "fa" ? `${VazirFont.className} ${styles.boxTitleFarsi}` : ""}`}>{dictionary.landing.contact}</h5>
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