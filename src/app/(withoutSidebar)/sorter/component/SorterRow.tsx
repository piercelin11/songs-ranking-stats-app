
import styles from "@/styles/card.module.css"
import { ResultType } from "@/redux/features/sorterSlice";

export default function SorterResultRow({ data }: { data: ResultType }) {
    const {song_name, album_name, ranking, artist_name} = data;

    return(
        <div>
            <div className={styles.cardRankingRow}>
                <p className={styles.cardRankingNumber}>{ranking.toString().padStart(2, "0")}</p>
                <span style={{height: "60px"}}></span>
                <div>
                    <p className={styles.mainText}>{song_name}</p>
                    <p className={styles.subText}>{album_name || "Non-album track"}</p>
                </div>
                
            </div>
            <hr />
        </div>
    )
}