"use client"

import fetchSpotifyCover from "@/lib/spotify/fetchSpotifyCover";
import { useEffect, useState } from "react";

export default function useSpotifyCover(artistName: string, albumName: string | null, releaseDate: Date | null ) {
    const [imgUrl, setImgUrl] = useState("/pic/not-found.jpg");

    useEffect(() => {
        async function fetchCover() {
            const url = await fetchSpotifyCover(artistName, albumName, releaseDate)
            setImgUrl(url);
        }

        fetchCover();
    }, []);

    return imgUrl;

}
