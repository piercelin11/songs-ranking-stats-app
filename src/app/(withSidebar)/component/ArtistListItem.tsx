
import styles from "@/styles/sidebar.module.css"
import RoundRecImg from "@/components/ui/RoundRecImg";
import { getProfile } from "@/utils/getPic";
import RoundImg from "@/components/ui/RoundImg";

type ArtistData = {
    artist_id: string,
    artist_name: string,
}


export default async function ArtistListItem({ data: { artist_id, artist_name } }: { data: ArtistData }) {


    return (
        <div className={styles.libraryItem}>
            <RoundImg 
                url={getProfile(artist_name)}
                size={60}
                alt="cover"
                priority
            />
            
            <div>
                <p className={styles.mainText}>{artist_name}</p>
                <p className={styles.subText}>Artist</p>
            </div>
        </div>
    )
}