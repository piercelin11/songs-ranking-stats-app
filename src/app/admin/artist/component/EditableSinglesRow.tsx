"use client"
import styles from "@/styles/admin.module.css"
import { CheckIcon, GarbageCanIcon, PencilIcon } from "@/lib/icon";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import { deleteSong, updateSong } from "@/lib/adminDataProcessing/action";
import { IconButtonRound } from "@/components/ui/button/IconButton";
import FlexContainer from "@/components/common/FlexContainer";
import { alterDateFormatDash } from "@/utils/alterDateFormat";
import Image from "next/image";
import useSpotifyCover from "@/hooks/useSpotifyCover";


type Data = { 
    title: string, 
    subtitle: string,
    index: number | null,
    id: string,
    releaseDate: Date | null,
    artistName: string,
    imgURL: string,
}

type Props = { 
    data: Data, 
}



export default function EditableSinglesRow({ data: { title, subtitle ,index, id, releaseDate, artistName, imgURL } } : Props) {


    const [isHover, setIsHover] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleEditClick() {
        setIsEditing(true);
    }

    async function handleCheckClick(formData: FormData) {
        try {
            await updateSong(id, formData);
        } catch (error) {
            console.error("Failed to update song:", error);
            return; 
        }

        if (formData.get("songName") === title && formData.get("releaseDate") === alterDateFormatDash(releaseDate) ) setIsEditing(false);
    }

    async function handleDelete(id: string) {

        try {
            await deleteSong(id);
        } catch (error) {
            console.error("Failed to delete song:", error);
            return;
        }
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [isEditing]);

    useEffect(() => {
        setIsEditing(false);
    }, [title, releaseDate]); 

    const imgUrl = useSpotifyCover(artistName, title, releaseDate);



    return(
        <div className={styles.editableRow} onMouseOver={ () => setIsHover(true) } onMouseOut={ () => setIsHover(false) }>
            <FlexContainer align="center" gap={5}>
                <p className={styles.editableRowNumber}>{index ? index.toString().padStart(2, "0") : null}</p>
                <Image 
                    src={imgURL}
                    width={65}
                    height={65}
                    alt="cover"
                />
            </FlexContainer>
            
            {!isEditing ? 
                <div className={styles.editablePart}>
                    <div className={styles.editableSongInfoBox}>
                        <div>
                            <p className={styles.mainText}>{title}</p>
                            <FlexContainer align="center" gap={5}>
                                <p className={styles.subText}>{subtitle}</p>
                                <span className={styles.dot}></span>
                                <p className={styles.subText}>{releaseDate ? releaseDate.getFullYear() : ""}</p>
                            </FlexContainer>
                        </div>
                        
                    </div>

                    {isHover && 
                        <div className={styles.editButtonContainer}>
                            <IconButtonRound size={32} onClick={handleEditClick} variant="onSurface">
                                <PencilIcon size={14} />
                            </IconButtonRound>
                            <IconButtonRound size={32} onClick={() => { handleDelete(id) }} variant="onSurface">
                                <GarbageCanIcon size={14} />
                            </IconButtonRound>
                        </div>
                    }
                </div>
            : 
                <form 
                    className={styles.editablePart}
                    action={(formData) => handleCheckClick(formData)}
                >
                    <div className={styles.editableSongInfoBox}>
                        <div>
                            <input 
                                className={styles.mainText} 
                                ref={inputRef}
                                defaultValue={title}
                                name="songName"
                                autoComplete="off"
                                spellCheck={false}
                                required
                            />
                            <FlexContainer align="center" gap={5}>
                                <p className={styles.subText}>{subtitle}</p>
                                <span className={styles.dot}></span>
                                <input 
                                    className={styles.subText}
                                    name="releaseDate"
                                    defaultValue={releaseDate ? alterDateFormatDash(releaseDate) : ""}
                                    placeholder="YYYY-MM-DD"
                                    spellCheck={false}
                                    autoComplete="off"
                                    pattern="\d{4}-\d{2}-\d{2}"
                                />  
                            </FlexContainer>
                        </div>      
                    </div>

                    <div className={styles.editButtonContainer}>
                        <IconButtonRound size={32} type="submit" variant="primary">
                            <CheckIcon size={14} color="onPrimary" />
                        </IconButtonRound>
                    </div>

                </form>
            }

            
            <hr />
        </div>
    )
}