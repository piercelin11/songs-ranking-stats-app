"use client"
import ModalFromContainer from "@/components/common/ModalFromContainer";
import { useState } from "react";
import CreateArtistModal from "@/app/admin/artist/component/CreateArtistModal";
import GalleryContainer from "@/components/common/GalleryContainer";
import { createArtist } from "@/lib/adminDataProcessing/action";

type Gallery = { 
    artist_name: string,
    artist_id: string
} 

export default function ArtistGallery({ data }: { data: Gallery[] }) {

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
                isOpen={isModalOpen} 
                onClose={closeModal}
                action={createArtist}
                title="Add new artist"
            >
                <CreateArtistModal />
            </ModalFromContainer>
 
            <GalleryContainer data={data} addClick={openModal} />
        </div>
    );
}
