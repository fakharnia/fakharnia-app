import { WelcomePage } from "./components/welcome";
import { getDictionary } from "@/dictionary";

const Page = async ({ params: { lang } }: { params: { lang: any } }) => {

  const page = await getDictionary(lang)
  return (
    <>
      <WelcomePage locale={page} language={lang} />
    </>
  )
}

export default Page;
