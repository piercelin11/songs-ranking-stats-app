import { getAvgSongRanking, getAvgSongsRanking } from "@/lib/userDataProcessing/getDataByArtist";
import StatsBoxRow from "../component/StatsBoxRow";
import { MediumGap, SmallGap } from "@/components/common/Gap";
import SongsLineChart from "../component/SongsLineChart";
import getPrevAndNext from "@/utils/getPrevAndNext";
import PaginationButtonWithName from "@/components/ui/PaginationButtonWithName";
import FlexContainer from "@/components/common/FlexContainer";

 
export default async function Page({ params: { songId } }: { params: { songId: string } }) {

    
    const song = await getAvgSongRanking(songId);
    const songs = await getAvgSongsRanking(song.artist_id);
    
    const {previous, next} = getPrevAndNext(songs, "ranking", song.ranking);

    
 
    return (
      <div>
        <StatsBoxRow data={song} /> 

        <SmallGap />

        <SongsLineChart defaultSongId={song.song_id} data={songs} /> 

        <MediumGap />

        <FlexContainer isFullWidth={true} isChilfrenFlex={true}>
          <PaginationButtonWithName data={previous} direction="previous" />
          <PaginationButtonWithName data={next} direction="next" />
        </FlexContainer>
        
      </div>
    );
  }