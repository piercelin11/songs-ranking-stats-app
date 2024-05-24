"use client"
import { PlusIcon } from "@/lib/icon";

import { useState } from "react";
import AddSinglesForm from "./AddSinglesForm";
import ModalContainer from "@/components/common/ModalContainer";
import { addSingles, addSongs } from "@/lib/adminDataProcessing/action";
import { IconButtonRound } from "@/components/ui/button/IconButton";

type SongsData = {
    song_id: string,
    song_name: string,
    artist_id: string,
    artist_name: string,
}

export default function AddSingles({ data, artistId }: { data: SongsData[], artistId: string}) {

    const songsArray = data.map( item => item.song_name );
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    async function handleSubmit(formData: FormData) {
        const text = formData.get("song") as string;
        const songs = text.split('\n').filter(songs => songs.trim() !== "").map( item => item.trim() );

        await addSingles(artistId, songs);
    }


    return (
        <div>
            <ModalContainer
                isOpen={isModalOpen}
                onClose={closeModal}
                title="Add Songs"
            >
                <AddSinglesForm onSubmit={(formData) => {handleSubmit(formData); closeModal();}}/>
            </ModalContainer>
            
            <IconButtonRound size={80} onClick={openModal} variant="onBackground">
                <PlusIcon size={25} />
            </IconButtonRound>
        </div>
    );
}
