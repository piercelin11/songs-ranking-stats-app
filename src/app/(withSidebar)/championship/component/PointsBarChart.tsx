
import DoubleBarChart from "@/components/chart/DoubleBarChart"
import { getAvgAlbumsRanking } from "@/lib/userDataProcessing/getDataByArtist";
import { getAlbumsByDates, getChampAlbumsByDates } from "@/lib/userDataProcessing/getDataByDate";
import toAcronym from "@/utils/toAcronym";
import styles from "@/styles/stats.module.css"

export async function PointsBarChart({ dateId }: { dateId: string }) {
    
    const albumsRanking = await getChampAlbumsByDates(dateId);

    const chartData = {
        labels: albumsRanking.map( item => toAcronym(item.album_name) || "" ),
        mainData: albumsRanking.map( item => item.total_points ),
        subData: albumsRanking.map( item => item.total_points_raw ),
        color: albumsRanking.map( item => item.album_color ),
    }

    return (
        
        <div className={styles.barChartBox}>
            <DoubleBarChart data={chartData} />
        </div>
    );
}
