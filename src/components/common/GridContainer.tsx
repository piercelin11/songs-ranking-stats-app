import { ReactNode } from "react";
import styles from "@/styles/layout.module.css"

type Props = {
    children: ReactNode,
    col?: number,
    gap?: number
}

export default async function GridContainer({ children, col, gap }: Props) {

    return (
        <div 
            className={styles.gridContainer}
            style={{
                gridTemplateColumns: `repeat(${col}, minmax(0, 1fr))`,
                gap: `${gap}px`
            }}
        >
            { children }
        </div>
    )
}