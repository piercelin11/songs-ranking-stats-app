"use client"

import styles from "@/styles/sorter.module.css"
import SortingStage from "./SortingStage"
import SorterHeader from "./SorterHeader"
import FilterStage from "./FilterStage"
import React, { useEffect, useState } from "react"
import { RoundButton } from "@/components/ui/button/Button"

type SongsList = {
    song_id: string,
    song_name: string,
    album_id: string | null,
    album_name: string | null,
    track_numer: number | null,
    artist_id: string,
    artist_name: string,
    imgUrl: string,
}

type FilterList = {
    song_id?: string,
    song_name?: string,
    album_id: string | null,
    album_name: string | null,
    release_date: Date | null,
    artist_id: string,
    artist_name: string,
    imgUrl: string,
}

export default function SorterRootComponent( { songsList, filterList }: { songsList: SongsList[], filterList: FilterList[] } ) {
    const artist = songsList[0]?.artist_name;
    
    const [isStart, setIsStart] = useState<boolean>(false);
    const [showedSongList, setShowedSongList] = useState<SongsList[]>(songsList);
    const [percentage, setPercentage] = useState(0);

    function handleFilter(e: React.MouseEvent<HTMLButtonElement>) {
        const value = (e.currentTarget as HTMLButtonElement).value;
        const findProjects = showedSongList.find( item => item.album_id === value || item.song_id === value);

        if (findProjects) {
            const filterSongsList = showedSongList.filter( item =>  item.album_id !== value && item.song_id !== value);
            setShowedSongList(filterSongsList);
        } else {
            const findRedo = songsList.filter( item => item.album_id === value || item.song_id === value);
            const redoSongsList = [...showedSongList, ...findRedo];
            setShowedSongList(redoSongsList);
        }
    }

    function handleStart(e: React.MouseEvent<HTMLButtonElement>) {
        setIsStart(true);
    } 

    useEffect(() => {
        const history = localStorage.getItem(artist);
        if (history) setIsStart(true);
    }, [])

    return (
        <div className={styles.sorterRootContainer}>
            <SorterHeader artistName={songsList[0].artist_name} percentage={percentage} />

            {!isStart ?
                <FilterStage data={filterList} onFilter={handleFilter} onStart={handleStart} />
            :
                <SortingStage 
                    data = {showedSongList} 
                    setPercentage = { setPercentage }
                    setIsStart = { setIsStart }
                />
            }
        </div>

    )
}