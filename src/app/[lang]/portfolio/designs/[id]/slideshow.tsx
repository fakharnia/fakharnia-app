"use client"

import { useState } from "react";
import Image from "next/image";
import styles from "../page.module.css";
import { IDesign } from "@/app/interfaces/design.interface"
import { GenerateClass } from "@/app/[lang]/utils";

type propType = {
    design: IDesign,
    lang: string
}

export const SlideShow = (props: propType) => {
    const URL = process.env.NEXT_PUBLIC_SERVER_URI;
    const { design, lang } = props;
    const [image, setImage] = useState(`${URL}/design/${design.coverUrl}`);
    const [imageAlt, setImageAlt] = useState(design.coverAlt);

    const generateClass = GenerateClass(lang, styles);

    const onChangeImage = (image: any) => {
        setImage(`${URL}/design/${image.fileUrl}`);
        setImageAlt(image.fileAlt);
    }

    const onChangeImageByNav = (type: string) => {
        const index = design.images.findIndex((img: any) => `${URL}/design/${img.fileUrl}` === image);
        if (index !== -1) {

            if (type === "prev") {
                const img = design.images[index - 1];
                if (img) {
                    setImage(`${URL}/design/${img.fileUrl}`);
                }
            }

            if (type === "next") {
                const img = design.images[index + 1];
                if (img) {
                    setImage(`${URL}/design/${img.fileUrl}`);
                }
            }
        }
    }

    const activeNavButton = (type: string) => {
        const index = design?.images?.findIndex((img: any) => `${URL}/design/${img.fileUrl}` === image);
        if (type === "prev") {
            if (index === 0) {
                return false;
            }
            return true;
        }

        if (type === "next") {
            if (index === (design?.images?.length - 1)) {
                return false;
            }

            if (design?.images?.length > 0) {
                return true;
            }

            return false;
        }
    }

    const isActive = (img: any) => `${URL}/design/${img.fileUrl}` === image;

    return (
        <div className={styles.slideshow}>
            <div className={styles.slideshowBox}>
                <Image src={image} width={1920} height={1080} alt={imageAlt} className={styles.slideshowImage} />
                <button className={`${lang === "fa" ? `fakharnia-arrow-right ${styles.slideshowNavPrevFa}` : " fakharnia-arrow-left"} ${styles.slideshowNavPrev} ${!activeNavButton("prev") ? styles.slideshowNavDisable : "" }`} onClick={() => { onChangeImageByNav("prev") }}></button>
                <button className={`${lang === "fa" ? `fakharnia-arrow-left ${styles.slideshowNavNextFa}` : " fakharnia-arrow-right"} ${styles.slideshowNavNext} ${!activeNavButton("next") ? styles.slideshowNavDisable : "" }`} onClick={() => { onChangeImageByNav("next") }}></button>
            </div>
            <ul className={styles.slideshowNav}>
                {
                    design?.images?.map((image: any, index: number) => (
                        <li key={index}
                            className={`${styles.slideshowNavItem} ${isActive(image) ? styles.slideshowNavItemActive : ""}`}
                            onClick={() => { onChangeImage(image) }}
                        ></li>
                    ))
                }
            </ul>
            <div className={generateClass("slideshowItems")}>
                {
                    design?.images?.map((image: any, index: number) => (
                        <Image
                            key={index}
                            src={`${URL}/design/${image.fileUrl}`}
                            width={300} height={168} alt={image.fileAlt}
                            className={`${styles.slideshowItem} ${isActive(image) ? styles.slideshowItemActive : ""}`}
                            onClick={() => { onChangeImage(image) }} />
                    ))
                }
            </div>
        </div>

    )
}