import Carousel from "@/components/common/Carousel";
import { MediumGap } from "@/components/common/Gap";
import { getAllDates, getAvgSongsRanking, getAvgAlbumsRanking } from "@/lib/userDataProcessing/getDataByArtist";
import RankingHeader from "@/components/common/RankingHeader";
import RankingRow from "@/components/common/RankingRow";
import { createUniqueOptions } from "@/utils/helper";
import { DropSelectSearchParams } from "@/components/common/DropSelect";
import RankingContainer from "../component/RankingContainer";

 
export default async function Ranking({ params: { artistId }, searchParams:{ id } }: { params: { artistId: string }, searchParams: { id: string } }) {

  const avgSongsRanking = await getAvgSongsRanking(artistId);

  return (
    <div>
        <RankingContainer data={avgSongsRanking} searchId={id} />
    </div>
  );
}
