

import ContentLayout from "@/components/common/ContentLayout";
import AddSongs from "../component/AddSongs";
import AlbumInfoBanner from "../component/AlbumInfoBanner";
import { fetchAlbumsInfo, fetchAlbumsSongs } from "@/lib/adminDataProcessing/prismaFetching";
import DraggableContainer from "../component/DraggableContainer";


export default async function AddAlbumPage({ params: { albumId } }: { params: { albumId: string } }) {

    const albumInfo = await fetchAlbumsInfo(albumId);
    const songs = await fetchAlbumsSongs(albumId);
    

    return (
        <div>
            <AlbumInfoBanner data={albumInfo} />

            <ContentLayout>
                <DraggableContainer data={songs} />
                <AddSongs data={songs} albumInfo={albumInfo}/>
            </ContentLayout>
            
        </div>
    );
}
