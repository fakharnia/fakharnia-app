import styles from "../page.module.css";

export const Footer = async () => {

    return (
        <div className={styles.footer}>
            <p className={styles.copyRight}>© Fakharnia.com {new Date().getFullYear()}</p>
        </div>
    );
}