import RankingRow from "@/components/common/RankingRow";
import RankingHeader from "@/components/common/RankingHeader";
import { SmallGap } from "@/components/common/Gap";

type DataType = {
  song_id: string,
  song_name: string,
  ranking: number,
  previous_ranking: number | null,
  average_ranking?: number,
  peak: number,
  album_id: string | null,
  album_name: string | null,
  times_in_top_10?: number | null,
  total_chart_run?: number | null,
  difference: number | null
}
 
export default function AllSongsRanking({ data } : { data: DataType[] }) {
  const showedData = data.slice(0);
  
  return (
    <div>
        <RankingHeader />

        <div>
            {
              showedData.map( item => 
                <RankingRow key={item.song_id} data={item} /> 
              )
            }
        </div>
    </div>
  );
}
