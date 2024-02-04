import Image from "next/image";
import styles from "../page.module.css";
import ReactMarkdown from 'react-markdown';
import { getService } from "@/app/lib/service.lib";

type propsType = {
    params: { lang: string, id: string }
}
const URL = process.env.NEXT_PUBLIC_SERVER_URI;

export const ServiceComponent = async (props: propsType) => {

    const { id, lang } = props.params;
    const service = await getService(id);

    const getContent = (): string => {
        switch (lang) {
            case "fa": return service.fa_fileUrl;
            case "en": return service.en_fileUrl;
            case "deu": return service.deu_fileUrl;
            default: return "";
        }
    }

    const getTitle = (): string => {
        switch (lang) {
            case "fa": return service.fa_title;
            case "en": return service.en_title;
            case "deu": return service.deu_title;
            default: return service.en_title;
        }
    }

    return (
        <div className={styles.box}>
            <Image className={styles.image} src={`${URL}/service/${service?.coverUrl}`} alt={service?.coverAlt} width={200} height={200} />
            <h5 className={styles.serviceTitle}>{getTitle() || undefined}</h5>
            <ReactMarkdown className={styles.markdown}>{getContent() || undefined}</ReactMarkdown>
        </div>
    )
}

export default ServiceComponent;
