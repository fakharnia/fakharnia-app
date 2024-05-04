"use client"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "../page.module.css";
import { IService } from "@/app/interfaces/service.interface";
import { GenerateClass } from "../../blog/utils";
import localFont from "next/font/local";

type propType = {
    language: string,
    services: IService[],
    activeService: IService
}

const vazir = localFont({ src: "../../../../fonts/vazir.woff2" });

export const Footer = (params: propType) => {

    const URL = process.env.NEXT_PUBLIC_SERVER_URI;

    const { services, language, activeService } = params;
    const [navState, setNavState] = useState<boolean | null>(null);

    const getClasses = GenerateClass(language, styles);

    const getTitle = (service: IService) => {
        switch (language) {
            case "fa": return service.fa_title;
            case "en": return service.en_title;
            case "de": return service.deu_title;
            default: return service.en_title;
        }
    }

    const onChangeActiveService = (service: IService) => {
        setNavState(!navState);
        // setService(service)
    }

    return (
        <>
            <div className={`${language === "fa" ? vazir.className : ""} ${styles.thumbnailList} ${navState ? styles.displayThumbnailList : (navState === false ? styles.hideThumbnailList : "")}`}>
                {
                    services.map((service: IService, index: number) => (
                        <Link
                            href={`/${language}/index/services/${service._id}`}
                            className={`${getClasses("thumbnailItem")} ${activeService._id === service._id ? styles.activeThumbnail : ""}`}
                            key={index}
                            onClick={() => { onChangeActiveService(service) }}>
                            <Image className={styles.thumbnailPhoto} src={`${URL}/service/${service.coverUrl}`} alt={service.coverAlt} width={300} height={100} />
                            <h5 className={getClasses("thumbnailTitle")}>{getTitle(service)}</h5>
                        </Link >
                    ))
                }
            </div>

            <div className={styles.footer}>
                <ul className={styles.navList}>
                    {
                        services.map((service: IService, index: number) => (
                            <Link
                                href={`/${language}/index/services/${service._id}`}
                                className={`${styles.navItem} ${activeService._id === service._id ? styles.activeItem : ""}`}
                                key={index} ></Link >
                        ))
                    }
                </ul>
                <button className={`${navState ? "fakharnia-arrow-down" : "fakharnia-arrow-up"} ${styles.thumbnailListButton}`} onClick={() => { setNavState(!navState) }}></button>
            </div >
        </>
    );
}