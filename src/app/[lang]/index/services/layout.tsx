import { getDictionary } from "@/dictionary";
import { Header } from "../components/header";
import { Footer } from "./components/footer";
import { getServices } from "@/app/lib/service.lib";
import rootStyles from "../page.module.css";

type propType = {
    children: React.ReactNode,
    params: { lang: any }
}

const Layout = async ({ children, params }: propType) => {

    const { lang } = params;
    
    const dictionary = await getDictionary(lang);

    const services = await getServices() || [];

    return (
        <>
            <div className={rootStyles.container}>
                <Header language={lang} dictionary={dictionary} title={dictionary.service} />
                {children}
                <Footer language={lang} services={services} />
            </div>
        </>
    );
}

export default Layout;