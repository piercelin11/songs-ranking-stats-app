
import styles from "@/styles/card.module.css"
import CardRankingRow from "./CardRankingRow";
import { CrownIcon } from "@/lib/icon";
import { alterDateFormat } from "@/utils/alterDateFormat";
import { gradientDarkOverlay } from "@/lib/gradient";
import fetchSpotifyCover, { fetchAllSpotifyCover } from "@/lib/spotify/fetchSpotifyCover";
import Link from "next/link";

type DataType = {
    date_id: string, 
    date: Date,
    info: string | null,
    type: "OVERALL" | "ALBUM",
    artist_id: string,
    artist_name: string,
    rankings: {
        song_name: string,
        album_name: string | null,
        ranking: number,
        release_date: Date | null 
    }[]
}

export default async function Card({ data }: { data: DataType }) {
    const {date, rankings, date_id, artist_name, artist_id} = data;
    const fisrtPlaceImgUrl = await fetchSpotifyCover(artist_name, rankings[0].album_name || rankings[0].song_name, rankings[0].release_date);

    return(
        <div className={styles.card} style={{backgroundImage: `${gradientDarkOverlay} ,url(${fisrtPlaceImgUrl})`}} >
            
            <div className={styles.cardCover}>
                <div>
                    <p>{alterDateFormat(date)}</p>
                </div>
                <div>
                    <CrownIcon size={20} />
                    <p className={styles.mainText}>{rankings[0].song_name}</p>
                    <p className={styles.subText}>{rankings[0].album_name}</p>
                </div>      
            </div>

            <div className={styles.cardRanking}>
                {rankings.slice(1).map( item =>
                    <CardRankingRow 
                        key={`${date_id}${item.song_name}`}
                        data={{...item, artist_name: artist_name}}
                    />
                )}
            </div>
            
            <Link href={`/artist/${artist_id}/${date_id}`}>
                <div className={styles.showAll}>
                    <p>Show All Data</p>
                </div>
            </Link>
                 
        </div>
        
    );
}