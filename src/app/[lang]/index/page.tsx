import { getDictionary } from "@/dictionary";
import { Widget } from "../components/widget";
import { Logo } from "./components/logo";
import { Menu } from "./components/menu";
import { Post } from "./components/post";
import { SmartRibbon } from "./components/smartRibbon";
import { Contact } from "./components/contact";
import { Status } from "./components/status";
import styles from "./page.module.css";

type propType = {
    params: { lang: any }
}

const IndexPage = async (prop: propType) => {

    const { lang } = prop.params;
    const locale = await getDictionary(lang);

    const posts: any[] = [];

    return (
        <div className={styles.container} style={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
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
                <p className={styles.dailyText}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque ex illum tempora, nisi sit ipsum necessitatibus. Ex voluptatem veritatis necessitatibus, earum sapiente
                </p>
                <div className={styles.statusBox}>
                    <Status language={lang} dictionary={locale} />
                </div>
                <div className={styles.contactBox}>
                    <Contact dictionary={locale} contacts={[]} language={lang} />
                </div>

                <div className={styles.blogBox}>
                    <Post posts={posts} dictionary={locale} language={lang} />
                </div>
            </div>
        </div>
    )
}

export default IndexPage;