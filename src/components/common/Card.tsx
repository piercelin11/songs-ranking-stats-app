import { getCover } from "@/utils/getPic";
import styles from "@/styles/card.module.css"
import CardRankingRow from "./CardRankingRow";
import { CrownIcon } from "@/lib/icon";
import { alterDateFormat } from "@/utils/alterDateFormat";
import { gradientDarkOverlay } from "@/lib/gradient";

type DataType = {
    date_id: number,
    date: Date,
    info: string | null,
    type: "OVERALL" | "ALBUM",
    artist_name: string,
    rankings: {
        song_name: string,
        album_name: string,
        ranking: number,
    }[]
}

export default function Card({ data }: { data: DataType }) {
    const {date, rankings, date_id, artist_name} = data;

    return(
        <div className={styles.card} style={{backgroundImage: `${gradientDarkOverlay} ,url(${getCover(artist_name, rankings[0].album_name, rankings[0].song_name)})`}} >
            
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
            
            <div className={styles.showAll}>
                <p>Show All Data</p>
            </div>    
                 
        </div>
        
    );
}