
import styles from "@/styles/card.module.css"
import fetchSpotifyCover, { fetchAllSpotifyCover } from "@/lib/spotify/fetchSpotifyCover";
import Image from "next/image";

type DataType = {
    song_name: string,
    album_name: string | null,
    artist_name: string,
    release_date: Date | null,
    ranking: number,
}

export default async function CardRankingRow({ data }: { data: DataType }) {
    const {song_name, album_name, ranking, artist_name, release_date} = data;
    const imgUrl = await fetchSpotifyCover(artist_name, album_name || song_name, release_date);

    return(
        <div>
            <div className={styles.cardRankingRow}>
                <p className={styles.cardRankingNumber}>{ranking.toString().padStart(2, "0")}</p>
                <Image 
                    src={imgUrl}
                    width={60}
                    height={60}
                    alt={`${album_name || song_name} cover`}
                />
                <div>
                    <p className={styles.mainText}>{song_name}</p>
                    <p className={styles.subText}>{artist_name || "Non-album track"}</p>
                </div>
            </div>
            <hr />
        </div>
    )
}