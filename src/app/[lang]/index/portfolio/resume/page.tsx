import Image from "next/image";
import Link from "next/link";
import localFont from "@next/font/local";
import styles from "./page.module.css";
import { getDictionary } from "@/dictionary";
import { getResume } from "@/app/lib/portfolio.lib";
import { IResume, ISkill } from "@/app/interfaces/resume.interface";

type propType = {
    params: { lang: any }
}

const vazir = localFont({ src: "../../../../fonts/vazir.woff2" });

const Resume = async ({ params: { lang } }: propType) => {

    const resume: IResume = await getResume();
    const URL = process.env.SERVER_URI;
    const dic = await getDictionary(lang);

    const getAboutMe = () => {
        switch (lang) {
            case "fa": return resume.fa_aboutMe;
            case "en": return resume.en_aboutMe;
            case "deu": return resume.deu_aboutMe;
            default: return resume.en_aboutMe;
        }
    }

    const getText = () => {
        switch (lang) {
            case "fa": return resume.fa_text;
            case "en": return resume.en_text;
            case "deu": return resume.deu_text;
            default: return resume.en_text;
        }
    }

    const getSkillDescription = (skill: ISkill) => {
        switch (lang) {
            case "fa": return skill.fa_description;
            case "en": return skill.en_description;
            case "deu": return skill.deu_description;
            default: return skill.en_description;
        }
    }

    return (
        <>
            <div className={`${lang === "fa" ? `${styles.farsiLang} ${vazir.className}` : ""} ${styles.container}`}>
                <div className={styles.flexBox}>
                    <Image className={styles.avatar} src={`${URL}/resume/${resume.avatarUrl}`} width={100} height={100} alt="avatar" />
                    <div className={styles.content}>
                        <h5 className={`${styles.headTitle}  ${lang === "fa" ? styles.headTitleFa : ""}`}>{dic["resume"]}</h5>
                        <p className={`${styles.headParagraph} ${lang === "fa" ? styles.headParagraphFa : ""}`}>{getAboutMe()}</p>
                    </div>
                </div>
                <p className={`${styles.paragraph} ${lang === "fa" ? styles.paragraphFa : ""}`}>{getText()}</p>
                <div className={styles.skillBox}>
                    {
                        resume.skills.map((skill: ISkill, index: number) => (
                            <div key={index} className={styles.skillItem}>
                                <ul className={styles.skillRateBox}>
                                    <li className={`${styles.skillRateItem} ${skill.rate === 5 ? styles.skillRateItemActive : ""}`}></li>
                                    <li className={`${styles.skillRateItem} ${skill.rate === 4 ? styles.skillRateItemActive : ""}`}></li>
                                    <li className={`${styles.skillRateItem} ${skill.rate === 3 ? styles.skillRateItemActive : ""}`}></li>
                                    <li className={`${styles.skillRateItem} ${skill.rate === 2 ? styles.skillRateItemActive : ""}`}></li>
                                    <li className={`${styles.skillRateItem} ${skill.rate === 1 ? styles.skillRateItemActive : ""}`}></li>
                                </ul>
                                <Image className={styles.skillIcon} src={`${URL}/resume/${skill.fileUrl}`} alt={skill.fileAlt} width={100} height={100} />
                                <p className={`${styles.skillDescription} ${lang === "fa" ? styles.skillDescriptionFa : ""}`}>{getSkillDescription(skill)}</p>
                            </div>
                        ))
                    }
                </div>
                <Link href={`/${lang}/index/portfolio`} className={`${lang === "fa" ? "fakharnia-arrow-right" : "fakharnia-arrow-left"} ${styles.backButton}`}></Link>
            </div>
        </>
    )
}

export default Resume;