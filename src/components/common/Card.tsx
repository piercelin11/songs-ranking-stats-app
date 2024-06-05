
import styles from "@/styles/card.module.css"
import CardRankingRow from "./CardRankingRow";
import { CrownIcon } from "@/lib/icon";
import { alterDateFormat } from "@/utils/alterDateFormat";
import { gradientDarkOverlay } from "@/lib/gradient";
import fetchSpotifyCover from "@/lib/spotify/fetchSpotifyCover";
import Link from "next/link";
import { AllDatesData } from "@/lib/userDataProcessing/getDataByUser";



export default async function Card({ data }: { data: AllDatesData }) {
    const {date, rankings, date_id, artist_id} = data;
    const fisrtPlaceImgUrl = await fetchSpotifyCover(rankings[0].artist_name, rankings[0].album_name || rankings[0].song_name, rankings[0].release_date);

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
                        data={{...item, artist_name: item.artist_name}}
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