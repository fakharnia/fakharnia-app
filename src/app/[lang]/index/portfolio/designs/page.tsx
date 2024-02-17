import Link from "next/link";
import Image from "next/image";
import localFont from "@next/font/local";
import styles from "../page.module.css"
import { getDictionary } from "@/dictionary";
import { getDesigns } from "@/app/lib/portfolio.lib";
import { IDesign } from "@/app/interfaces/design.interface";

type propType = {
    params: { lang: any }
}

type portfolioDicType = {
    title: string,
    projectTitle: string,
    designTitle: string,
    moreButton: string,
    downloadText: string,
    project: string,
    design: string
}

const vazir = localFont({ src: "../../../../fonts/vazir.woff2" });


const Designs = async ({ params: { lang } }: propType) => {

    const designs: IDesign[] = (await getDesigns() as Array<any>) || [];
    const URL = process.env.SERVER_URI;
    const dic = await getDictionary(lang);
    const portfolio: portfolioDicType = dic["portfolio"];

    const getTitle = (design: IDesign) => {
        switch (lang) {
            case "fa": return design.fa_title;
            case "en": return design.en_title;
            case "deu": return design.deu_title;
            default: return design.en_title;
        }
    }

    return (
        <>
            <div className={`${lang === "fa" ? `${styles.farsiLang} ${vazir.className}` : ""} ${styles.boxIn}`}>
                <h5 className={styles.boxTitle}>{portfolio.design}</h5>
                <div className={`${styles.rectangleList} ${styles.rectangleListIn}`}>
                    {
                        designs.map((design: IDesign, index: number) => (
                            <Link href={`/${lang}/index/portfolio/designs/${design.key}`} key={index} className={`${styles.rectangleItem} ${styles.rectangleItemIn}`}>
                                <Image className={`${styles.rectangleImage} ${styles.rectangleImageIn} ${lang === "fa" ? styles.rectangleImageInFa : ""}`} src={`${URL}/design/${design.coverUrl}`} alt={design.coverAlt} width={300} height={150}></Image>
                                <h5 className={`${styles.rectangleItemInTitle} ${lang === "fa" ? styles.rectangleItemInTitleFa : ""}`}>{getTitle(design)}</h5>
                            </Link>))
                    }
                </div>
                <Link href={`/${lang}/index/portfolio`} className={`${lang === "fa" ? "fakharnia-arrow-right" : "fakharnia-arrow-left"} ${styles.backButton}`}></Link>
            </div>
        </>
    )
}

export default Designs;