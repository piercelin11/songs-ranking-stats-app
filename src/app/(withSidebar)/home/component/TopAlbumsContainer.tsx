import { MediumGap, SmallGap } from "@/components/common/Gap";
import GridContainer from "@/components/common/GridContainer";
import TopAlbumItem from "./TopAlbumItem";
import { getAllAlbums } from "@/lib/userDataProcessing/getDataByUser";
import { fetchAllSpotifyCover } from "@/lib/spotify/fetchSpotifyCover";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

type AllAbumsPoints = {
    album_id: string,
    album_name: string,
    album_color: string,
    artist_name: string,
    artist_id: string,
    total_points: number,
    release_date: Date | null,
    imgUrl: string,
}

export default async function TopAlbumsContainer() {
    
    const albums = await getAllAlbums();
    const coverFetchedAlbums = await fetchAllSpotifyCover(albums.filter( (item, index) => index < 8 )) as AllAbumsPoints[];

    return (
        <div>
            <GridContainer col={4} gap={15}>
                {coverFetchedAlbums.map( item => 
                    <TopAlbumItem key={item.album_id} data={item} />
                )}
            </GridContainer>
        </div>
    )
}