import Link from "next/link";
import Image from "next/image";
import localFont from "@next/font/local";
import styles from "../page.module.css";

type propType = {
    language: string,
    dictionary: any
}

const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

export const Status = (props: propType) => {

    const { language, dictionary } = props;

    return (
        <>
            <Image src="/" alt="avatar" width={50} height={50} />
            <div>
                <p>Hi there</p>
                <strong>Online</strong>
            </div>
            <Link href="/" className={`${styles.contactButton} ${language === "fa" ? `${vazir.className} ${styles.contactButtonFarsi}` : ""}`} style={{ margin: language === "fa" ? "0 auto 0 0" : "0 0 0 auto" }}>{dictionary.landing.statusButton}</Link>
        </>
    )
}