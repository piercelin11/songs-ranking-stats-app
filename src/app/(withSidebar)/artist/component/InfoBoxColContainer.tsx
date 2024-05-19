
import InfoBox from "@/components/common/InfoBox";
import { RoundArrowDownIcon, RoundArrowUpIcon } from "@/lib/icon";
import { getPhotoshoot } from "@/utils/getPic";
import styles from "@/styles/stats.module.css"

type AlbumsStatsType = {
    album_id: number,
    album_name: string,
    album_color: string | null,
    artist_name: string,
    count_songs_in_25perc: number,
    count_songs_in_50perc: number,
    total_points: number,
    previous_total_points: number | null,
    total_points_raw: number
}

export default function InfoBoxColContainer({ data } : { data: AlbumsStatsType[] }) {
    const infoboxData = data.map( item => ({
        ...item,
        difference: item.previous_total_points ? item.total_points - item.previous_total_points : NaN,
    })).filter( item => !isNaN(item.difference) );

    const sortedData = infoboxData.sort( (a, b) => b.difference - a.difference );
    
    const biggestGainer = sortedData.filter( item => item.difference > 0 )?.[0] ?? null;
    const biggestLoser = sortedData.filter( item => item.difference < 0 )?.[-1] ?? null;
 
    return (
        <div className={styles.infoBoxColContainer}>
            <InfoBox 
                title={biggestGainer?.album_name}
                description="is the biggest gainer in points"
                img={getPhotoshoot(biggestGainer?.artist_name ,biggestGainer?.album_name)}
                icon={<RoundArrowUpIcon size={45}/>}
                stats={biggestGainer?.difference}
            />
            <InfoBox 
                title={biggestLoser?.album_name}
                description="is biggest loder in points"
                img={getPhotoshoot(biggestLoser?.artist_name ,biggestLoser?.album_name)}
                icon={<RoundArrowDownIcon size={45}/>}
                stats={biggestLoser?.difference}
            />
        </div>
    );
}