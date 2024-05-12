import Link from "next/link";
import styles from "../page.module.css";
import { SlideShow } from "./slideshow";
import { getDesign, getDesigns } from "@/lib/portfolio.lib";
import { IDesign } from "@/app/interfaces/design.interface";
import { GenerateClass, VazirFont } from "@/app/[lang]/utils";

type propType = {
    params: { lang: string, id: string }, searchParams: {}
}

const DesignDetail = async (props: propType) => {

    const { lang, id } = props.params;
    const design: IDesign = await getDesign(id);
    const designs: IDesign[] = await getDesigns();

    const generateClass = GenerateClass(lang, styles);

    const getTitle = () => {
        switch (lang) {
            case "fa": return design?.fa_title;
            case "en": return design?.en_title;
            case "deu": return design?.deu_title;
            default: return design?.en_title;
        }
    }

    const getDescription = () => {
        switch (lang) {
            case "fa": return design?.fa_description;
            case "en": return design?.en_description;
            case "deu": return design?.deu_description;
            default: return design?.en_description;
        }
    }

    const designPagination = () => {
        const index = designs.findIndex((dsg: IDesign) => dsg.key === id);
        if (index !== -1) {
            if (index === 0) {
                return designs.slice(0, 3);
            }

            if ((designs.length - 1) - index > 0) {
                return designs.slice(index - 1, (index - 1) + 3);
            }

            if (index === designs.length - 1) {
                if ((index - 2) >= 0) {
                    return designs.slice(index - 2, index + 1);
                } else {
                    return designs.slice(0, index + 1);
                }
            }
        }
        return designs.slice(0, 3);
    }

    const isActive = (design: IDesign) => id === design.key;

    return (
        <>
            <title>Fakharnia Dev | Design</title>
            <div className={`${lang === "fa" ? `${VazirFont.className}` : ""}  ${styles.container}`}>
                <div className={styles.content}>
                    <SlideShow lang={lang} design={design} />
                    <h5 className={generateClass("title")}>{getTitle()}</h5>
                    <p className={generateClass("paragraph")}>{getDescription()}</p>
                </div>
                <div className={styles.footer}>
                    <div className={styles.nvaList}>
                        {
                            designPagination().map((dsg: IDesign, index: number) => (
                                <Link
                                    key={index}
                                    href={`/${lang}/index/portfolio/designs/${dsg.key}`}
                                    className={`${styles.navItem} ${isActive(dsg) ? styles.navItemActive : ""}`}></Link>
                            ))
                        }
                    </div>
                </div>
                <Link href={`/${lang}/index/portfolio/designs`} className={`${lang === "fa" ? `fakharnia-arrow-right` : "fakharnia-arrow-left"} ${generateClass("backButton")}`}></Link>
            </div >
        </>
    )

}
export default DesignDetail;