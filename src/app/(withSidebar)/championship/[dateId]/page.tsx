import { LargeGap, MediumGap, SmallGap } from "@/components/common/Gap";
import ChampTopSongs from "../component/ChampTopSongs";
import { PointsBarChart } from "../component/PointsBarChart";
import ArtistRankingGallery from "../component/ArtistRankingGallery";



export default async function ChampPage({ params: { dateId } }: { params: { dateId: string } }) {


    return (
        <div>
            <p>HIHI</p>
            <h2>Artist Ranking</h2>
            <SmallGap />
            <ArtistRankingGallery dateId={dateId} />
            <MediumGap />

            <h2>Top Songs</h2>
            <SmallGap />
            <ChampTopSongs dateId={dateId} />
            <LargeGap />

            <h2>Album Points Chart</h2>
            <SmallGap />
            <PointsBarChart dateId={dateId} />
            <MediumGap />


            <LargeGap />
            <LargeGap />
        </div>
    )
}