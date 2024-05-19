import { getCover } from "@/utils/getPic";
import styles from "@/styles/layout.module.css";
import Image from "next/image";
import { SpotifyIcon } from "@/lib/icon";

type Data = {
    song_name: string,
    artist_name: string,
    album_name: string,
}

export default function SongBanner({ data }: { data: Data }) {
    const {song_name, artist_name, album_name} = data;

    return (
        <div className={styles.coverBanner} >
 
            <Image
                className={styles.bannerAlbumCover} 
                src={getCover(artist_name, album_name, song_name)}
                width={250}
                height={250}
                alt="cover" 
            />

            <div className={styles.coverBannerInfo}> 
                <p>SONG</p>
                <div>
                    <h1>{song_name}</h1>
                    <div className={styles.projectInfo}>
                        <p className={styles.subText}>{artist_name}</p>
                        <p className={styles.dot}>•</p>
                        <p className={styles.subText}>{album_name}</p>
                    </div> 
                </div>

                <SpotifyIcon size={25}/>
            </div>

        </div>
    )
}