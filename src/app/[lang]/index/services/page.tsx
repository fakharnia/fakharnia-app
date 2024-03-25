import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import { getServices } from "@/app/lib/service.lib";
import styles from "./page.module.css";
import { GenerateClass } from "../blog/utils";
import localFont from "@next/font/local";
import { IService } from "@/app/interfaces/service.interface";
import Link from "next/link";

type propType = {
    params: { lang: any }
}

const vazir = localFont({ src: "../../../fonts/vazir.woff2" });


const Services = async (prop: propType) => {

    const URL = process.env.NEXT_PUBLIC_SERVER_URI;

    const { lang } = prop.params;

    const getClasses = GenerateClass(lang, styles);

    const services: any[] = await getServices() || [];

    const getContent = () => {
        switch (lang) {
            case "fa": return services[0]?.fa_fileUrl;
            case "en": return services[0]?.en_fileUrl;
            case "deu": return services[0]?.deu_fileUrl;
            default: return "";
        }
    }

    const getTitle = (service: IService) => {
        switch (lang) {
            case "fa": return service?.fa_title;
            case "en": return service?.en_title;
            case "deu": return service?.deu_title;
        }
    }

    return (
        <div className={`${getClasses("box")} ${lang === "fa" ? vazir.className : ""}`}>
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
    )
}

export default Services;

