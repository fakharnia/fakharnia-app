import Image from "next/image";
import styles from "../page.module.css";
import ReactMarkdown from 'react-markdown';
import { getService, getServices } from "@/lib/service.lib";
import { Footer } from "../components/footer";
import { GenerateClass } from "../../blog/utils";
import { IService } from "@/app/interfaces/service.interface";
import Link from "next/link";
import { VazirFont } from "@/app/[lang]/utils";

type propsType = {
    params: { lang: string, id: string }
}

const URL = process.env.NEXT_PUBLIC_SERVER_URI;

const ServiceComponent = async (props: propsType) => {

    const { id, lang } = props.params;
    const service = await getService(id);
    const services: IService[] = await getServices() || [];

    const getClasses = GenerateClass(lang, styles);

    const getContent = (): string => {
        switch (lang) {
            case "fa": return service.fa_fileUrl;
            case "en": return service.en_fileUrl;
            case "deu": return service.deu_fileUrl;
            default: return "";
        }
    }

    return (
        <>
            <div className={`${getClasses("innerBox")} ${lang === "fa" ? VazirFont.className : ""}`}>
                <Image className={styles.image} src={`${URL}/service/${service?.coverUrl}`} alt={service?.coverAlt} width={800} height={420} />
                <ReactMarkdown className={getClasses("markdown")}>{getContent() || undefined}</ReactMarkdown>
                <Link href={`/${lang}/index/services`} className={`${lang === "fa" ? `fakharnia-arrow-right ${styles.backButtonFa}` : "fakharnia-arrow-left"} ${styles.backButton}`}></Link>
            </div>
            <Footer language={lang} services={services} activeService={service} />
        </>
    )
}

export default ServiceComponent;
