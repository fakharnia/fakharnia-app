import Link from "next/link";
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import styles from "./page.module.css";
import { getPost, getPostContent, postView } from "@/app/lib/blog.lib";
import { getDictionary } from "@/dictionary";
import { IBlogDictionary } from "@/app/interfaces/dictionary.interface";
import { IPost } from "@/app/interfaces/post.interface";
import { GenerateClass, RelativeFormatDate } from "../utils";
import { env } from "process";
import localFont from "@next/font/local";

const vazir = localFont({ src: "../../../../fonts/vazir.woff2" });

const Post = async ({ params: { lang, id }, searchParams: searchParams }: ssrPropType) => {

    const URL = env.SERVER_URI;

    const dic = await getDictionary(lang);
    const blog: IBlogDictionary = dic["blog"];
    await postView(id);

    const getCurrentLink = (): string => {
        let filters = [
            `page=${searchParams.page}`,
            `perPage=${searchParams.perPage}`,
        ];
        if (searchParams?.tags?.length > 0) {
            filters.push(`tags=${searchParams.tags}`);
        }
        if (searchParams?.search) {
            filters.push(`search=${searchParams.search}`)
        }
        if (searchParams?.sort) {
            filters.push(`sort=${searchParams.sort}`)
        }
        if (searchParams?.sortFlow !== "desc" && searchParams?.sortFlow) {
            filters.push(`sortFlow=${searchParams.sortFlow}`);
        }
        return filters.join("&");
    }

    const post = await getPost(id);

    const getContent = await getPostContent(id, post[`${lang}_fileUrl`]);

    const getClasses = GenerateClass(lang, styles);

    const getDate = (post: IPost) => {
        switch (lang) {
            case "fa": return RelativeFormatDate(post.createdAt, lang);
            case "en": return RelativeFormatDate(post.createdAt, lang);
            case "deu": return RelativeFormatDate(post.createdAt, lang);
            default: return RelativeFormatDate(post.createdAt, lang);
        }
    }

    const getTitle = () => {
        switch (lang) {
            case "fa": return post.fa_title;
            case "en": return post.en_title;
            case "deu": return post.deu_title;
            default: return post.en_title;
        }
    }

    return (
        <>
            <div className={`${getClasses("container")} ${lang === "fa" ? vazir.className : ""}`}>
                <Image className={styles.cover} src={`${URL}/post/${post._id}/${post.coverUrl}`} alt={`${URL}/post/${post.coverUrl}`} width={600} height={337.50} />
                <h1 className={getClasses("title")}>{getTitle()}</h1>
                <p className={getClasses("info")}>{getDate(post)} / {post.Views?.length ?? 0} {blog.view} / {post.estimateTimeInMinutes} {blog.time}</p>
                <ReactMarkdown className={getClasses("markdown")}>{getContent || undefined}</ReactMarkdown>
                <ul className={styles.tagList}>
                    {
                        post.tags.map((tag: string, index: number) => (
                            // <li className={getClasses("tag")} key={index}>{tag}</li>
                            <Link href={`/${lang}/index/blog?page=1&perPage=5&tags=${tag}`} key={index} className={getClasses("tag")}>{tag}</Link>
                        ))
                    }
                </ul>
                <Link href={`/${lang}/index/blog?${getCurrentLink()}`} className={`${lang === "fa" ? `fakharnia-arrow-right ${styles.backButtonFa}` : "fakharnia-arrow-left"} ${styles.backButton}`}></Link>
            </div>
        </>
    )
}


export default Post;