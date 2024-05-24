
import styles from "@/styles/layout.module.css"
import { ReactNode } from "react";


export default async function ContentLayout({ children }: { children: ReactNode }) {


    return (
        
        <div className={styles.content}>
            {children}
        </div>
    );
}
