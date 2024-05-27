"use client"
import { PlusIcon } from "@/lib/icon";

import { useState } from "react";
import AddSongsForm from "./AddSongsForm";
import ModalFromContainer from "@/components/common/ModalFromContainer";
import DraggableContainer from "./DraggableContainer";
import { addSongs } from "@/lib/adminDataProcessing/action";
import { IconButtonRound } from "@/components/ui/button/IconButton";

type SongsData = {
    song_id: string,
    song_name: string,
    album_id: string,
    album_name: string,
    album_color: string | null,
    artist_id: string,
    artist_name: string,
    track_number: number | null,
}

type AlbumInfo = {
    album_id: string,
    album_name: string,
    artist_id: string,
    artist_name: string,
}

export default function AddSongs({ data, albumInfo }: { data: SongsData[], albumInfo: AlbumInfo}) {

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

        await addSongs(albumInfo.album_id, albumInfo.artist_id, [...songsArray, ...songs]);
        setIsModalOpen(false);
    }


    return (
        <div>
            <ModalFromContainer
                isOpen={isModalOpen}
                onClose={closeModal}
                action={handleSubmit}
                title="Add Songs"
            >
                <AddSongsForm />
            </ModalFromContainer>

            <IconButtonRound size={80} onClick={openModal} variant="onBackground">
                <PlusIcon size={25} />
            </IconButtonRound>
        </div>
    );
}
