"use client"

import styles from "@/styles/sorter.module.css"
import React, { useEffect, useState } from "react"
import { useAppSelector } from "@/redux/store"
import { RootState, AppDispatch } from '@/redux/store';
import { redirect } from "next/navigation"
import SorterField from "../../component/SorterField";
import { SongsList } from "@/lib/userDataProcessing/getDataByArtist"

type Img = {
    imgUrl: string,
}

export default function SortingStage( { songsList }: { songsList: (SongsList & Img)[] } ) {

    const selectedSongs = useAppSelector((state) => state.sorterReducer.selectedSongs);
    const isStart = useAppSelector((state) => state.sorterReducer.isStart);
    const result = useAppSelector((state) => state.sorterReducer.result);
    
    const showedSongList = songsList.filter( item => selectedSongs.includes(item.album_id || "") );

    useEffect(() => {
        const history = localStorage.getItem("CHAMPIONSHIP");
        if (!history && !isStart) 
            redirect(`/sorter/championship/filter`);
        if (result.length !== 0)
            redirect(`/sorter/championship/result`);
    }, [])

    return ( 
        <div className={styles.sortingStageContainer}>
            {showedSongList.length !== 0 && <SorterField data={showedSongList} type="CHAMPIONSHIP"/>}      
        </div>
    )
}