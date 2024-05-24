import Carousel from "@/components/common/Carousel";
import { MediumGap } from "@/components/common/Gap";
import { getAllDates, getAvgSongsRanking, getAvgAlbumsRanking } from "@/lib/userDataProcessing/getDataByArtist";
import AllSongsRanking from "../component/AllSongsRanking";


export default async function Ranking({ params: { artistId } }: { params: { artistId: string } }) {

  const avgSongsRanking = await getAvgSongsRanking(artistId);
  const avgAlbumsRanking = await getAvgAlbumsRanking(artistId);

  return (
    <div>
      

      <AllSongsRanking data={avgSongsRanking}/>
    </div>
  );
}
