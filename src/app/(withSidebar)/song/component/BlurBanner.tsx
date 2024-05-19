import { getCover } from "@/utils/getPic";
import styles from "@/styles/layout.module.css";
import { gradientDarkOverlay } from "@/lib/gradient";

type Data = {
    song_name: string,
    artist_name: string,
    album_name: string,
}

export default function BlurBanner({ data } : { data: Data }) {
    const {song_name, artist_name, album_name} = data;

    return(
        <div className={styles.blurBanner}  >
            <div 
                style={{
                    backgroundImage: 
                        `${gradientDarkOverlay}, 
                        url(${getCover(artist_name, album_name, song_name)})`
                    }} >
            </div>
        </div>
    )
}