import { getCover } from "@/utils/getPic";
import styles from "@/styles/card.module.css"

type DataType = {
    song_name: string,
    album_name: string | null,
    artist_name: string,
    ranking: number,
}

export default function CardRankingRow({ data }: { data: DataType }) {
    const {song_name, album_name, ranking, artist_name} = data;

    return(
        <div>
            <div className={styles.cardRankingRow}>
                <p className={styles.cardRankingNumber}>{ranking.toString().padStart(2, "0")}</p>
                <img src={getCover(artist_name, album_name, song_name)}/>
                <div>
                    <p className={styles.mainText}>{song_name}</p>
                    <p className={styles.subText}>{album_name}</p>
                </div>
            </div>
            <hr />
        </div>
    )
}