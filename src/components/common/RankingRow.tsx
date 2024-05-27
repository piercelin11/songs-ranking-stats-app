import { RankChangeIcon } from "@/lib/icon"
import styles from "@/styles/stats.module.css"
import Image from "next/image"
import Link from "next/link";
import getDataType from "@/utils/getDataType";
import fetchSpotifyCover from "@/lib/spotify/fetchSpotifyCover";
 
export default async function RankingRow ({ data } : { data: any }) {
    const { ranking, peak, song_name, album_name, difference, artist_name, release_date } = data as {
        ranking: number,
        peak: number,
        song_name: string,
        album_name: string | null,
        difference: number | null,
        artist_name: string,
        release_date: Date | null
    };

    const imgUrl = await fetchSpotifyCover(artist_name, album_name || song_name, release_date );

    const {type, id} = getDataType(data);

    return( 
        <Link href={`/${type}/${id}`}>
            <div className={styles.rankingRow}>
                <hr className={styles.divider}/>
                <div className={styles.row}>

                    <div>
                        <p className={styles.rankingNumber}>
                            {ranking.toString().padStart(2, "0")}
                        </p>

                        <div className={styles.rankingChange}>
                            <RankChangeIcon 
                                variant={
                                    difference === 0 ? "RankUnchangeIcon" :
                                    !difference ? "CircleIcon" :
                                    difference > 0 ? "RankUpIcon" :
                                    "RankDownIcon" 
                                }
                                size={15}
                            />
                            {
                                !!difference &&
                                <p className={`${styles.description} ${difference > 0 ? styles.increase : styles.decrease}`}>
                                    {Math.abs(difference)}
                                </p>
                            }
                        </div>

                        <Image 
                            src={imgUrl}
                            alt="album cover"
                            width={70}
                            height={70}
                        />

                        <div>
                            <p className={styles.mainText}>{song_name}</p>
                            <p className={styles.subText}>{album_name}</p>
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
        </Link>
    )
}