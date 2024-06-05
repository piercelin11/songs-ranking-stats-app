import FlexContainer from "@/components/common/FlexContainer"
import { CrownIcon, CrownRoundIcon } from "@/lib/icon"
import styles from "@/styles/layout.module.css"
import { getProfile } from "@/utils/getPic"
import Image from "next/image"
import { ChampArtistRankingData } from "@/lib/userDataProcessing/getDataByDate"

export default function ArtistRankingGalleryItem({ data, ranking }: { data: ChampArtistRankingData, ranking: number }) {
    const {artist_id, artist_name, artist_points} = data;
    
    return (
        <div className={styles.artistRankingGalleryItem}>
            <Image 
                src={getProfile(artist_name)}
                alt="artist"
                fill
                sizes=""
            />

            <div>
                <div>
                    <div>
                        <CrownRoundIcon size={50}/>
                        <div className={styles.rankingNumber}>
                            <p>#{ranking}</p>
                        </div>
                    </div>
                    <div className={styles.points}>
                        <p>{artist_points} pts</p>
                    </div>
                </div>
            </div>
        </div>
    )
}