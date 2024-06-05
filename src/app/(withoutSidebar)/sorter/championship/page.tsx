

import { getSongsList } from "@/lib/userDataProcessing/getDataByArtist";
import SortingStage from "./component/SortingStage";
import { fetchAllSpotifyCover } from "@/lib/spotify/fetchSpotifyCover";


export default async function ChampionshipSorterPage() {
    const songsList = await getSongsList(null);

    const coverFetchedSongsList = await fetchAllSpotifyCover(songsList);

    return (  
        <SortingStage songsList={coverFetchedSongsList} />
    )
}

