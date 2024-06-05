import GalleryContainer from "@/components/common/GalleryContainer";
import { MediumGap, SmallGap } from "@/components/common/Gap";
import { fetchArtistsAlbums, fetchArtistsSingles } from "@/lib/adminDataProcessing/prismaFetching";
import AlbumGallery from "../component/AlbumGallery";
import SinglesList from "../component/SinglesList";
import AddSingles from "../component/AddSingles";
import { fetchAllSpotifyCover } from "@/lib/spotify/fetchSpotifyCover";




export default async function AdminArtistPage({ params: { artistId } }: { params: { artistId: string } }) {

  const albums = await fetchArtistsAlbums(artistId, 14);
  const singles = await fetchArtistsSingles(artistId);

  const coverFetchedAlbums = await fetchAllSpotifyCover(albums);



  return (
    <div>

       
      <AlbumGallery data={coverFetchedAlbums} />

      <MediumGap />

      <h2>Non-album tracks</h2>
      <SmallGap />
      <SinglesList data={singles} />
      <AddSingles data={singles} artistId={artistId} /> 

      

    </div>
  );
}
