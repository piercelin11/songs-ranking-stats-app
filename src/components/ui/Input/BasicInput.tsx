
import styles from "@/styles/form.module.css"

export default function BasicInput({ name, label, placeholder }: { name: string, label?: string, placeholder?: string }) {

    return (
        <div className={styles.BasicInputContainer}>
            {label &&
                <label htmlFor={name}>
                    {label}
                </label>
            }
            
            <input
                className={styles.BasicInput}
                name={name}
                placeholder={placeholder}
                spellCheck={false}
                autoComplete="off"
                required
            />
        </div>
    )
}
