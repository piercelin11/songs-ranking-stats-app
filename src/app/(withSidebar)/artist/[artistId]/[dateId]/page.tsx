import TopSongs from "../../component/TopSongs";
import FlexContainer from "@/components/common/FlexContainer";
import InfoBoxColContainer from "../../component/InfoBoxColContainer";
import { LargeGap, MediumGap } from "@/components/common/Gap";
import SongsPolarAreaChart from "../../component/SongsPolarAreaChart";
import { getAlbumsByDates, getSongsByDates } from "@/lib/fetchData/getDataByDate";
import PointsBarChart from "../../component/PointsBarChart";
import DropSelect from "@/components/common/DropSelect";
import { fetchAllDates } from "@/lib/prisma";
import { alterDateFormatToLong } from "@/utils/alterDateFormat";

export default async function Artist({ params: { artistId, dateId } }: { params: { artistId: string, dateId: string } }) {

  const songsRanking = await getSongsByDates(artistId, dateId);
  const albumsRanking = await getAlbumsByDates(artistId, dateId);

  const allDates = await fetchAllDates(artistId);
  

  const options = allDates.map( item => ({
    label: alterDateFormatToLong(item.date),
    value: item.id
  }));

  return (
    <div>
      <DropSelect options={options}/>
      
      <TopSongs data={songsRanking} />

      <LargeGap />

      <FlexContainer >
        <InfoBoxColContainer data={albumsRanking} />
        <SongsPolarAreaChart data={albumsRanking} />
      </FlexContainer>

      <MediumGap />

      <PointsBarChart data={albumsRanking}/>

    </div>
  );
}
