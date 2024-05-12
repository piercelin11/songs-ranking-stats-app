import styles from "@/styles/common.module.css"

export default function PageHeader({ children }) {
    return (
        <div className={styles.header}>
            {children}
        </div>
    );
} 