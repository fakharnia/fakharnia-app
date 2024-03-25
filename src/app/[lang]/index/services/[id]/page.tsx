import Image from "next/image";
import styles from "../page.module.css";
import ReactMarkdown from 'react-markdown';
import { getService, getServices } from "@/app/lib/service.lib";
import { Footer } from "../components/footer";
import { GenerateClass } from "../../blog/utils";
import localFont from "@next/font/local";

type propsType = {
    params: { lang: string, id: string }
}

const URL = process.env.NEXT_PUBLIC_SERVER_URI;
const vazir = localFont({ src: "../../../../fonts/vazir.woff2" });

export const ServiceComponent = async (props: propsType) => {

    const { id, lang } = props.params;
    const service = await getService(id);
    const services: any[] = await getServices() || [];

    const getClasses = GenerateClass(lang, styles);

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
        <>
            <div className={`${getClasses("innerBox")} ${lang === "fa" ? vazir.className : ""}`}>
                <Image className={styles.image} src={`${URL}/service/${service?.coverUrl}`} alt={service?.coverAlt} width={800} height={420} />
                <h5 className={getClasses("innerServiceTitle")}>{getTitle() || undefined}</h5>
                <ReactMarkdown className={getClasses("markdown")}>{getContent() || undefined}</ReactMarkdown>
            </div>
            <Footer language={lang} services={services} activeService={service} />
        </>
    )
}

export default ServiceComponent;
