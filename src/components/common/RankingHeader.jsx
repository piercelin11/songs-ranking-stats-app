import styles from "@/styles/stats.module.css"

export default function RankingHeader () {

    return(  
        <div className={styles.rankingHeader}>
            <div className={styles.rankingRow}>

                <div>
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
        </div>
    )
}