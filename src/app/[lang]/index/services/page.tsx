import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import { getServices } from "@/app/lib/service.lib";
import styles from "./page.module.css";

type propType = {
    params: { lang: any }
}

const Services = async (prop: propType) => {

    const URL = process.env.NEXT_PUBLIC_SERVER_URI;

    const { lang } = prop.params;

    let services: any[] = await getServices() || [];

    const getContent = () => {
        switch (lang) {
            case "fa": return services[0]?.fa_fileUrl;
            case "en": return services[0]?.en_fileUrl;
            case "de": return services[0]?.deu_fileUrl;
            default: return "";
        }
    }

    const getTitle = () => {
        switch (lang) {
            case "fa": return services[0]?.fa_title;
            case "en": return services[0]?.en_title;
            case "de": return services[0]?.deu_title;
        }
    }

    return (
        <div className={styles.box}>
            <Image className={styles.image} src={`${URL}/service/${services[0]?.coverUrl}`} alt={services[0]?.coverAlt} width={200} height={200} />
            <h5 className={styles.serviceTitle}>{getTitle() || undefined}</h5>
            <ReactMarkdown className={styles.markdown}>{getContent() || undefined}</ReactMarkdown>
        </div>
    )
}

export default Services;

