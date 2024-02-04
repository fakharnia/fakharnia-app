"use client"
import Link from "next/link";
import localFont from "@next/font/local";
import styles from "../page.module.css";

type propType = {
    posts: any[],
    dictionary: any,
    language: string
}
const vazir = localFont({ src: "../../../fonts/vazir.woff2" });

export const Post = (props: propType) => {

    const { posts, dictionary, language } = props;

    return (
        <>
            <h5 className={`${styles.boxTitle} ${language === "fa" ? `${vazir.className} ${styles.boxTitleFarsi}` : ""}`}>{dictionary.landing.blog}</h5>
            <ul className={styles.postList}>
                {
                    posts.map((post: any, index: number) => (
                        <li key={index} className={styles.postItem}>
                            <div className={styles.postInfo}>
                                <h5>{post.title}</h5>
                                <small>{post.crDate} / {post.views} views / {post.readTime} min</small>
                                <ul className={styles.tagBox}>
                                    {
                                        post.tags.map((tag: any, tIndex: number) => (
                                            <li key={tIndex} className={styles.tagItem}>{tag}</li>
                                        ))
                                    }
                                </ul>
                            </div>
                            <Link href="/" className={`${styles.postButton} ${language === "fa" ? `${vazir.className} ${styles.postButtonFarsi}` : ""}`}>{dictionary.landing.readButton}</Link>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}