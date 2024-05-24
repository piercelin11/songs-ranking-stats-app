"use client"
import ModalContainer from "@/components/common/ModalContainer";
import { useState } from "react";
import CreateArtistModal from "@/app/admin/artist/component/CreateArtistModal";
import GalleryContainer from "@/components/common/GalleryContainer";
import CreateAlbumModal from "./CreateAlbumModal";
import { SmallGap } from "@/components/common/Gap";

type Gallery = { 
    album_name: string,
    album_id: string,
    artist_id: string,
} 

export default function AlbumGallery({ data }: { data: Gallery[] }) {

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
  
    return (
        <div>
            <ModalContainer title="Album Details" isOpen={isModalOpen} onClose={closeModal} isBig={true} >
                <CreateAlbumModal />
                <SmallGap />
            </ModalContainer>

            <GalleryContainer 
                title="Albums and EPS"
                data={data} 
                addClick={openModal}
            />
        </div>
    );
}
