import styles from "@/styles/common.module.css"
import { ReactNode } from "react";

type Props = {
    children: ReactNode,
    height?: number
}

export default function FlexContainer({ children, height } : Props) {
    return (
        <div className={styles.flexFullContainer} style={{ height: `${height}px` }}>
            {children}
        </div>
    );
} 