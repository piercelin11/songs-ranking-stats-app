import styles from "@/styles/common.module.css"

type ButtonType = {
    children: any,
    value?: number | string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function IconRoundButton({ children, value, onClick } : ButtonType) {
    return (
        <button 
            className={styles.iconRoundButton}
            value={value}
            onClick={onClick}
        >
            { children }
        </button>
    );
}