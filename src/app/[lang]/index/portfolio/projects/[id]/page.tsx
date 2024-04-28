import Image from "next/image";
import Link from "next/link";
import localFont from "@next/font/local";
import styles from "../page.module.css";
import { getDictionary } from "@/dictionary";
import { getProject, getProjects } from "@/app/lib/portfolio.lib";
import { Logo } from "../../components/logo";
import { IProject } from "@/app/interfaces/project.interface";

const vazir = localFont({ src: "../../../../../fonts/vazir.woff2" });

type propType = {
    params: { lang: string, id: string }, searchParams: {}
}

const Page = async (props: propType) => {

    const URL = process.env.SERVER_URI;
    const { lang, id } = props.params;
    const dic = await getDictionary(lang);
    const project = await getProject(id);
    const projects = await getProjects();

    const projectPagination = () => {
        const index = projects.findIndex((prj: IProject) => prj.key === id);
        if (index !== -1) {
            if (index === 0) {
                return projects.slice(0, 3);
            }

            if ((projects.length - 1) - index > 0) {
                return projects.slice(index - 1, (index - 1) + 3);
            }

            if (index === projects.length - 1) {
                return projects.slice(index - 2, index + 1);
            }
        }
        return projects.slice(0, 3);
    }

    const getLang = (part: string) => {

        if (part === "name") {
            switch (lang) {
                case "fa":
                    return project.fa_name;
                case "en":
                    return project.en_name;
                case "deu":
                    return project.deu_name;
                default:
                    return project.en_name;
            }
        }

        if (part === "description") {
            switch (lang) {
                case "fa":
                    return project.fa_description;
                case "en":
                    return project.en_description;
                case "deu":
                    return project.deu_description;
                default:
                    return project.en_description;
            }
        }

        if (part === "tech") {
            switch (lang) {
                case "fa":
                    return project.fa_techDescription;
                case "en":
                    return project.en_techDescription;
                case "deu":
                    return project.deu_techDescription;
                default:
                    return project.en_techDescription;
            }
        }


    }

    const isActive = (project: IProject) => id === project.key;

    return (
        <>
            <div className={`${lang === "fa" ? `${styles.farsiLang} ${vazir.className}` : ""}  ${styles.container}`} >
                <div className={styles.contents}>
                    <div className={styles.header}>
                        <Logo project={project} classes={`${styles.logo} ${styles.squareImageIn} ${lang === "fa" ? styles.squareImageInFa : ""}`} />
                        <div className={styles.innerContent}>
                            <p className={`${lang === "fa" ? styles.titleFa : ""}  ${styles.title}`}>{getLang("name")}</p>
                            <ul className={styles.techList}>
                                {
                                    project.technologies.map((tech: any, index: number) => (
                                        <li key={index} className={styles.techItem}>{tech.name}</li>
                                    ))
                                }
                            </ul>
                            <Link className={styles.link} href={project.url}>{dic.projects.button}</Link>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <h5 className={`${lang === "fa" ? styles.contentTitleFa : ""} ${styles.contentTitle}`}>{dic.projects.domain}</h5>
                        <p className={`${lang === "fa" ? styles.contentParagraphFa : ""} ${styles.contentParagraph}`}>{getLang("description")}</p>
                    </div>
                    <div className={styles.content}>
                        <h5 className={styles.contentTitle}>{dic.projects.tech}</h5>
                        <p className={`${lang === "fa" ? styles.contentParagraphFa : ""} ${styles.contentParagraph}`}>{getLang("tech")}</p>
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.footerNav}>
                        {
                            projectPagination().map((prj: IProject, index: number) => (
                                <Link key={index} className={`${styles.navItem} ${isActive(prj) ? styles.navItemActive : ""}`} href={`/${lang}/index/portfolio/projects/${prj.key}`} >
                                    <Logo project={prj} classes={styles.navImage} />
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Link href={`/${lang}/index/portfolio/projects`} className={`${lang === "fa" ? `fakharnia-arrow-right ${styles.backButtonFa}` : "fakharnia-arrow-left"} ${styles.backButton}`}></Link>
        </>
    )
}
export default Page;