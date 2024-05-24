import GalleryContainer from "@/components/common/GalleryContainer";
import { MediumGap, SmallGap } from "@/components/common/Gap";
import { fetchArtistsAlbums, fetchArtistsSingles } from "@/lib/adminDataProcessing/prismaFetching";
import { prisma } from "@/lib/prisma";
import AlbumGallery from "../component/AlbumGallery";
import SinglesList from "../component/SinglesList";
import AddSingles from "../component/AddSingles";


export default async function AdminArtistPage({ params: { artistId } }: { params: { artistId: string } }) {

  const albums = await fetchArtistsAlbums(artistId, 14);
  const singles = await fetchArtistsSingles(artistId);

  return (
    <div>

      
      <AlbumGallery data={albums} />

      <MediumGap />

      <h2>Non-album tracks</h2>
      <SmallGap />
      <SinglesList data={singles} />
      <AddSingles data={singles} artistId={artistId} /> 

      

    </div>
  );
}
