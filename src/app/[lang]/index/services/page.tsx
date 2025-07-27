import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import { getServices } from "@/lib/service.lib";
import styles from "./page.module.css";
import { IService } from "@/app/interfaces/service.interface";
import Link from "next/link";
import { GenerateClass, VazirFont } from "../../utils";
import { getDictionary } from "@/dictionary";

type propType = {
    params: { lang: any }
}

export const generateMetadata = async (
    { params, searchParams }: ssrPropType,
    parent: ResolvingMetadata
): Promise<Metadata> => {
    const dic = await getDictionary(params.lang)
    const metatag = dic.metatag.services;

    return {
        title: metatag.title,
        description: metatag.description
    }
}

const Services = async (prop: propType) => {

    const URL = process.env.NEXT_PUBLIC_SERVER_URI;

    const { lang } = prop.params;

    const getClasses = GenerateClass(lang, styles);

    const services: any[] = await getServices() || [];


    const getTitle = (service: IService) => {
        switch (lang) {
            case "fa": return service?.fa_title;
            case "en": return service?.en_title;
            case "deu": return service?.deu_title;
        }
    }

    return (
        <>
            <title>Fakharnia Dev | Services</title>
            <div className={`${getClasses("box")} ${lang === "fa" ? VazirFont.className : ""}`}>
                {
                    services.map((service: IService, index: number) => (
                        <Link
                            href={`/${lang}/index/services/${service._id}`}
                            className={styles.serviceLink}
                            key={index} >
                            <Image className={styles.serviceImage} src={`${URL}/service/${service.coverUrl}`} alt={service.coverAlt} width={800} height={420} />
                            <h5 className={getClasses("serviceTitle")}>{getTitle(service)}</h5>
                        </Link >
                    ))
                }
            </div>
        </>
    )
}

export default Services;

