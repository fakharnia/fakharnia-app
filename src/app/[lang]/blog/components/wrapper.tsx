"use client"
import { ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import styles from "../page.module.css"
import { useRouter } from "next/navigation";
import { GenerateClass, GenosFont } from "@/app/[lang]/utils";

export const Wrapper = (props: wrapperPropType) => {


    const wrapperRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const { lang, dic, tags, params } = props;
    const genClass = GenerateClass(lang, styles);

    const sortedTags = tags.sort((a, b) => a.localeCompare(b));

    const [selectedTags, setSelectedTags] = useState<string[]>(params?.tags?.split(",") || []);
    const [search, setSearch] = useState(params?.search || "");
    const [sort, setSort] = useState(params?.sort || dic.sorts.date.value);
    const [sortFlow, setSortFlow] = useState(params?.sortFlow || "desc");
    const [sortMenu, setSortMenu] = useState(false);
    const [posts, setPosts] = useState<any>({ data: [], page: 1 });

    const prepareFilter = (type: string, value: any): string => {
        let filters = [
            `page=${params.page}`,
            `perPage=${params.perPage}`
        ];
        switch (type) {
            case "tags":
                if (value.length > 0) {
                    filters.push(`tags=${value.join(",")}`);
                }
                break;
            case "search":
                if (value) {
                    filters.push(`search=${value}`)
                }
                break;
            case "sort":
                if (value) {
                    filters.push(`sort=${value}`)
                }
                break;
            case "sortFlow":
                if (value !== "desc") {
                    filters.push(`sortFlow=${value}`);
                }
                break;
        }
        if (type !== "tags" && selectedTags.length > 0) {
            filters.push(`tags=${selectedTags.join(",")}`);
        }
        if (type !== "search" && search.length > 0) {
            filters.push(`search=${search}`)
        }
        if (type !== "sort" && sort.length > 0 && (sort !== "createdAt" || (sort === "createdAt" && sortFlow != "desc"))) {
            filters.push(`sort=${sort}`)
        }
        if (type !== "sortFlow") {
            filters.push(`sortFlow=${sortFlow}`);
        }
        return filters.join("&");
    }


    const onSelectTag = (tag: string, event: ChangeEvent<HTMLInputElement>) => {
        event.stopPropagation();
        const updatedTags = event.target.checked
            ? [...selectedTags, tag]
            : selectedTags.filter((stag: string) => stag !== tag);
        setSelectedTags(updatedTags);

        router.push(`/${lang}/blog?${prepareFilter("tags", updatedTags)}`);
        document.getElementById("content")?.scrollTo({
            top: 0, left: 0,
            behavior: "smooth"
        });
    }

    const onChangeSort = (sort: string, event: ChangeEvent<HTMLInputElement>) => {
        setSort(sort);
        setSortMenu(false);
        router.push(`/${lang}/blog?${prepareFilter("sort", sort)}`);
        document.getElementById("content")?.scrollTo({
            top: 0, left: 0,
            behavior: "smooth"
        });
    }

    const onChangeSortFlow = (sortFlow: string, event: MouseEvent<HTMLButtonElement>) => {
        setSortFlow(sortFlow);
        router.push(`/${lang}/blog?${prepareFilter("sortFlow", sortFlow)}`);
        document.getElementById("content")?.scrollTo({
            top: 0, left: 0,
            behavior: "smooth"
        });
    }

    const onFormSubmitted = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        router.push(`/${lang}/blog?${prepareFilter("", undefined)}`);
        document.getElementById("content")?.scrollTo({
            top: 0, left: 0,
            behavior: "smooth"
        });
    }

    const getActiveSort = () => {
        switch (sort) {
            case "en_title" || "fa_title" || "deu_title":
                return dic.sorts.title.key;
            case "createdAt":
                return dic.sorts.date.key;
            case "views":
                return dic.sorts.view.key;
        }
    }

    useEffect(() => {

        const handleClickOutside = (event: any) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setSortMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
    }, []);


    if (!posts || posts.length === 0) {
        return <></>
    }

    const isChecked = (tag: string) => {
        const exist = params?.tags?.split(",").includes(tag);

        if (exist) {
            return true;
        }
        return false;
    }


    return (
        <>
            <div className={styles.tagBox}>
                <h5 className={genClass("tagTitle")}>{dic.tag}</h5>
                <ul className={styles.tagList}>
                    {
                        sortedTags.map((tag: string, index: number) => (
                            <li key={index} className={genClass("tagItem")} >
                                <label className={genClass("tagItemCheckbox")}>
                                    <input type="checkbox" className={styles.checkbox} checked={isChecked(tag)} onChange={(e) => { onSelectTag(tag, e) }} />
                                    <p className={`${genClass("tagItemCheckboxTitle")} ${GenosFont.className}`}>{tag}</p>
                                </label>
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className={styles.searchBox}>
                <form className={genClass("searchForm")} onSubmit={(e) => { onFormSubmitted(e) }}>
                    <input type="text" className={genClass("searchInput")} placeholder={dic.search} onChange={(e) => setSearch(e.target.value)} />
                    <button type="submit" className={genClass("searchButton")}>{dic.search}</button>
                </form>
                <div className={styles.sortBox} ref={wrapperRef}>
                    <label className={styles.sortController} >
                        <input type="checkbox" className={`${styles.checkbox} ${genClass("tagItem")}`} value={sort} checked={sortMenu} onChange={(e) => setSortMenu(e.target.checked)} />
                        <p className={genClass("sortText")}>{getActiveSort()}</p>
                        <div className={`${styles.sortItems} ${sortMenu ? styles.sortItemsActive : ""}`}>
                            <label className={styles.sortItem}>
                                <input type="checkbox" className={styles.checkbox} value={dic.sorts.title.value} onChange={(e) => { onChangeSort(dic.sorts.title.value, e) }} />
                                <p className={genClass("checkboxText")}>{dic.sorts.title.key}</p>
                            </label>
                            <label className={styles.sortItem}>
                                <input type="checkbox" className={styles.checkbox} value={dic.sorts.view.value} onChange={(e) => { onChangeSort(dic.sorts.view.value, e) }} />
                                <p className={genClass("checkboxText")}>{dic.sorts.view.key}</p>
                            </label>
                            <label className={styles.sortItem}>
                                <input type="checkbox" className={styles.checkbox} value={dic.sorts.date.value} onChange={(e) => { onChangeSort(dic.sorts.date.value, e) }} />
                                <p className={genClass("checkboxText")}>{dic.sorts.date.key}</p>
                            </label>
                        </div>
                    </label>
                    <div className={styles.sortButtons}>
                        <button className={`fakharnia-arrow-up ${styles.sortButton} ${sortFlow === "asc" ? styles.sortButtonActive : ""}`} onClick={(e) => { onChangeSortFlow("asc", e) }}></button>
                        <button className={`fakharnia-arrow-down ${styles.sortButton} ${sortFlow === "desc" ? styles.sortButtonActive : ""}`} onClick={(e) => { onChangeSortFlow("desc", e) }}></button>
                    </div>
                </div>
            </div>
        </>

    )
}
