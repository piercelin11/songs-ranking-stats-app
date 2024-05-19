import styles from "@/styles/common.module.css"
import { ReactNode } from "react"

export default function NoData({ children, condition }: { children: ReactNode, condition: any }) { 

    return(
        condition ? children :
        <div className={styles.noData}>
            <div>
                <p className={styles.mainText}>NO DATA</p>
                <p className={styles.subText}>there's not enough data <br />sort the song to get the stats</p>
            </div>
        </div>
    )
}