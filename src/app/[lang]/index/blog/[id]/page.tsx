import Link from "next/link";
import type { Metadata, ResolvingMetadata } from 'next'
import Image from "next/image";
import ReactMarkdown from 'react-markdown';
import styles from "./page.module.css";
import { getPost, getPostContent, postView } from "@/lib/blog.lib";
import { getDictionary } from "@/dictionary";
import { IBlogDictionary } from "@/app/interfaces/dictionary.interface";
import { IPost } from "@/app/interfaces/post.interface";
import { GenerateClass, RelativeFormatDate } from "../utils";
import { env } from "process";
import { GenosFont, VazirFont } from "@/app/[lang]/utils";

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialLight, oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import type { SyntaxHighlighterProps } from 'react-syntax-highlighter';
import remarkGfm from "remark-gfm";

const light = materialLight as { [key: string]: React.CSSProperties };
const dark = oneDark as { [key: string]: React.CSSProperties };
import { cookies } from 'next/headers';

export async function generateMetadata(
    { params, searchParams }: ssrPropType,
    parent: ResolvingMetadata
): Promise<Metadata> {
    // read route params
    const id = params.id


    // fetch data
    const post = await getPost(id);

    return {
        title: post[`${params.lang}_metatag_title`],
        description: post[`${params.lang}_metatag_title`]
    }
}

const Post = async ({ params: { lang, id }, searchParams: searchParams }: ssrPropType) => {

    const cookieStore = cookies();
    const theme = cookieStore.get('theme')?.value || 'light';
    
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
            <title>Fakharnia Dev | Post</title>
            <div className={`${getClasses("container")} ${lang === "fa" ? VazirFont.className : ""}`}>
                <Image className={styles.cover} src={`${URL}/post/${post._id}/${post.coverUrl}`} alt={`${URL}/post/${post.coverUrl}`} width={600} height={337.50} />
                <h1 className={getClasses("title")}>{getTitle()}</h1>
                <p className={getClasses("info")}>{getDate(post)} / {post.Views?.length ?? 0} {blog.view} / {post.estimateTimeInMinutes} {blog.time}</p>
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    className={getClasses("markdown")}
                    components={{
                        code({ node, className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const isInline = !className?.includes('language-');

                            return isInline ? (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            ) : (
                                <SyntaxHighlighter
                                    style={theme === "dark" ? dark : light}  // Use the typed style here
                                    language={match?.[1] || 'text'}
                                    PreTag="div"
                                    {...props as SyntaxHighlighterProps}
                                >
                                    {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                            );
                        }
                    }}
                >
                    {getContent || ''}
                </ReactMarkdown>
                <ul className={styles.tagList}>
                    {
                        post.tags.map((tag: string, index: number) => (
                            // <li className={getClasses("tag")} key={index}>{tag}</li>
                            <Link href={`/${lang}/index/blog?page=1&perPage=5&tags=${tag}`} key={index} className={`${getClasses("tag")} ${GenosFont.className}`}>{tag}</Link>
                        ))
                    }
                </ul>
                <Link href={`/${lang}/index/blog?${getCurrentLink()}`} className={`${lang === "fa" ? `fakharnia-arrow-right ${styles.backButtonFa}` : "fakharnia-arrow-left"} ${styles.backButton}`}></Link>
            </div>
        </>
    )
}


export default Post;