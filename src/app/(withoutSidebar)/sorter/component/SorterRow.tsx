
import styles from "@/styles/card.module.css"
import Image from "next/image";

type DataType = {
    song_name: string,
    album_name: string | null,
    artist_name: string,
    release_date: Date | null,
    ranking: number,
}

export default function SorterResultRow({ data }: { data: DataType }) {
    const {song_name, album_name, ranking, artist_name, release_date} = data;

    return(
        <div>
            <div className={styles.cardRankingRow}>
                <p className={styles.cardRankingNumber}>{ranking.toString().padStart(2, "0")}</p>
                {/* <Image
                    src="/pic/placeholder.jpg"
                    width={60}
                    height={60}
                    alt={`${album_name || song_name} cover`}
                /> */}
                <div style={{height: "60px"}}></div>
                <div>
                    <p className={styles.mainText}>{song_name}</p>
                    <p className={styles.subText}>{album_name || "Non-album track"}</p>
                </div>
            </div>
            <hr />
        </div>
    )
}