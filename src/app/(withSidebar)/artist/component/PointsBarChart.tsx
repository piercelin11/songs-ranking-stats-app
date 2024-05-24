
import DoubleBarChart from "@/components/chart/DoubleBarChart"
import { SmallGap } from "@/components/common/Gap";
import toAcronym from "@/utils/toAcronym";

type AlbumsStats = {
    album_id: number,
    album_name: string,
    album_color: string | null,
    total_points: number, 
    total_points_raw: number
}

export default async function PointsBarChart({ data }: { data: AlbumsStats[] }) {

    const noSingleRanking = data.filter( item => item.album_name !== "Single" );

    const chartData = {
        labels: noSingleRanking.map( item => toAcronym(item.album_name) ),
        mainData: noSingleRanking.map( item => item.total_points ),
        subData: noSingleRanking.map( item => item.total_points_raw ),
        color: noSingleRanking.map( item => item.album_color ),
    }

    return (
        
        <div>
            <h2>Album Points Chart</h2>
            <SmallGap />
            <DoubleBarChart data={chartData} />
        </div>
    );
}