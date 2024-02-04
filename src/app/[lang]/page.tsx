import { WelcomePage } from "./components/welcome";
import { getDictionary } from "@/dictionary";

type paramType = {
  lang: any
}
type propType = {
  params: paramType,
  searchParams: any
}

const Page = async ({ params: { lang } }: propType) => {
  
  const page = await getDictionary(lang);

  return (
    <>
      <WelcomePage locale={page} language={lang} />
    </>
  )
}

export default Page;
