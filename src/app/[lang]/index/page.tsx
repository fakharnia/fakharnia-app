import { getDictionary } from "@/dictionary";
import { Widget } from "../components/widget";
import { Logo } from "./components/logo";
import { Menu } from "./components/menu";
import { Post } from "./components/post";
import { SmartRibbon } from "./components/smartRibbon";
import { Contact } from "./components/contact";
import styles from "./page.module.css";
import { getBlogRecent, getStatus } from "@/app/lib/home.lib";
import { IPost } from "@/app/interfaces/post.interface";
import { getResume } from "@/app/lib/portfolio.lib";
import { GenerateClass, VazirFont } from "../utils";

type propType = {
    params: { lang: any }
}


const IndexPage = async (prop: propType) => {

    const { lang } = prop.params;
    const locale = await getDictionary(lang);

    const posts: IPost[] = await getBlogRecent();

    const status = await getStatus();

    const resume = await getResume();

    const getClasses = GenerateClass(lang, styles);

    return (
        <>
            <title>Fakharnia Dev | Home</title>
            <div className={`${styles.container}`} style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
                <div className={styles.menu}>
                    <div className={styles.options}>
                        <Logo />
                        <Widget language={lang} />
                    </div>
                    <Menu language={lang} menu={locale.menu} />
                    <p className={styles.copyRight}>© Fakharnia.com {new Date().getFullYear()}</p>
                </div>
                <SmartRibbon language={lang} dictionary={locale} />
                <div className={styles.root}>
                    <p className={`${lang === "fa" ? VazirFont.className : ""} ${getClasses("dailyText")}`}>
                        {status ? status[`${lang}_text`] : ""}
                    </p>
                    <div className={styles.contactBox}>
                        <Contact dictionary={locale} language={lang} data={resume?.contacts} />
                    </div>

                    <div className={styles.blogBox}>
                        <Post posts={posts} dictionary={locale} language={lang} />
                    </div>
                </div>
            </div >
        </>
    )
}

export default IndexPage;