import Image from "next/image";
import styles from "../../page.module.css";

const Loading = () => {

    return (
        <Image className={styles.loading} src="/loading-light.svg" alt="loading" width={150} height={150} />
    )
}

export default Loading;