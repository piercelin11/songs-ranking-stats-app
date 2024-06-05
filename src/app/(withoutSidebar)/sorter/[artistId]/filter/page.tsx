

import { getFilterList } from "@/lib/userDataProcessing/getDataByArtist";
import { fetchAllSpotifyCover } from "@/lib/spotify/fetchSpotifyCover";
import FilterStage from "../component/FilterStage";



export default async function Page({ params: { artistId } }: { params: { artistId: string } }) {
    
    const filterList = await getFilterList(artistId);

    const coverFetchedFilterList = await fetchAllSpotifyCover(filterList);

    return (  
        <FilterStage filterList={coverFetchedFilterList} />
    )
}

