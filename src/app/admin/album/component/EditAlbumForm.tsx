"use client"
import styles from "@/styles/form.module.css"
import { alterDateFormat, alterDateFormatDash } from "@/utils/alterDateFormat";
import React, { useEffect, useRef, useState } from "react";
import ColorSelector from "./ColorSelector";
import useDominantColor from "@/hooks/useDominantColor";
import { getCover } from "@/utils/getPic";

type albumInfo = {
    album_name: string,
    album_id: string,
    artist_id: string,
    artist_name: string,
    release_date: Date | null,
}

type Props = {
    data: albumInfo
}


export default function EditAlbumForm({ data }: Props) {

    const inputRef = useRef<HTMLInputElement | null>(null);

    const { artist_name, album_name, release_date } = data;

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div>
            <div className={styles.editAlbumForm}>
                <p className={styles.subtext}>{artist_name}</p>
                <input 
                    className={styles.editAlbumInput} 
                    type="text"
                    defaultValue={album_name}
                    placeholder="Enter album name"
                    name="albumName"
                    autoComplete="off"
                    ref={inputRef}
                    required
                /> 
                <input 
                    className={styles.editDateInput} 
                    type="text"
                    name="releaseDate"
                    defaultValue={release_date ? alterDateFormatDash(release_date) : ""}
                    placeholder="YYYY-MM-DD"
                    spellCheck={false}
                    autoComplete="off"
                    pattern="\d{4}-\d{2}-\d{2}"
                    required
                />
            </div>
        </div>
    );
}
