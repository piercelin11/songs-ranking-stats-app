import styles from "@/styles/placeholder.module.css"

export default function Loading({ className = "" }: { className?: string }) {
    return (
        <div className={`${styles.loadingContainer} ${styles[className]}`}>
            <div className={styles.loading}></div>
        </div> 
    );
}