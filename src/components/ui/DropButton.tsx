import styles from "@/styles/tabs-dropdown.module.css"

type Props = {
    label: string, 
    id?: string | number,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function DropButton({ label, id, onClick }: Props) {
    return(
        <button 
            className={styles.dropMenuButton} 
            value={id}
            onClick={onClick}
        >
            <p>{label}</p>
        </button> 
    )
}
