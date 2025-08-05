"use client"
import Link from "next/link";
import styles from "../page.module.css";
import { IPost } from "@/app/interfaces/post.interface";
import { GenerateClass, GenosFont, RelativeFormatDate, VazirFont } from "../../utils";
import { IBlogDictionary } from "@/app/interfaces/dictionary.interface";
import Image from "next/image";


type propType = {
    posts: any[],
    dictionary: any,
    language: string
}

export const Post = (props: propType) => {

    const URL = process.env.NEXT_PUBLIC_SERVER_URI;

    const { posts, dictionary, language } = props;
    const blog: IBlogDictionary = dictionary["blog"];

    const genClass = GenerateClass(language, styles);

    const getTitle = (post: IPost) => {
        switch (language) {
            case "fa": return post.fa_title;
            case "en": return post.en_title;
            case "deu": return post.deu_title;
            default: return post.en_title;
        }
    }

    const getDate = (post: IPost) => {
        switch (language) {
            case "fa": return RelativeFormatDate(post.createdAt, language);
            case "en": return RelativeFormatDate(post.createdAt, language);
            case "deu": return RelativeFormatDate(post.createdAt, language);
            default: return RelativeFormatDate(post.createdAt, language);
        }
    }

    return (
        <>
            <h5 className={`${styles.boxTitle} ${language === "fa" ? `${VazirFont.className} ${styles.boxTitleFarsi}` : ""}`}>{dictionary.landing.blog}</h5>
            <div className={styles.blogPosts}>
                {

                    posts?.map((post: IPost, index: number) => (
                        <div className={`${styles.post} ${language === "fa" ? VazirFont.className : ""}`} key={index}>
                            <Image className={styles.postCover} src={`${URL}/post/${post._id}/${post.coverUrl}`} alt={`${URL}/post/${post.coverUrl}`} width={1200} height={675} />
                            <div className={styles.postDetail}>
                                <h5 className={genClass("postTitle")}>{getTitle(post)}</h5>
                                <div className={styles.postTags}>
                                    {
                                        post?.tags?.map((tag: string, index: number) => (
                                            <Link href={`/${language}/index/blog?page=1&perPage=5&tags=${tag}`} key={index} className={`${genClass("postTag")} ${GenosFont.className}`}>{tag}</Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={styles.postOptions}>
                                <p className={genClass("postInfo")}>{getDate(post)} / {post.Views?.length ?? 0} {blog.view} / {post.estimateTimeInMinutes} {blog.time}</p>
                                <Link href={`/${language}/index/blog/${post.key}?page=1&perPage=5`} className={genClass("postReadButton")}>{blog.read}</Link>
                            </div>
                        </div>

                    ))
                }
            </div>
        </>
    )
}