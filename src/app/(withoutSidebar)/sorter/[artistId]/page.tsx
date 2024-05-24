

import { getSongsList } from "@/lib/userDataProcessing/getDataByArtist";
import SorterContainer from "../component/SorterContainer";
import { prisma } from "@/lib/prisma";



export default async function Page({ params: { artistId } }: { params: { artistId: string } }) {
    
    const songsList = await getSongsList(artistId);

 
    return ( 
            <div> 
                <SorterContainer data={songsList}/>
            </div>
    )
}

