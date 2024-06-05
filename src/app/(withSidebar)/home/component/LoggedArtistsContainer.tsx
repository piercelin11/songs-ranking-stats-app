import ArtistItem from "./ArtistItem";
import GridContainer from "@/components/common/GridContainer";
import { MiniGap, SmallGap } from "@/components/common/Gap";
import styles from "@/styles/home.module.css"
import {getArtistByUser} from "@/lib/userDataProcessing/getDataByUser";
import Link from "next/link";

export default async function LoggedArtistsContainer() {

    const artists = await getArtistByUser();


    return (
        <div>
            <h2>Logged Artists</h2>
            <MiniGap />

            <div className={styles.artistsContainer}>
                <GridContainer col={6} gap={0}>
                    {artists.map( item =>
                        <ArtistItem key={item.artist_id} data={item} />
                    )}
                </GridContainer>
            </div>
        </div>
    )
}