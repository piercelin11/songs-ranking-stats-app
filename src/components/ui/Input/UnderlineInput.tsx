
import styles from "@/styles/form.module.css"
import { useEffect, useRef } from "react";

export default function UnderlineInput({ name, placeholder }: { name: string, placeholder: string }) {
    
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <input
            className={styles.underlineInput}
            ref={inputRef}
            name={name}
            placeholder={placeholder}
            spellCheck={false}
            autoComplete="off"
            required
        />
    )
}
