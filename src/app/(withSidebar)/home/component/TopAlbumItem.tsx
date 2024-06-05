
import RoundRecImg from "@/components/ui/RoundRecImg";
import styles from "@/styles/home.module.css"

type AbumPointsData = {
    album_id: string,
    album_name: string,
    album_color: string,
    artist_name: string,
    artist_id: string,
    total_points: number,
    release_date: Date | null,
    imgUrl: string,
}

export default async function TopAlbumItem({ data }: { data: AbumPointsData }) {
    const {album_name, artist_name, total_points, imgUrl} = data;

    return (
        <div className={styles.topAlbumItem}>

            <div className={styles.topAlbumImg}>
                <div className={styles.topAlbumPoints}>
                    <p>{total_points} points</p>
                </div>
                <RoundRecImg
                    url={imgUrl} 
                    fill={true}
                    alt="placeholder"
                />
            </div>

            <div className={styles.topAlbumTitle}>
                <p>{album_name}</p>
                <p className={styles.subText}>{artist_name}</p>
            </div>
        </div>
    )
}