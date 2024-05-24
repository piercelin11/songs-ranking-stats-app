import styles from "@/styles/layout.module.css"
import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    height?: number
    gap?: number, 
    align?: "center" | "flex-end" | "flex-start", 
    justify?: "center" | "space-between" | "flex-end" | "flex-start", 
    isFullWidth?: boolean, 
    isChilfrenFlex?: boolean
}

export default function FlexContainer({ children, height, gap, align, justify, isFullWidth = false, isChilfrenFlex = false } : Props) {
    return (
        <div 
            className={`${styles.flexContainer} ${isFullWidth ? styles.fullWidth : ""} ${isChilfrenFlex ? styles.flex : ""}`} 
            style={{ 
                height: height ? `${height}px` : undefined,
                gap: gap ? `${gap}px` : undefined,
                alignItems: align || undefined,
                justifyContent: justify || undefined,
            }}
        >
            {children}
        </div>
    );
} 