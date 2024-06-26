import type { Metadata, ResolvingMetadata } from 'next'
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css"
import { getDictionary } from "@/dictionary";
import { getPosts, getTags } from "@/lib/blog.lib";
import { IBlogDictionary } from "@/app/interfaces/dictionary.interface";
import { IPost } from "@/app/interfaces/post.interface";
import { GenerateClass, RelativeFormatDate } from "./utils";
import { Wrapper } from "./components/wrapper";
import { Pagination } from "./components/pagination";
import { ReadButton } from "./components/readButton";
import { GenosFont, VazirFont } from "../../utils";

export const generateMetadata = async (
    { params, searchParams }: ssrPropType,
    parent: ResolvingMetadata
): Promise<Metadata> => {
    const dic = await getDictionary(params.lang)
    const metatag = dic.metatag.blog;

    return {
        title: metatag.title,
        description: metatag.description
    }
}

const Blog = async ({ params: { lang }, searchParams: searchParams }: ssrPropType) => {

    const URL = process.env.SERVER_URI;

    const dic = await getDictionary(lang);
    const blog: IBlogDictionary = dic["blog"];

    const tags: string[] = await getTags();

    const getClasses = GenerateClass(lang, styles);

    const postsData = await getPosts(searchParams.page, searchParams.perPage, searchParams.search, searchParams.tags, searchParams.sort, searchParams.sortFlow);

    const getTitle = (post: IPost) => {
        switch (lang) {
            case "fa": return post.fa_title;
            case "en": return post.en_title;
            case "deu": return post.deu_title;
            default: return post.en_title;
        }
    }

    return (

        <>
            <title>Fakharnia Dev | Blog</title>
            <div className={styles.container}>
                <div id="content" className={`${lang === "fa" ? `${styles.farsiLang} ${VazirFont.className}` : ""} ${styles.content}`}>
                    <Wrapper dic={blog} lang={lang} tags={tags} params={searchParams} />
                    <div className={styles.blogPosts}>
                        {

                            postsData.data?.map((post: IPost, index: number) => (
                                <div className={styles.post} key={index}>
                                    <Image className={styles.postCover} src={`${URL}/post/${post._id}/${post.coverUrl}`} alt={`${URL}/post/${post.coverUrl}`} width={300} height={180} />
                                    <div className={styles.postDetail}>
                                        <h5 className={getClasses("postTitle")}>{getTitle(post)}</h5>
                                        <div className={styles.postTags}>
                                            {
                                                post.tags.map((tag: string, index: number) => (
                                                    <Link href={`/${lang}/index/blog?page=1&perPage=5&tags=${tag}`} key={index} className={`${getClasses("postTag")} ${GenosFont.className}`}>{tag}</Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className={styles.postOptions}>
                                        <p className={getClasses("postInfo")}>{RelativeFormatDate(post.createdAt, lang)} / {post.Views?.length ?? 0} {blog.view} / {post.estimateTimeInMinutes} {blog.time}</p>
                                        <ReadButton lang={lang} post={post} cssClasses={`${getClasses("postReadButton")} ${lang === "fa" ? VazirFont.className : ""} `} searchParams={searchParams} text={blog.read} />
                                    </div>
                                </div>

                            ))
                        }
                    </div>
                </div>
                <div className={`${lang === "fa" ? `${styles.farsiLang} ${VazirFont.className}` : ""} ${styles.footer}`}>
                    <Pagination dic={blog} lang={lang} pages={postsData.pages} perPage={postsData.perPage} activePage={postsData.activePage} total={postsData.total} params={searchParams} />
                </div>
            </div>
        </>
    )
}

export default Blog;

