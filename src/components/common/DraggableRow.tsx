"use client"
import styles from "@/styles/admin.module.css"
import { CheckIcon, GarbageCanIcon, PencilIcon } from "@/lib/icon";
import React, { useEffect, useRef, useState } from "react";
import { updateSong } from "@/lib/adminDataProcessing/action";
import { IconButtonRound } from "../ui/button/IconButton";

type Data = { 
    title: string, 
    subtitle: string,
    index: number | null,
    id: string,
}

type Props = { 
    data: Data, 
    onDelete: (id: string, title: string,) => void,
    disableDrag?: (isDisable: boolean) => void,
}


export default function editableRow({ data: { title, subtitle ,index, id }, onDelete, disableDrag } : Props) {

    const [isHover, setIsHover] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(title);
    const inputRef = useRef<HTMLInputElement | null>(null);

    function handleEditClick() {
        setIsEditing(true);
        if (disableDrag)
            disableDrag(true)
    }

    async function handleCheckClick() {

        try {
            await updateSong(id, inputValue);
        } catch (error) {
            console.error("Failed to update song:", error);
            return;
        }

        setIsEditing(false);
        if (disableDrag)
            disableDrag(false)
    }

    function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;
        setInputValue(value);
    }

    useEffect(() => {
        inputRef.current?.focus();
    }, [isEditing]);

    useEffect(() => {
        setInputValue(title);
    }, [title]);

    return(
        <div>
            <div className={styles.editableRow} onMouseOver={ () => setIsHover(true) } onMouseOut={ () => setIsHover(false) }>
                <div className={styles.editableSongInfoBox}>
                    <p className={styles.editableRowNumber}>{index ? index.toString().padStart(2, "0") : null}</p>

                    {!isEditing ?
                        <div>
                            <p className={styles.mainText}>{inputValue}</p>
                            <p className={styles.subText}>{subtitle}</p>
                        </div>
                    :
                        <div>
                            <input 
                                className={styles.mainText} 
                                ref={inputRef}
                                value={inputValue}
                                onChange={handleInput}
                            />
                            <p className={styles.subText}>{subtitle}</p>
                        </div>
                    }         
                </div>


                {isHover && !isEditing &&
                    <div className={styles.editButtonContainer}>
                        <IconButtonRound size={32} onClick={handleEditClick} variant="onSurface">
                            <PencilIcon size={14} />
                        </IconButtonRound>
                        <IconButtonRound size={32} onClick={() => { onDelete(id, title) }} variant="onSurface">
                            <GarbageCanIcon size={14} />
                        </IconButtonRound>
                    </div>
                }
                {isEditing &&
                    <div className={styles.editButtonContainer}>
                        <IconButtonRound size={32} onClick={handleCheckClick} variant="primary">
                            <CheckIcon size={14} color="onPrimary" />
                        </IconButtonRound>
                    </div>
                }

            </div>
            <hr />
        </div>
    )
}