import styles from "@/styles/tabs-dropdown.module.css"
import { useSearchParams } from "next/navigation";
import React from "react";

export default function MultiSelectTag({ value, label, isFixed = false, color = null }: { value: number | string, label: string, isFixed?: boolean, color?: string | null }) {
    const searchParams = useSearchParams();
    const compareId: string[] = searchParams.getAll("compare");
    
    function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation();
        
        const songId = (e.target as HTMLButtonElement).value;

        const newParamsArray = compareId.filter( item => item !== songId ).map( item => ["compare", item] );
        const newParams = new URLSearchParams(newParamsArray);

        window.history.pushState(null, '', `?${newParams.toString()}`);
    }

    return (
        <div 
            className={styles.multiSelectTag}
            style={{backgroundColor: `${color}66` || undefined}}
        >
            {!isFixed && 
                <button value={value} onClick={handleDelete}>X</button>
            }
            <p>{label}</p>
        </div>
    )
}