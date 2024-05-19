import Carousel from "@/components/common/Carousel";
import { MediumGap } from "@/components/common/Gap";
import TopSongs from "../component/TopSongs";
import PointsBarChart from "../component/PointsBarChart";
import { getAllDates, getAvgSongsRanking, getAvgAlbumsRanking } from "@/lib/fetchData/getDataByArtist";


export default async function Artist({ params: { artistId } }: { params: { artistId: string } }) {

  const avgSongsRanking = await getAvgSongsRanking(artistId);
  const avgAlbumsRanking = await getAvgAlbumsRanking(artistId);
  const data = await getAllDates(artistId, 4); 

  return (
    <div>
      <TopSongs data={avgSongsRanking} />

      <MediumGap />

      <PointsBarChart data={avgAlbumsRanking} />

      <MediumGap />

      <Carousel data={data} />
    </div>
  );
}
