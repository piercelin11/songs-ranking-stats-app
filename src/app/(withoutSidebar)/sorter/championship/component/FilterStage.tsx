"use client"
import styles from "@/styles/sorter.module.css"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { selectSongs } from "@/redux/features/sorterSlice"
import { AppDispatch } from '@/redux/store';
import FilterProjectBtn from "./FilterArtistBtn"
import { RoundButton } from "@/components/ui/button/Button"
import Link from "next/link"
import { FilterArtistList } from "../filter/page"



export default function FilterRootComponent( { filterList }: { filterList: FilterArtistList[] } ) {

    const dispatch = useDispatch<AppDispatch>();
    const idArray = filterList.map( item => item.artist_id );

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
        const selectedArtists = filterList.filter( item => !selectedId.includes(item.artist_id) );
        const selectedAlbumId = selectedArtists.map( item => item.albums.filter( (_, index) => index < 2 ).map( item => item.album_id ) );

        dispatch(selectSongs(selectedAlbumId.flat()));
    }

    return (
        <div className={styles.filterStageContainer}>
            <div className={styles.titleContainer}>
                <h2>Personnalize The Sorter</h2>
                <p className={styles.description}>pick artists you wanted to sort. </p>
                <Link href={`/sorter/championship`} replace >
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
                        key={item.artist_id} 
                        onClick={handleFilter}
                    />
                )}
            </div>
            
        </div>
    )
}