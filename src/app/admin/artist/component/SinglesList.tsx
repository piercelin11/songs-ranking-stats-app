import styles from "@/styles/admin.module.css"
import EditableSinglesRow from "./EditableSinglesRow";
import Image from "next/image";
import fetchSpotifyCover, { fetchAllSpotifyCover } from "@/lib/spotify/fetchSpotifyCover";

type DataProps = {
    song_name: string, 
    song_id: string, 
    artist_id: string, 
    artist_name: string, 
    release_date: Date | null,
    album_name: null
    album_id: null
}


export default async function SinglesList({ data }: { data: DataProps[] }) {

    const coverFetchedData = await fetchAllSpotifyCover(data);

    return (
        <div className={styles.editableRowContainer}>
            {coverFetchedData.map( (item, index) =>
                <div key={item.song_id} className={styles.draggableRowContainer}>
                    <EditableSinglesRow 
                        data={{
                            title: item.song_name!,
                            id: item.song_id!, 
                            subtitle: item.artist_name,
                            index: index + 1,
                            releaseDate: item.release_date,
                            artistName: item.artist_name,
                            imgURL: item.imgUrl
                        }}
                    />
                </div>
            )}
        </div>
    );
}
