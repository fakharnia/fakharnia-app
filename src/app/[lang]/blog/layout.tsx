import { getDictionary } from "@/dictionary";
import { Header } from "../components/header";
import rootStyles from "../page.module.css";


const Layout = async ({ children, params }: layoutPropType) => {

    const { lang } = params;
    const dictionary = await getDictionary(lang);

    return (
        <>
            <div className={rootStyles.container}>
                <Header language={lang} dictionary={dictionary} title={dictionary.blog.title} />
                {children}
            </div>
        </>
    );
}

export default Layout;