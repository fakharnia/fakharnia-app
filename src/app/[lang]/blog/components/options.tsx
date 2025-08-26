"use client"
import { IPost } from "@/app/interfaces/post.interface";
import { useRouter } from 'next/navigation';
import styles from "../page.module.css"
import { IBlogDictionary } from "@/app/interfaces/dictionary.interface";
import { GenerateClass, RelativeFormatDate } from "@/app/[lang]/utils";

export const Options = (prop: readButtonPropType) => {
    const { cssClasses, lang, post, searchParams, text, dic } = prop;

    const router = useRouter();

    const getClasses = GenerateClass(lang, styles);
    
    const blog: IBlogDictionary = dic["blog"];

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

    const onNavigateToPostDetail = (post: IPost) => {
        router.push(`/${lang}/blog/${post.key}?${getCurrentLink()}`);
    }

    const getDate = (post: IPost) => {
        switch (lang) {
            case "fa": return RelativeFormatDate(post.createdAt, lang);
            case "en": return RelativeFormatDate(post.createdAt, lang);
            case "deu": return RelativeFormatDate(post.createdAt, lang);
            default: return RelativeFormatDate(post.createdAt, lang);
        }
    }

    return (
        <>
            <p className={getClasses("postInfo")}>{getDate(post)} / {post.Views?.length ?? 0} {blog.view} / {post.estimateTimeInMinutes} {blog.time}</p>
            <button className={cssClasses} onClick={(e) => { onNavigateToPostDetail(post) }}>{text}</button>
        </>
    )
}