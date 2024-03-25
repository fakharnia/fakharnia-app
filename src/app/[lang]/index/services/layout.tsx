import { getDictionary } from "@/dictionary";
import { Header } from "../components/header";
import rootStyles from "../page.module.css";

type propType = {
    children: React.ReactNode,
    params: { lang: any }
}

const Layout = async ({ children, params }: propType) => {

    const { lang } = params;
    
    const dictionary = await getDictionary(lang);

    return (
        <>
            <div className={rootStyles.container}>
                <Header language={lang} dictionary={dictionary} title={dictionary.service} />
                {children}
            </div>
        </>
    );
}

export default Layout;