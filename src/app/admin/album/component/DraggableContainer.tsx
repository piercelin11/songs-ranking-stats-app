"use client"
import styles from "@/styles/admin.module.css"
import EditableSongsRow from "./EditableSongsRow";
import { useRef, useState } from "react";
import { deleteSong, orderSongs } from "@/lib/adminDataProcessing/action";
import { useParams } from "next/navigation";

type DataProps = {
    song_name: string, 
    song_id: string, 
    artist_name: string, 
    track_number: number | null
}


export default function DraggableContainer({ data }: { data: DataProps[] }) {

    const params = useParams<{albumId: string}>();

    const [disableDrag, setDisableDrag] = useState<boolean>(false);

    const songsArray = data.map( item => item.song_name );

    const [style, setStyle] = useState<"hilightTop" | "hilightBottom" | null>(null);

    const dragOverItem = useRef<"top" | "bottom">();
    const dragItem = useRef<number>(NaN);
    const dragEnterItem = useRef<number>(NaN);

    function onDragOver(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();

        const boundingRect = e.currentTarget.getBoundingClientRect();
        const offsetY = e.clientY - boundingRect.top;
        const targetHeight = boundingRect.height;

        if (offsetY < targetHeight / 2) {
            dragOverItem.current = "top";
            setStyle("hilightTop");
        } else {
            dragOverItem.current = "bottom";
            setStyle("hilightBottom");
        }
    }

    async function handleSort() {
        
        const _songsArray = [...songsArray];
        const dragSongs = _songsArray.splice(dragItem.current, 1)[0];

        if (dragEnterItem.current < dragItem.current) {
            if (dragOverItem.current === "top") {
                _songsArray.splice(dragEnterItem.current, 0, dragSongs);
            } else {
                _songsArray.splice(dragEnterItem.current + 1, 0, dragSongs);
            }
        } else {
            if (dragOverItem.current === "top") {
                _songsArray.splice(dragEnterItem.current - 1, 0, dragSongs);
            } else {
                _songsArray.splice(dragEnterItem.current, 0, dragSongs);
            }
        }

        dragEnterItem.current = NaN;
        dragEnterItem.current = NaN;

        try {
            await orderSongs(params.albumId, _songsArray, songsArray);
        } catch (error) {
            console.error("Failed to order songs:", error);
            return;
        }
    }

    async function handleDelete(id: string, title: string) {

        const _songsArray = songsArray.filter( item => item !== title );

        try { 
            await deleteSong(id);
            try {
                if (title !== songsArray[songsArray.length - 1]) {
                    await orderSongs(params.albumId, _songsArray, songsArray);
                } else {
                    return;
                }
            } catch (error) {
                console.error("Failed to order songs:", error);
                return;
            }
        } catch (error) {
            console.error("Failed to delete song:", error);
            return;
        }
    }


    return (
        <div className={styles.editableRowContainer}>
            {data.map( (item, index) =>
                <div 
                    key={index}
                    className={`${styles.draggableRowContainer} ${index !== dragEnterItem.current ? "" : style === "hilightTop" ? styles.hilightTop : styles.hilightBottom}`}
                    onDragStart={() => {dragItem.current = index}}
                    onDragEnter={() => {dragEnterItem.current = index}}
                    onDragOver={onDragOver}
                    onDragEnd={handleSort}
                    draggable={disableDrag ? false : true}
                >
                    <EditableSongsRow 
                        data={{
                            title: item.song_name,
                            id: item.song_id, 
                            subtitle: item.artist_name,
                            index: item.track_number,
                        }}
                        onDelete={handleDelete}
                        disableDrag={setDisableDrag}
                    />
                </div>
            )}
        </div>
    );
}
