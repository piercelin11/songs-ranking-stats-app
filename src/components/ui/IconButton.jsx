import styles from "@/styles/common.module.css"

export default function IconButton({ children }) {
    return (
        <button className={styles.iconButton}>
            { children }
        </button>
    );
}