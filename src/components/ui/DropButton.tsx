import styles from "@/styles/tabs-dropdown.module.css"

export default function DropButton({ label }: { label: string }) {
    return(
        <div 
            className={styles.dropMenuButton } 
        >
            <p>{label}</p>
        </div> 
    )
}
