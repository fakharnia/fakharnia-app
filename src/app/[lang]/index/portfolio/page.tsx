import Link from "next/link";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "./page.module.css"
import { getDictionary } from "@/dictionary";
import { getDesigns, getProjects, getResume } from "@/app/lib/portfolio.lib";
import { Logo } from "./components/logo";
import { IDesign } from "@/app/interfaces/design.interface";
import { IProject } from "@/app/interfaces/project.interface";
import { IResume } from "@/app/interfaces/resume.interface";

type propType = {
    params: { lang: any }
}

type portfolioDicType = {
    title: string,
    projectTitle: string,
    designTitle: string,
    moreButton: string,
    downloadText: string
}

const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

const Portfolio = async ({ params: { lang } }: propType) => {

    const URL = process.env.SERVER_URI;
    const dic = await getDictionary(lang);
    const portfolio: portfolioDicType = dic["portfolio"];
    const projects: IProject[] = (await getProjects() as Array<any>)?.slice(0, 5) || [];
    const designs: IDesign[] = (await getDesigns() as Array<any>)?.slice(0, 2) || [];
    const resume: IResume = await getResume();

    return (
        <>
            <title>Fakharnia Dev | Portfolio</title>
            <div className={styles.container}>
                <div className={`${lang === "fa" ? `${styles.farsiLang} ${vazir.className}` : ""} ${styles.box}`}>
                    <h5 className={`${styles.boxTitle} ${lang === "fa" ? styles.boxTitleFa : ""}`}>{portfolio.projectTitle}</h5>
                    <div className={styles.squareList}>
                        {
                            projects.map((project: IProject, index: number) => (
                                <Link href={`/${lang}/index/portfolio/projects/${project.key}`} key={index} className={styles.squareItem}>
                                    <Logo project={project} classes={styles.squareImage} />
                                </Link>))
                        }
                    </div>
                    <Link href={`/${lang}/index/portfolio/projects`} className={`${styles.moreButton} ${lang === "fa" ? styles.moreButtonFa : ""}`}>{portfolio.moreButton}</Link>
                </div>
                <div className={`${lang === "fa" ? `${styles.farsiLang} ${vazir.className}` : ""} ${styles.box}`}>
                    <h5 className={`${styles.boxTitle} ${lang === "fa" ? styles.boxTitleFa : ""}`}>{portfolio.designTitle}</h5>
                    <div className={styles.rectangleList}>
                        {
                            designs.map((design: IDesign, index: number) => (
                                <Link href={`/${lang}/index/portfolio/designs/${design.key}`} key={index} className={styles.rectangleItem}>
                                    <Image className={styles.rectangleImage} src={`${URL}/design/${design.coverUrl}`} alt={design.coverAlt} width={300} height={150}></Image>
                                </Link>))
                        }

                    </div>
                    <Link href={`/${lang}/index/portfolio/designs`} className={`${styles.moreButton} ${lang === "fa" ? styles.moreButtonFa : ""}`}>{portfolio.moreButton}</Link>
                </div>
                <div className={`${lang === "fa" ? `${styles.farsiLang} ${vazir.className}` : ""} ${styles.downloadBox}`}>
                    <p className={`${styles.downloadText} ${lang === "fa" ? styles.downloadTextFa : ""}`}>{portfolio.downloadText}</p>
                    <div className={styles.dowloadButons}>
                        <Link href={`/${lang}/index/portfolio/resume`} className={`fakharnia-more ${styles.downloadButton} ${lang === "fa" ? styles.farsiIconButton : ""}`}></Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Portfolio;
