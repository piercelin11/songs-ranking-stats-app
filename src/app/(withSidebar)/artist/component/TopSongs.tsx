import RankingRow from "@/components/common/RankingRow";
import RankingHeader from "@/components/common/RankingHeader";
import styles from "@/styles/stats.module.css"
import Link from "next/link";

type DataType = {
  song_id: string,
  song_name: string,
  artist_id: string,
  date_id?: string,
  ranking: number,
  previous_ranking: number | null,
  average_ranking?: number,
  peak: number,
  album_id: string | null,
  album_name: string | null,
  times_in_top_10?: number | null,
  total_chart_run?: number | null,
  difference: number | null
}
 
export default function TopSongs({ data } : { data: DataType[] }) {
  const showedData = data.slice(0, 5);
  
  return (
    <div>
        <RankingHeader>
          <h2>Your Top Songs</h2>
        </RankingHeader>

        <div>
            {
              showedData.map( item => 
                <RankingRow key={item.song_id} data={item} /> 
              )
            }
        </div>

        <div className={styles.viewAll}>
          <Link href={
            !data[0]?.date_id ? `/rankings/${data[0]?.artist_id}` : `/rankings/${data[0]?.artist_id}/${data[0]?.date_id}`}
          >
            <p>View All</p>
          </Link>
        </div>
    </div>
  );
}
