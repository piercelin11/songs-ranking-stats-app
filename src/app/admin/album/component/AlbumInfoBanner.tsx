"use client"

import { CheckIcon, PencilIcon } from "@/lib/icon";
import styles from "@/styles/admin.module.css"
import { alterDateFormatDash, alterDateFormatToLong } from "@/utils/alterDateFormat";
import { getCover } from "@/utils/getPic";
import Image from "next/image";
import EditAlbumForm from "./EditAlbumForm";
import { useEffect, useState } from "react";
import { updateAlbum } from "@/lib/adminDataProcessing/action";
import { IconButtonRound } from "@/components/ui/button/IconButton";
import useDominantColor from "@/hooks/useDominantColor";
import ColorSelector from "./ColorSelector";
 
type albumInfo = {
    album_name: string,
    album_id: string,
    artist_id: string,
    artist_name: string,
    release_date: Date | null,
    album_color: string | null,
}


export default function AlbumInfoBanner({ data }: { data: albumInfo }) {

    const [ color ] = useDominantColor(getCover(data.artist_name, data.album_name));
    const [ isEditing, setIsEditing ] = useState(false);
    const { artist_name, album_name, release_date, album_id, album_color } = data;

    async function handleCheck(formData: FormData) {
        try {
            await updateAlbum(album_id, formData);
        } catch (err) {
            console.error("Failed to update album:", err);
            return;
        }
    }

    useEffect(() => {
        setIsEditing(false);
    }, [data]);

    return (
        <div className={styles.banner} >
            <Image 
                src={getCover(artist_name, album_name)}
                height={220}
                width={220}
                alt="cover"
            />

            {!isEditing ?
                <div className={styles.albumInfoBox}>
                    <div>
                        <IconButtonRound 
                            size={35}
                            onClick={() => setIsEditing(true)}
                            variant="onSurface"
                        >
                            <PencilIcon size={15}/>
                        </IconButtonRound>
                    </div>
                    
                    <div>
                        <p className={styles.subtext}>{artist_name}</p>
                        <h1 className={styles.title}>{album_name}</h1>

                        <p className={styles.description}>{release_date ? alterDateFormatToLong(release_date) : "No release date yet"}</p>
                        
                        <div 
                            className={styles.colorLabel}
                            style={{backgroundColor: `${data.album_color}`}}
                        ></div>
                    </div>
                    
                </div>
            : 
                <form 
                    className={styles.albumInfoBox}
                    action={(formData: FormData) => handleCheck(formData)}
                >
                    <div>
                        <IconButtonRound 
                            size={35}
                            variant="primary"
                            type="submit"
                        >
                            <CheckIcon size={15} color="onPrimary" />
                        </IconButtonRound>
                    </div>
                    
                    <div>
                        <EditAlbumForm data={data} /> 
                        <ColorSelector colorArray={color?.colorPalette ?? null} originalColor = {album_color}/>
                    </div>
                </form>
            }
        </div>
    );
}
