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
}

export default function SorterContainer( { data }: { data: SongsList[] } ) {
    const [result, setResult] = useState<null | any[]>(null);

    return (
        <div className={styles.sorterContainer}>
            {!result ? <SorterField data={data} setResult={setResult} /> : 
            
                <SorterResult data={result} />
            }
            

             
        </div>

    )
}