"use client"
import styles from "@/styles/sorter.module.css"
import getDataType from "@/utils/getDataType"
import Image from "next/image"
import { useState } from "react"

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
    data: FilterList,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function FilterProjectBtn( { data, onClick }: Props ) {
    const { type } = getDataType(data);
    const { imgUrl, album_name, song_name, album_id, song_id } = data;
    const [isClick, setIsClick] = useState(false);

    return (
        <button 
            className={`${styles.projectBtn} ${isClick ? styles.clicked : ""}`}
            name={type}
            value={album_id || song_id}
            onClick={(e) => {
                onClick(e);
                setIsClick( prev => !prev);
            }}
        >
            <Image
                src={imgUrl}
                width={60}
                height={60}
                alt="cover"
            />
            <div>
                <p className={styles.mainText}>{album_name || song_name}</p>
                <p className={styles.subText}>{type==="album" ? "Album" : "Non-album track"}</p>
            </div>
        </button>
    )
}