import Carousel from "@/components/common/Carousel";
import { MediumGap } from "@/components/common/Gap";
import { getAllDates, getAvgSongsRanking, getAvgAlbumsRanking } from "@/lib/userDataProcessing/getDataByArtist";
import RankingHeader from "@/components/common/RankingHeader";
import RankingRow from "@/components/common/RankingRow";
import { createUniqueOptions } from "@/utils/helper";
import { DropSelectSearchParams } from "@/components/common/DropSelect";
import { ChampSongsRankingData } from "@/lib/userDataProcessing/getDataByDate";
import { AvgSongsData } from "@/lib/userDataProcessing/getDataByArtist";
 
export default function RankingContainer({ data, searchId }: { data: (AvgSongsData | ChampSongsRankingData)[], searchId: string | undefined }) {

  const options = createUniqueOptions(data, "album_id", "album_name", "ASC", true);

  let showedData: (AvgSongsData | ChampSongsRankingData)[];
  if (!searchId || searchId === "all") 
      showedData = data;
  else
      showedData = data.filter( item => item.album_id === searchId );


  return (
    <div>
        <div>
            <RankingHeader>
              <DropSelectSearchParams options={options.filter( item => item.id !== null )} />
            </RankingHeader>

            <div>
                {showedData.map( item => 
                     <RankingRow key={item.song_id} data={item} /> 
                )}
            </div>
        </div>
    </div>
  );
}

