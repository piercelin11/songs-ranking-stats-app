"use client"

import styles from "@/styles/sorter.module.css"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "@/redux/store"
import { RootState, AppDispatch } from '@/redux/store';
import { redirect } from "next/navigation"
import SorterField from "./SorterField"
import { SongsList } from "@/lib/userDataProcessing/getDataByArtist"

type Img = {
    imgUrl: string,
}

export default function SortingStage( { songsList }: { songsList: (SongsList & Img)[] } ) {
    const artist = songsList[0]?.artist_name;
    const artistId = songsList[0]?.artist_id;

    const selectedSongs = useAppSelector((state) => state.sorterReducer.selectedSongs);
    const isStart = useAppSelector((state) => state.sorterReducer.isStart);
    const result = useAppSelector((state) => state.sorterReducer.result);
    
    const showedSongList = songsList.filter( item => selectedSongs.includes(item.album_id || "") || selectedSongs.includes(item.song_id) );

    useEffect(() => {
        const history = localStorage.getItem(artist);
        if (!history && !isStart) 
            redirect(`/sorter/${artistId}/filter`);
        if (result.length !== 0)
            redirect(`/sorter/${artistId}/result`);
    }, [])

    return ( 
        <div className={styles.sortingStageContainer}>
            {showedSongList.length !== 0 && <SorterField data={showedSongList} />}      
        </div>
    )
}