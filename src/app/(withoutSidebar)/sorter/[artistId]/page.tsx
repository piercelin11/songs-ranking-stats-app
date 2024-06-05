

import { getSongsList } from "@/lib/userDataProcessing/getDataByArtist";
import SortingStage from "../component/SortingStage";
import { fetchAllSpotifyCover } from "@/lib/spotify/fetchSpotifyCover";


export default async function ArtistSorterPage({ params: { artistId } }: { params: { artistId: string } }) {
    
    const songsList = await getSongsList(artistId);

    const coverFetchedSongsList = await fetchAllSpotifyCover(songsList);

    return (  
        <SortingStage songsList={coverFetchedSongsList} />
    )
}

