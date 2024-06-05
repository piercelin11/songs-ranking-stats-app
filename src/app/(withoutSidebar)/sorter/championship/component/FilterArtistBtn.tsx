"use client"
import styles from "@/styles/sorter.module.css"
import getDataType from "@/utils/getDataType"
import { getProfile } from "@/utils/getPic"
import Image from "next/image"
import { useState } from "react"
import { FilterArtistList } from "../filter/page"

type Props = {
    data: FilterArtistList,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function FilterProjectBtn( { data, onClick }: Props ) {
    const { type } = getDataType(data);
    const { artist_id, artist_name } = data;
    const [isClick, setIsClick] = useState(false);

    return (
        <button 
            className={`${styles.artistBtn} ${isClick ? styles.clicked : ""}`}
            name={type}
            value={artist_id}
            onClick={(e) => {
                onClick(e);
                setIsClick( prev => !prev);
            }}
        >
            <Image
                src={getProfile(artist_name)}
                priority
                alt="cover"
                fill
                sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, 100%"
            />
        </button>
    )
}