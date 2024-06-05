import RankingRow from "@/components/common/RankingRow";
import styles from "@/styles/stats.module.css"
import Link from "next/link";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import NoData from "@/components/common/NoData";
import { SongsRankingData } from "@/lib/userDataProcessing/getDataByDate";
import { AvgSongData } from "@/lib/userDataProcessing/getDataByArtist";
 
export default async function TopSongsContainer({ data } : { data: SongsRankingData[] | AvgSongData[] }) {
  const showedData = data.slice(0, 5);
  
  return (
    <div>
        
        <div className={styles.topSongsRowContainer}>
          <Suspense fallback={<Loading />}>
            <NoData condition={showedData.length !== 0}>
            {
              showedData.map( item => 
                <RankingRow key={item.song_id} data={item} /> 
              )
            }
            </NoData>
            </Suspense>
        </div>
        

        <div className={styles.viewAll}>
          <Link href={
            data[0] && 'date_id' in data[0]
            ? `/rankings/${(data[0] as SongsRankingData)?.artist_id}/${(data[0] as SongsRankingData)?.date_id}`
            : `/rankings/${(data[0] as AvgSongData)?.artist_id}`}
          >
            <p>View All</p>
          </Link>
        </div>
    </div>
  );
}




