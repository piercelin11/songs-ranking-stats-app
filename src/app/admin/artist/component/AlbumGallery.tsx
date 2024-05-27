"use client"
import ModalFromContainer from "@/components/common/ModalFromContainer";
import { useState } from "react";
import CreateArtistModal from "@/app/admin/artist/component/CreateArtistModal";
import GalleryContainer from "@/components/common/GalleryContainer";
import CreateAlbumModal from "./CreateAlbumModal";
import { SmallGap } from "@/components/common/Gap";
import { createAlbum } from "@/lib/adminDataProcessing/action";
import { useParams } from "next/navigation";

type Gallery = { 
    album_name: string | null,
    album_id: string| null,
    artist_id: string,
    imgUrl: string,
} 

export default function AlbumGallery({ data }: { data: Gallery[] }) {
    const params = useParams();
    const artistId = params.artistId as string;

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
   
    return ( 
        <div>
            <ModalFromContainer 
                title="Album Details" 
                description="create an album for this artist"
                isOpen={isModalOpen} 
                onClose={closeModal} 
                action={(formData: FormData) => createAlbum(formData, artistId)}
            > 
                <CreateAlbumModal /> 
            </ModalFromContainer>

            <GalleryContainer 
                title="Albums and EPS"
                data={data} 
                addClick={openModal}
            />
        </div>
    );
}
