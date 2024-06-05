import RankingRow from "@/components/common/RankingRow";
import RankingHeader from "@/components/common/RankingHeader";
import styles from "@/styles/stats.module.css"
import Link from "next/link";
import { getAvgSongsRanking } from "@/lib/userDataProcessing/getDataByArtist";
import TopSongsContainer from "@/components/common/TopSongsContainer";
import { getSongsByDates } from "@/lib/userDataProcessing/getDataByDate";
 
export default async function DateTopSongs({ artistId, dateId } : { artistId: string, dateId: string }) {
    const songsRanking = await getSongsByDates(artistId, dateId);

  
    return (
        <div>
            <TopSongsContainer data={songsRanking} />
        </div>
    );
}
