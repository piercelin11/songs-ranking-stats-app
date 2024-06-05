import styles from "@/styles/stats.module.css"
import { ReactNode } from "react"

export default function RankingHeader ({ children }: { children?: ReactNode }) {

    return(   
        <div className={styles.rankingHeader}>


                <div className={styles.rankingTitle}>
                    { children }
                </div>

                <div>
                    <div>
                        <p className={styles.description}>PEAK</p>
                    </div>
                    <div>
                        <p className={styles.description}>LAST RANKING</p>
                    </div>  
                </div>
                

        </div>
    )
}