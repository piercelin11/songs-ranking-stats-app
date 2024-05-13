import { RankChangeIcon } from "@/lib/icon"
import { getCover } from "@/lib/pic";
import styles from "@/styles/stats.module.css"
import Image from "next/image"

export default function RankingRow ({ data }) {
    const {ranking, peak, song_name, albums } = data;

    return(  
        <div>
            <hr className={styles.divider}/>
            <div className={styles.rankingRow}>

                <div>
                    <p className={styles.rankingNumber}>
                        {ranking}
                    </p>

                    <div className={styles.rankingChange}>
                        <RankChangeIcon 
                            variant="RankUpIcon"
                            size={15}
                        />
                        <p className={`${styles.description} ${styles.increase}`}>1</p>
                    </div>

                    <Image 
                        src={getCover(albums.album_name, song_name)}
                        alt="album cover"
                        width={70}
                        height={70}
                    />

                    <div>
                        <p className={styles.mainText}>{song_name}</p>
                        <p className={styles.subText}>{albums.album_name}</p>
                    </div>
                </div>

                <div>
                    <div>
                        <p className={styles.description}>{peak}</p>
                    </div>
                    <div>
                        <p className={styles.description}>1</p>
                    </div>  
                </div>
                
            </div>
        </div>
    )
}