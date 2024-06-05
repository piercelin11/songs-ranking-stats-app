import styles from "@/styles/layout.module.css"

export default function Loading() {
    return (
        <div className={styles.loadingContainer}>
            <div className={styles.loading}></div> 
        </div>
    );
}