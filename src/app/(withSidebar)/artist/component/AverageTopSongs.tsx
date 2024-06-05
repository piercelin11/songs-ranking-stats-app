import RankingRow from "@/components/common/RankingRow";
import RankingHeader from "@/components/common/RankingHeader";
import styles from "@/styles/stats.module.css"
import Link from "next/link";
import { getAvgSongsRanking } from "@/lib/userDataProcessing/getDataByArtist";
import TopSongsContainer from "@/components/common/TopSongsContainer";
 
export default async function AverageTopSongs({ artistId } : { artistId: string }) {
  const avgSongsRanking = await getAvgSongsRanking(artistId);
   
  return (
    <div>
        <RankingHeader>
          <h2>Your Top Songs</h2>
        </RankingHeader>
        <TopSongsContainer data={avgSongsRanking} />
    </div>
  );
}
