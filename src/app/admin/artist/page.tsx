import GalleryContainer from "@/components/common/GalleryContainer";
import PageHeader from "@/components/common/PageHeader";
import RoundImg from "@/components/ui/RoundImg";
import { fetchAllArtists } from "@/lib/adminDataProcessing/prismaFetching";
import { prisma } from "@/lib/prisma";
import styes from "@/styles/layout.module.css"
import { getProfile } from "@/utils/getPic";
import ArtistGallery from "./component/ArtistGallery";

export default async function AdminArtistsPage() {

    const artists = await fetchAllArtists();
  

    return (
        <div className={styes.content}>

            <PageHeader>
                <h1>All Artist</h1>
            </PageHeader>
            
            <ArtistGallery data={artists}/>

        </div>
    );
}
