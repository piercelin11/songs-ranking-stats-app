

import { getFilterList, getSongsList } from "@/lib/userDataProcessing/getDataByArtist";
import SorterRootComponent from "../component/SorterRootComponent";
import { prisma } from "@/lib/prisma";
import { fetchAllSpotifyCover } from "@/lib/spotify/fetchSpotifyCover";



export default async function Page({ params: { artistId } }: { params: { artistId: string } }) {
    
    const songsList = await getSongsList(artistId);
    const filterList = await getFilterList(artistId);

    const coverFetchedFilterList = await fetchAllSpotifyCover(filterList);
    const coverFetchedSongsList = await fetchAllSpotifyCover(songsList);

    return (  
            <div> 
                <SorterRootComponent songsList={coverFetchedSongsList} filterList={coverFetchedFilterList} />
            </div>
    )
}

