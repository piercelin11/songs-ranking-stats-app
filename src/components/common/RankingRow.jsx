import { RankChangeIcon } from "@/lib/icon"
import styles from "@/styles/stats.module.css"
import Image from "next/image"

export default function RankingRow () {

    return(  
        <div>
            <hr className={styles.divider}/>
            <div className={styles.rankingRow}>

                <div>
                    <p className={styles.rankingNumber}>
                        01
                    </p>

                    <div className={styles.rankingChange}>
                        <RankChangeIcon 
                            variant="RankUpIcon"
                            size={15}
                        />
                        <p className={`${styles.description} ${styles.increase}`}>1</p>
                    </div>

                    <Image 
                        src="https://i.pinimg.com/736x/67/0a/3e/670a3e554cb9f1e61d218c8cf35b41d0.jpg"
                        alt="album cover"
                        width={70}
                        height={70}
                    />

                    <div>
                        <p className={styles.mainText}>this is me trying</p>
                        <p className={styles.subText}>folklore</p>
                    </div>
                </div>

                <div>
                    <div>
                        <p className={styles.description}>1</p>
                    </div>
                    <div>
                        <p className={styles.description}>1</p>
                    </div>  
                </div>
                
            </div>
        </div>
    )
}