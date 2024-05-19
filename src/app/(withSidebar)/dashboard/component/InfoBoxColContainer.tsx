
import InfoBox from "@/components/common/InfoBox";
import { CrownIcon } from "@/lib/icon";
import { getPhotoshoot } from "@/lib/pic";
import styles from "@/styles/stats.module.css"
import getDataType from "@/utils/getDataType";

type SongsStatsType = {
    song_id: number,
    song_name: string,
    ranking: number,
    previous_ranking: number | null,
    average_ranking: number,
    peak: number,
    album_id: number,
    album_name: string,
    album_color: string | null,
    track_number: number | null,
    times_in_top_10: number | null,
    total_chart_run: number | null,
    all_rankings: {ranking: number, date: Date}[],
    difference: number | null
}

type AlbumsStatsType = {
    album_id: number,
    album_name: string,
    album_color: string | null,
    count_times_in_top_100: number,
    count_times_in_top_10: number,
    count_times_in_top_1: number,
    count_songs_in_25perc: number,
    count_songs_in_50perc: number,
    total_points: number,
    total_points_raw: number
}

export default function InfoBoxColContainer({ data } : { data: [SongsStatsType[], AlbumsStatsType[]] }) {
    const [songsStats, albumsStats] = data;
    const {name: songsStatsSongName, subname: songsStatsAlbumName} = getDataType(songsStats[0]);
    const {name: albumsStatsAlbumName} = getDataType(albumsStats[0]);

    return (
        <div className={styles.infoBoxColContainer}>
            <InfoBox 
                title={songsStatsSongName}
                description="is your favorite song of all time"
                img={getPhotoshoot(songsStatsAlbumName ?? "")}
                icon={<CrownIcon size={25}/>}
            />
            <InfoBox 
                title={albumsStatsAlbumName}
                description="is your favorite album of all time"
                img={getPhotoshoot(albumsStatsAlbumName)}
                icon={<CrownIcon size={25}/>}
            />
        </div>
    );
}