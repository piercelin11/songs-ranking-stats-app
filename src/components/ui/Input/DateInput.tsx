
import styles from "@/styles/form.module.css"

export default function DateInput({ name, label, placeholder }: { name: string, label?: string, placeholder?: string }) {

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
                pattern="\d{4}-\d{2}-\d{2}"
                required
            />
        </div>
    )
}
