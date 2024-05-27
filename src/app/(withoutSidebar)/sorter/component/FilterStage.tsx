"use client"
import styles from "@/styles/sorter.module.css"
import Image from "next/image"
import FilterProjectBtn from "./FilterProjectBtn"
import { RoundButton } from "@/components/ui/button/Button"

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

type Props = {
    data: FilterList[],
    onFilter: (e: React.MouseEvent<HTMLButtonElement>) => void,
    onStart: (e: React.MouseEvent<HTMLButtonElement>) => void,
}


export default function FilterStage({ data, onFilter, onStart }: Props) {

    return (
        <div className={styles.filterStageContainer}>
            <div className={styles.titleContainer}>
                <h2>Personnalize The Sorter</h2>
                <p className={styles.description}>filter out albums or non-album tracks you haven't heard before starting. choose projects you haven't heard yet</p>
                <RoundButton 
                    padding="12 40"
                    onClick={onStart}
                >
                    Start Sorter
                </RoundButton>
            </div>

            <div className={styles.projectContainer}>
                {data.map( item => 
                    <FilterProjectBtn 
                        data={item} 
                        key={item.album_id || item.song_id} 
                        onClick={onFilter}
                    />
                )}
            </div>
            
        </div>

    )
}