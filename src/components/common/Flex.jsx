import styles from "@/styles/common.module.css"

export default function Flex({ children }) {
    return (
        <div className={styles.flexContainer}>
            {children}
        </div>
    );
} 