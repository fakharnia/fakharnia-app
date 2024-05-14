import { Metadata, ResolvingMetadata } from "next";
import { WelcomePage } from "./components/welcome";
import { getDictionary } from "@/dictionary";

type paramType = {
  lang: any
}
type propType = {
  params: paramType,
  searchParams: any
}

export const generateMetadata = async (
  { params, searchParams }: ssrPropType,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const dic = await getDictionary(params.lang)
  const metatag = dic.metatag.welcome;

  return {
      title: metatag.title,
      description: metatag.description
  }
}

const Page = async ({ params: { lang } }: propType) => {

  const page = await getDictionary(lang);

  return (
    <>
      <title>Fakharnia Dev | Welcome</title>
      <WelcomePage locale={page} language={lang} />
    </>
  )
}

export default Page;
