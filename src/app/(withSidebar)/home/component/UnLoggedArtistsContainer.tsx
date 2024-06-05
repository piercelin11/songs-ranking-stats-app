import ArtistItem from "./ArtistItem";
import GridContainer from "@/components/common/GridContainer";
import { MiniGap, SmallGap } from "@/components/common/Gap";
import styles from "@/styles/home.module.css"
import { fetchUnLogArtistByUser } from "@/lib/userDataProcessing/prismaFetching";
import Link from "next/link";

export default async function UnLoggedArtistsContainer() {

    const unLoggedArtists = await fetchUnLogArtistByUser();

    return (
        <div>
            <h2>You may also like</h2>
            <MiniGap />

            <div className={styles.artistsContainer}>
                <GridContainer col={6} gap={0}>
                    {unLoggedArtists.map( item => 
                        <ArtistItem data={item} key={item.artist_id} />
                    )}
                </GridContainer>
            </div>
        </div>
    )
}