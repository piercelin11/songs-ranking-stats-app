"use client"
import styles from "@/styles/admin.module.css"
import DraggableRow from "@/components/common/DraggableRow";
import { useEffect, useRef, useState } from "react";
import { deleteSong, orderSongs } from "@/lib/adminDataProcessing/action";
import { useParams } from "next/navigation";
import EditableSinglesRow from "./EditableSinglesRow";

type DataProps = {
    song_name: string, 
    song_id: string, 
    artist_name: string, 
    release_date: Date | null,
}


export default function SinglesList({ data }: { data: DataProps[] }) {

    async function handleDelete(id: string, title: string) {

        try {
            await deleteSong(id);
        } catch (error) {
            console.error("Failed to delete song:", error);
            return;
        }
    }

    return (
        <div className={styles.editableRowContainer}>
            {data.map( (item, index) =>
                <div key={item.song_id} className={styles.draggableRowContainer}>
                    <EditableSinglesRow 
                        data={{
                            title: item.song_name,
                            id: item.song_id, 
                            subtitle: item.artist_name,
                            index: index + 1,
                            releaseDate: item.release_date,
                            artistName: item.artist_name
                        }}
                        onDelete={handleDelete}
                    />
                </div>
            )}
        </div>
    );
}
