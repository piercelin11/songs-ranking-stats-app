"use client"
import styles from "@/styles/button.module.css"
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react"

export default function SwitchButton({ latestDateId }: { latestDateId: string | null }) {
    const params = useParams(); 
    
    const [selected, setSelected] = useState<string>("");
    const [style, setStyle] = useState<string>("");


    useEffect(() => {
        if (params.dateId) {
            setSelected("right");
            setStyle("atRight");
        } else {
            setSelected("left");
            setStyle("atLeft");
        }
    }, [params])

    return (
        <div className={styles.switchBtnBox}>
            <div 
                id={styles.btn}
                className={styles[style]}
            >

            </div>

            <Link href={`/artist/${params.artistId}`}>
                <button 
                    className={`${styles.toggleBtn} ${selected === "left" ? styles.selected : ""}`}
                    value="left"
                >
                    Overall
                </button>
            </Link>

            <Link href={`/artist/${params.artistId}/${latestDateId}`}>
                <button 
                    className={`${styles.toggleBtn} ${selected === "right" ? styles.selected : ""}`}
                    value="right"
                >
                    History
                </button>
            </Link>
        </div>
    )
}