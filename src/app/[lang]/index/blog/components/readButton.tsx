"use client"
import { IPost } from "@/app/interfaces/post.interface";
import { useRouter } from 'next/navigation';

export const ReadButton = (prop: readButtonPropType) => {
    const { cssClasses, lang, post, searchParams, text } = prop;

    const router = useRouter();

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
        router.push(`/${lang}/index/blog/${post._id}?${getCurrentLink()}`);
    }


    return (
        <button className={cssClasses} onClick={(e) => { onNavigateToPostDetail(post) }}>{text}</button>
    )
}