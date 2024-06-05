
import DoubleBarChart from "@/components/chart/DoubleBarChart"
import { getAvgAlbumsRanking } from "@/lib/userDataProcessing/getDataByArtist";
import { getAlbumsByDates } from "@/lib/userDataProcessing/getDataByDate";
import toAcronym from "@/utils/toAcronym";
import styles from "@/styles/stats.module.css"

type AlbumsStats = {
    album_id: string,
    album_name: string,
    album_color: string | null,
    total_points: number, 
    total_points_raw: number
}

export async function AveragePointsBarChart({ artistId }: { artistId: string }) {
    
    const avgAlbumsRanking = await getAvgAlbumsRanking(artistId);

    const noSingleRanking = avgAlbumsRanking.filter( item => item.album_name !== "Single" );

    const chartData = {
        labels: noSingleRanking.map( item => toAcronym(item.album_name) || "" ),
        mainData: noSingleRanking.map( item => item.total_points ),
        subData: noSingleRanking.map( item => item.total_points_raw ),
        color: noSingleRanking.map( item => item.album_color ),
    }

    return (
        
        <div className={styles.barChartBox}>
            <DoubleBarChart data={chartData} />
        </div>
    );
}


export async function DatePointsBarChart({ artistId, dateId }: { artistId: string, dateId: string }) {
    
    const albumsRanking = await getAlbumsByDates(artistId, dateId);

    const noSingleRanking = albumsRanking.filter( item => item.album_name !== "Single" );

    const chartData = {
        labels: noSingleRanking.map( item => toAcronym(item.album_name) || "" ),
        mainData: noSingleRanking.map( item => item.total_points ),
        subData: noSingleRanking.map( item => item.total_points_raw ),
        color: noSingleRanking.map( item => item.album_color ),
    }

    return (
        <div className={styles.barChartBox}>
            <DoubleBarChart data={chartData} />
        </div>
    );
}