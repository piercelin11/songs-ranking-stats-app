"use client"
import { useState } from "react"
import SorterField from "./SorterField"
import styles from "@/styles/sorter.module.css"
import CardRankingRow from "@/components/common/CardRankingRow"
import SorterResult from "./SorterResult"

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

type Props = { 
    data: SongsList[], 
    setPercentage: (percentage: number) => void,
    setIsStart: (isStart: boolean) => void,
}

export default function SortingStage( { data, setPercentage, setIsStart }: Props ) {
    const [result, setResult] = useState<null | any[]>(null);

    return (
        <div className={styles.sortingStageContainer}>
            {!result ? <SorterField data={data} setResult={setResult} setPercentage={setPercentage} setIsStart={setIsStart} /> : 
             
                <SorterResult data={result} />
            }            
        </div>

    )
}