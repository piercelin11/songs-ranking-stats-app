import { useState, useEffect } from "react";
import styles from "@/styles/tabs-dropdown.module.css"

type Options = {
    id: string,
    name: string,
    color?: string | null,
    album_id?: string | null
};

type Props = {
    options: Options[],
    onFilter: (e: React.MouseEvent<HTMLButtonElement>) => void,
    selected: string
}

export default function MultiSelectMenuFilter({ options, onFilter, selected }: Props) {
    
    
    return (
        <div className={styles.albumTagContainerOverflow}>
            <div className={styles.albumTagContainer}>
                {options.map( item =>
                    <button
                        key={item.id}
                        value={item.id}
                        name={item.name}
                        className={styles.albumTag}
                        onClick={onFilter}
                        style={{
                            backgroundColor: item.id === selected && item.color ? `${item.color}66` : undefined,
                        }}
                    >
                        {item.name}
                    </button>
                )}
            </div>
        </div>
    )
}