"use client"
import Image from "next/image";
import styles from "../../../page.module.css";
import { useTheme } from "next-themes";

const Loading = () => {

    const { resolvedTheme } = useTheme();
    return (
        <Image className={styles.loading} src={resolvedTheme === "dark" ? "/loading-light.svg" : "/loading-dark.svg"} alt="loading" width={150} height={150} />

    )
}

export default Loading;