import RankingRow from "@/components/common/RankingRow";
import RankingHeader from "@/components/common/RankingHeader";
import styles from "@/styles/stats.module.css"
import Link from "next/link";
import { getAvgSongsRanking } from "@/lib/userDataProcessing/getDataByArtist";
import TopSongsContainer from "@/components/common/TopSongsContainer";
import { getChampSongsByDates } from "@/lib/userDataProcessing/getDataByDate";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import NoData from "@/components/common/NoData";
import CardRankingRow from "@/components/common/CardRankingRow";
 
export default async function ChampTopSongs({ dateId } : { dateId: string }) {
  const avgSongsRanking = await getChampSongsByDates(dateId);
  const showedData = avgSongsRanking.slice(0, 5);
   
  return (
    <div>

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
            <Link href={`/rankings/championship/${dateId}`}>
              <p>View All</p>
            </Link>
          </div>
      </div>

    </div>
  );
}
