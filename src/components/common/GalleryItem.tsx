import RoundImg from "@/components/ui/RoundImg";
import styles from "@/styles/layout.module.css"
import { getProfile } from "@/utils/getPic";
import RoundRecImg from "../ui/RoundRecImg";
import getDataType from "@/utils/getDataType";
 
type DataType = { 
    artist_name: string,
    artist_id: string,
    album_name: string,
    album_id: string,
    song_name?: string,
    song_id?: string,
    release_date: Date | null,
    imgUrl: string,
}

export default function GalleryItem({ data }: { data: DataType }) {
    const { imgUrl } = data;
    
    const { type, id, title, subtitle } = getDataType(data);

    if (type === "artist")
        return (
            <div className={styles.galleryItem}>
                <div className={styles.imgContainer}>
                    <RoundImg 
                        url={getProfile(title)}
                        alt={title}
                        fill={true}
                        priority={true}
                    />
                </div>
                <p className={styles.mainText}>{title}</p>
                <p className={styles.subText}>{subtitle}</p>
            </div>
        );
    
    if (type === "album")
        return (
            <div className={styles.galleryItem}>
                <div className={styles.imgContainer}>
                    <RoundRecImg 
                        url={imgUrl}
                        alt={title}
                        fill={true}
                        priority={true}
                    />
                </div>
                <p className={styles.mainText}>{title}</p>
                <p className={styles.subText}>{subtitle}</p>
            </div>
        );
    else return <p>Missing type property</p>
    
}
