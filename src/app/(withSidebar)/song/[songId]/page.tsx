import { getAvgSongRanking, getAvgSongsRanking } from "@/lib/fetchData/getDataByArtist";
import StatsBoxRow from "../component/StatsBoxRow";
import { SmallGap } from "@/components/common/Gap";
import SongsLineChart from "../component/SongsLineChart";
import getPrevAndNext from "@/utils/getPrevAndNext";

 
export default async function Page({ params: { songId } }: { params: { songId: string } }) {

    
    const song = await getAvgSongRanking(songId);
    const songs = await getAvgSongsRanking(song.artist_id);
    
    const {previous, next} = getPrevAndNext(songs, "ranking", song.ranking);

    
 
    return (
      <div>
        <StatsBoxRow data={song} /> 

        <SmallGap />

        <SongsLineChart defaultSongId={song.song_id} data={songs} /> 
        
      </div>
    );
  }