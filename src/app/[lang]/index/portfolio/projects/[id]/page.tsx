import Link from "next/link";
import styles from "../page.module.css";
import { getDictionary } from "@/dictionary";
import { getProject, getProjects } from "@/lib/portfolio.lib";
import { Logo } from "../../components/logo";
import { IProject } from "@/app/interfaces/project.interface";
import { GenerateClass, GenosFont, VazirFont } from "@/app/[lang]/utils";

type propType = {
    params: { lang: string, id: string }, searchParams: {}
}

const Page = async (props: propType) => {

    const URL = process.env.SERVER_URI;
    const { lang, id } = props.params;
    const dic = await getDictionary(lang);
    const project = await getProject(id);
    const projects = await getProjects();

    const generateClass = GenerateClass(lang, styles);

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
                if ((index - 2) >= 0) {
                    return projects.slice(index - 2, index + 1);
                } else {
                    return projects.slice(0, index + 1);
                }
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
            <title>Fakharnia Dev | Project</title>
            <div className={`${lang === "fa" ? `${VazirFont.className}` : ""}  ${generateClass("container")}`} >
                <div className={styles.contents}>
                    <div className={styles.header}>
                        <Logo project={project} classes={`${styles.logo} ${generateClass("squareImageIn")}`} />
                        <div className={styles.innerContent}>
                            <p className={generateClass("title")}>{getLang("name")}</p>
                            <ul className={styles.techList}>
                                {
                                    project.technologies.map((tech: any, index: number) => (
                                        <li key={index} className={`${generateClass("techItem")} ${GenosFont.className}`}>{tech.name}</li>
                                    ))
                                }
                            </ul>
                            {project.url ? <Link className={styles.link} href={project.url} target="_blank">{dic.projects.button}</Link> :
                                <span className={`${styles.link} ${styles.linkOff}`} >{dic.projects.button}</span>}
                        </div>
                    </div>
                    <div className={styles.content}>
                        <h5 className={generateClass("contentTitle")}>{dic.projects.domain}</h5>
                        <p className={generateClass("contentParagraph")}>{getLang("description")}</p>
                    </div>
                    <div className={styles.content}>
                        <h5 className={generateClass("contentTitle")}>{dic.projects.tech}</h5>
                        <p className={generateClass("contentParagraph")}>{getLang("tech")}</p>
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