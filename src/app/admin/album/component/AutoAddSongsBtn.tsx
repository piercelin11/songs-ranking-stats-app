import { IconButtonRound } from "@/components/ui/button/IconButton";
import { addSongs } from "@/lib/adminDataProcessing/action";
import { PlusIcon } from "@/lib/icon";
import fetchSpotifyTracklist from "@/lib/spotify/fetchSpotifyTracklist";
import React from "react";


export default async function AutoAddSongsBtn({ trackList, data }: { trackList: string[], data: { album_id: string, artist_id: string } }) {

    async function autoAddSongs(formData: FormData) {
        "use server"
        await addSongs(data.album_id, data.artist_id, trackList);
    }

    return (
        <div>
            <form action={autoAddSongs}>
                <IconButtonRound 
                    size={80} 
                    variant="primary"
                    type="submit"
                >
                    <PlusIcon size={25} color="onPrimary" />
                </IconButtonRound>
            </form>
        </div>
    )
}