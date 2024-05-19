import styles from "@/styles/common.module.css"

export default function PageHeader({ children } : { children: any }) {
    return (
        <div className={styles.header}>
            {children}
        </div>
    );
} 