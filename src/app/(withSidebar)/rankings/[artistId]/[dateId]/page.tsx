
import AllSongsRanking from "../../component/AllSongsRanking";
import { getSongsByDates } from "@/lib/userDataProcessing/getDataByDate";


export default async function Ranking({ params: { artistId, dateId } }: { params: { artistId: string, dateId: string } }) {

  const songsRanking = await getSongsByDates(artistId, dateId);
 
  return (
    <div>
      

      <AllSongsRanking data={songsRanking}/>
    </div>
  );
}
