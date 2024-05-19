import styles from "@/styles/common.module.css"

type ButtonType = {
    value?: number | string,
    label: number | string,
    currentSelected?: number | string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function RoundButton({ value, label, currentSelected, onClick } : ButtonType) {
    return (
        <button 
            className={`${styles.roundButton} ${currentSelected === value ? styles.selected : ""}`}
            value={value}
            onClick={onClick}
        >
            {label}
        </button>
    );
}