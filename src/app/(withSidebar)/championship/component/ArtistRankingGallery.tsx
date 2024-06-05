import styles from "@/styles/layout.module.css"
import { getProfile } from "@/utils/getPic"
import Image from "next/image"
import ArtistRankingGalleryItem from "./ArtistRankingGalleryItem"
import { getChampArtistByDates } from "@/lib/userDataProcessing/getDataByDate";

export default async function ArtistRankingGallery({ dateId }: { dateId: string }) {
    const artistRanking = await getChampArtistByDates(dateId);
    
    return (
        <div className={styles.artistRankingGallery}>
            {artistRanking.map( (item, index) => 
                <ArtistRankingGalleryItem key={item.artist_id} data={item} ranking={index + 1} />
            )}
        </div>
    )
}