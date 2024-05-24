"use client"
import ModalContainer from "@/components/common/ModalContainer";
import { useState } from "react";
import CreateArtistModal from "@/app/admin/artist/component/CreateArtistModal";
import GalleryContainer from "@/components/common/GalleryContainer";

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
            <ModalContainer isOpen={isModalOpen} onClose={closeModal}>
                <CreateArtistModal />
            </ModalContainer>

            <GalleryContainer data={data} addClick={openModal} />
        </div>
    );
}
