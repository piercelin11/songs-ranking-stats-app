

import ContentLayout from "@/components/common/ContentLayout";
import AddSongs from "../component/AddSongs";
import AlbumInfoBanner from "../component/AlbumInfoBanner";
import { fetchAlbumsInfo, fetchAlbumsSongs } from "@/lib/adminDataProcessing/prismaFetching";
import DraggableContainer from "../component/DraggableContainer";
import { fetchSpotifyAlbumData } from "@/lib/spotify/fetchSpotifyCover";
import fetchSpotifyTracklist from "@/lib/spotify/fetchSpotifyTracklist";
import AutoAddSongsBtn from "../component/AutoAddSongsBtn";
import FlexContainer from "@/components/common/FlexContainer";


export default async function AddAlbumPage({ params: { albumId } }: { params: { albumId: string } }) {
    let trackList: string[] | undefined;

    const albumInfo = await fetchAlbumsInfo(albumId);
    const songs = await fetchAlbumsSongs(albumId);

    const {imgUrl, id: spotifyAlbumId} = await fetchSpotifyAlbumData(albumInfo.artist_name, albumInfo.album_name, albumInfo.release_date);
    if (songs.length === 0) 
        trackList = await fetchSpotifyTracklist(spotifyAlbumId);
    

    return (
        <div>
            <AlbumInfoBanner data={albumInfo} imgUrl={imgUrl}/>


            <ContentLayout>
                <DraggableContainer data={songs} />

                <FlexContainer justify="center">
                    {songs.length === 0 && trackList ?
                        <AutoAddSongsBtn trackList={trackList} data={albumInfo}/>
                    :
                        <AddSongs data={songs} albumInfo={albumInfo}/>
                    }
                    
                </FlexContainer>

            </ContentLayout>
            
        </div>
    );
}
