"use client"
import Link from "next/link";
import localFont from "@next/font/local";
import styles from "../page.module.css";
import { IPost } from "@/app/interfaces/post.interface";
import { GenerateClass, RelativeFormatDate } from "../../utils";
import { IBlogDictionary } from "@/app/interfaces/dictionary.interface";
import Image from "next/image";


type propType = {
    posts: any[],
    dictionary: any,
    language: string
}
const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

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
            <h5 className={`${styles.boxTitle} ${language === "fa" ? `${vazir.className} ${styles.boxTitleFarsi}` : ""}`}>{dictionary.landing.blog}</h5>
            <div className={styles.blogPosts}>
                {

                    posts.map((post: IPost, index: number) => (
                        <div className={`${styles.post} ${language === "fa" ? vazir.className : ""}`}>
                            <Image className={styles.postCover} src={`${URL}/post/${post._id}/${post.coverUrl}`} alt={`${URL}/post/${post.coverUrl}`} width={300} height={180} />
                            <div className={styles.postDetail}>
                                <h5 className={genClass("postTitle")}>{getTitle(post)}</h5>
                                <div className={styles.postTags}>
                                    {
                                        post.tags.map((tag: string, index: number) => (
                                            <Link href={`/${language}/index/blog?page=1&perPage=5&tags=${tag}`} key={index} className={genClass("postTag")}>{tag}</Link>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={styles.postOptions}>
                                <p className={genClass("postInfo")}>{getDate(post)} / {post.Views?.length ?? 0} {blog.view} / {post.estimateTimeInMinutes} {blog.time}</p>
                                <Link href={`/${language}/index/blog/${post._id}?page=1&perPage=5`} className={genClass("postReadButton")}>{blog.read}</Link>
                            </div>
                        </div>

                    ))
                }
            </div>
        </>
    )
}