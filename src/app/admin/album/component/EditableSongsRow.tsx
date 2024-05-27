"use client"
import styles from "@/styles/admin.module.css"
import { CheckIcon, GarbageCanIcon, PencilIcon } from "@/lib/icon";
import React, { useEffect, useRef, useState } from "react";
import { updateSong } from "@/lib/adminDataProcessing/action";
import { IconButtonRound } from "@/components/ui/button/IconButton";

type Data = { 
    title: string, 
    subtitle: string,
    index: number | null,
    id: string,
}

type Props = { 
    data: Data, 
    onDelete: (id: string, title: string,) => void,
    disableDrag: (isDisable: boolean) => void,
}


export default function EditableSongsRow({ data: { title, subtitle ,index, id }, onDelete, disableDrag } : Props) {

    const [isHover, setIsHover] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleEditClick() {
        setIsEditing(true);
        disableDrag(true)    
    }

    async function handleCheckClick(formData: FormData) {
        try {
            await updateSong(id, formData);
        } catch (error) {
            console.error("Failed to update song:", error);
            return;
        }

        disableDrag(false);
        if (formData.get("songName") === title) setIsEditing(false);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [isEditing]);

    useEffect(() => {
        setIsEditing(false);
    }, [title]);

    return(
        <div className={styles.editableRow} onMouseOver={ () => setIsHover(true) } onMouseOut={ () => setIsHover(false) }>
            <p className={styles.editableRowNumber}>{index ? index.toString().padStart(2, "0") : null}</p>
            {!isEditing ? 
                <div className={styles.editablePart}>
                    <div className={styles.editableSongInfoBox}>
                        

                        <div>
                            <p className={styles.mainText}>{title}</p>
                            <p className={styles.subText}>{subtitle}</p>
                        </div>    
                    </div>

 
                    {isHover &&
                        <div className={styles.editButtonContainer}>
                            <IconButtonRound size={32} onClick={handleEditClick} variant="onSurface">
                                <PencilIcon size={14} />
                            </IconButtonRound>
                            <IconButtonRound size={32} onClick={() => { onDelete(id, title) }} variant="onSurface">
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
                            <p className={styles.subText}>{subtitle}</p>
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