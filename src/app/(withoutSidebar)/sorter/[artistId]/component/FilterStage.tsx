"use client"
import styles from "@/styles/sorter.module.css"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { selectSongs } from "@/redux/features/sorterSlice"
import { AppDispatch } from '@/redux/store';
import FilterProjectBtn from "./FilterProjectBtn"
import { RoundButton } from "@/components/ui/button/Button"
import Link from "next/link"
import { FilterList } from "@/lib/userDataProcessing/getDataByArtist"


type Img = {
    imgUrl: string,
}

export default function FilterRootComponent( { filterList }: { filterList: (FilterList & Img)[] } ) {

    const dispatch = useDispatch<AppDispatch>();
    const idArray = filterList.map( item => item.song_id || item.album_id! );

    const [selectedId, setSelectedId] = useState<string[]>(idArray);

    function handleFilter(e: React.MouseEvent<HTMLButtonElement>) {
        const value = (e.currentTarget as HTMLButtonElement).value;
        const isSelected = selectedId.includes(value);

        if (!isSelected) {
            setSelectedId(prev => [...prev, value]);
        } else {
            const filtered = selectedId.filter( item => item !== value );
            setSelectedId(filtered);
        }
    }

    function handleStart() {
        dispatch(selectSongs(selectedId));
    }

    return (
        <div className={styles.filterStageContainer}>
            <div className={styles.titleContainer}>
                <h2>Personnalize The Sorter</h2>
                <p className={styles.description}>filter out albums or non-album tracks you haven't heard before starting. choose projects you haven't heard yet</p>
                <Link href={`/sorter/${filterList[0]?.artist_id}`} replace >
                    <RoundButton 
                        padding="12 40"
                        onClick={handleStart}
                    >
                        Start Sorter
                    </RoundButton>
                </Link>

            </div>

            <div className={styles.projectContainer}>
                {filterList.map( item => 
                    <FilterProjectBtn 
                        data={item} 
                        key={item.album_id || item.song_id} 
                        onClick={handleFilter}
                    />
                )}
            </div>
            
        </div>
    )
}