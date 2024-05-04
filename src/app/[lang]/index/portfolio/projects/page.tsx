import Link from "next/link";
import styles from "../page.module.css"
import { getDictionary } from "@/dictionary";
import { getProjects } from "@/app/lib/portfolio.lib";
import { Logo } from "../components/logo";
import { IProject } from "@/app/interfaces/project.interface";
import { VazirFont } from "@/app/[lang]/utils";

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

const Projects = async ({ params: { lang } }: propType) => {

    const projects: IProject[] = await getProjects() || [];
    const dic = await getDictionary(lang);
    const portfolio: portfolioDicType = dic["portfolio"];

    const getName = (project: IProject) => {
        switch (lang) {
            case "fa": return project.fa_name;
            case "en": return project.en_name;
            case "deu": return project.deu_name;
            default: return project.en_name;
        }
    }

    return (
        <>
            <title>Fakharnia Dev | Projects</title>
            <div className={`${lang === "fa" ? `${styles.farsiLang} ${VazirFont.className}` : ""} ${styles.boxIn}`}>
                <h5 className={styles.boxTitle}>{portfolio.project}</h5>
                <div className={`${styles.squareList}  ${styles.squareListIn}`}>
                    {
                        projects.map((project: IProject, index: number) => (
                            <Link href={`/${lang}/index/portfolio/projects/${project.key}`} key={index} className={`${styles.squareItem} ${styles.squareItemIn}`}>
                                <Logo project={project} classes={`${styles.squareImage} ${styles.squareImageIn} ${lang === "fa" ? styles.squareImageInFa : ""}`} />
                                <h5 className={`${styles.squareItemInTitle} ${lang === "fa" ? styles.squareItemInTitleFa : ""}`}>{getName(project)}</h5>
                            </Link>))
                    }
                </div>
                <Link href={`/${lang}/index/portfolio`} className={`${lang === "fa" ? `fakharnia-arrow-right ${styles.backButtonFa}` : "fakharnia-arrow-left"} ${styles.backButton}`}></Link>
            </div>
        </>
    )
}

export default Projects;