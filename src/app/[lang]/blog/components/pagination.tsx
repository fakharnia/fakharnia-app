"use client"
import { MouseEvent } from "react";
import { useRouter } from "next/navigation";
import styles from "../page.module.css"
import { GenerateClass } from "@/app/[lang]/utils";

export const Pagination = (props: paginationPropType) => {

    const { lang, dic, params, pages, perPage, activePage, total } = props;

    const router = useRouter();

    const genClass = GenerateClass(lang, styles);

    if(document){
        document.getElementById("content")?.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }

    const getRestParams = (): string => {
        let parameters = [];
        if (params.tags) {
            parameters.push(`tag=${params.tags}`);
        }
        if (params.search) {
            parameters.push(`search=${params.search}`);
        }
        if (params.sort) {
            parameters.push(`sort=${params.sort}`);
        }
        if (params.sortFlow) {
            parameters.push(`sortFlow=${params.sortFlow}`);
        }

        return parameters.length > 0 ? "&" + parameters.join("&") : "";
    }

    const onChangePage = (page: number, event: MouseEvent<HTMLButtonElement>): void => {
        router.push(`/${lang}/blog?page=${page}&perPage=${params.perPage}${getRestParams()}`);
    }

    const onChangePerpage = (number: number, event: MouseEvent<HTMLButtonElement>): void => {
        const pagesOnThisNumber = Math.ceil(total / number)
        if (number > pagesOnThisNumber) {
            router.push(`/${lang}/blog?page=${pagesOnThisNumber}&perPage=${number}${getRestParams()}`);
        } else {
            router.push(`/${lang}/blog?page=${params.page}&perPage=${number}${getRestParams()}`);
        }
       
    }

    const pagination = (): number[] => {
        let index = activePage;
        let final = pages;
        let pagesArray: number[] = [];

        if (index === 1) {
            pagesArray = [index];
            if (index + 1 <= final) {
                pagesArray.push(index + 1);
            }
            if (index + 2 <= final) {
                pagesArray.push(index + 2);
            }
        }

        if (index === final && index !== 1) {
            if (index - 2 >= 1) {
                pagesArray.push(index - 2);
            }

            if (index - 1 >= 1) {
                pagesArray.push(index - 1);
            }
            pagesArray.push(index);
        }

        if (index > 1 && index < final) {
            if (index - 1 >= 1) {
                pagesArray.push(index - 1);
            }
            pagesArray.push(index);
            if (index + 1 <= final) {
                pagesArray.push(index + 1);
            }
        }

        return pagesArray;
    }

    return (
        <>
            <div className={styles.pageAmountBox}>
                <button className={`${genClass("pageAmount")} ${perPage === 5 ? styles.pageActive : ""}`} onClick={(e) => { onChangePerpage(5, e) }}>5</button>
                <button className={`${genClass("pageAmount")} ${perPage === 10 ? styles.pageActive : ""}`} onClick={(e) => { onChangePerpage(10, e) }}>10</button>
                <button className={`${genClass("pageAmount")} ${perPage === 15 ? styles.pageActive : ""}`} onClick={(e) => { onChangePerpage(15, e) }}>15</button>
            </div>
            <div className={styles.pagination}>
                {
                    pagination().map((_page: number, index: number) => (
                        <button key={index} className={`${genClass("page")} ${_page === activePage ? styles.pageActive : ""}`} onClick={(e) => { onChangePage(_page, e) }}>{_page}</button>
                    ))
                }
            </div>
            <div className={styles.pageCounterBox}>
                <button className={genClass("pageCounter")}>{pages} {dic.page} / {total} {dic.counter}</button>
            </div>
            <label className={styles.smartButton}>
                <input type="checkbox" className={styles.checkbox} />
                <i className={`fakharnia-arrow-up ${styles.smartButtonText} ${styles.smartButtonTextUp}`}></i>
                <i className={`fakharnia-arrow-down ${styles.smartButtonText} ${styles.smartButtonTextDown}`}></i>
                <div className={styles.smartPaginationBox}>
                    <div className={styles.pageAmountBoxSmart}>
                        <button className={`${genClass("pageAmount")} ${perPage === 5 ? styles.pageActive : ""}`}>5</button>
                        <button className={`${genClass("pageAmount")} ${perPage === 10 ? styles.pageActive : ""}`}>10</button>
                        <button className={`${genClass("pageAmount")} ${perPage === 15 ? styles.pageActive : ""}`}>15</button>
                    </div>
                    <div className={styles.pageCounterBoxSmart}>
                        <button className={genClass("pageCounter")}>{pages} {dic.page} / {total} {dic.counter}</button>
                    </div>
                </div>
            </label>
        </>

    )
}