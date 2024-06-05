import { getSongsByDates } from "@/lib/userDataProcessing/getDataByDate";
import RankingContainer from "../../component/RankingContainer";

export default async function Ranking({ params: { artistId, dateId }, searchParams:{ id } }: { params: { artistId: string, dateId: string }, searchParams: { id: string } }) {

  const songsRanking = await getSongsByDates(artistId, dateId);
 
  return (
    <div>
        <RankingContainer data={songsRanking} searchId={id} />
    </div>
  );
}
