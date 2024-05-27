
import styles from "@/styles/layout.module.css";
import { gradientDarkOverlay } from "@/lib/gradient";
import fetchSpotifyCover from "@/lib/spotify/fetchSpotifyCover";

type Data = {
    song_name: string,
    artist_name: string,
    album_name: string | null,
    release_date: Date | null
}

export default async function BlurBanner({ data } : { data: Data }) {
    const {song_name, artist_name, album_name, release_date} = data;
    const imgUrl = await fetchSpotifyCover(artist_name, album_name || song_name, release_date);

    return(
        <div className={styles.blurBanner}>
            <div 
                style={{
                    backgroundImage: 
                        `${gradientDarkOverlay}, 
                        url(${imgUrl})`
                    }} >
            </div>
        </div>
    )
}