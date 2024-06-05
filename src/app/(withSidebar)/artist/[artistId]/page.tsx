
import { MediumGap, SmallGap } from "@/components/common/Gap";
import AverageTopSongs from "../component/AverageTopSongs";
import { AveragePointsBarChart } from "../component/PointsBarChart";
import DatesCarousel from "../component/DatesCarousel";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import NoData from "@/components/common/NoData";


export default async function Artist({ params: { artistId } }: { params: { artistId: string } }) {
  
  return ( 
    <div>
      <AverageTopSongs artistId={artistId} />

      <MediumGap />

      <h2>Album Points Chart</h2>
      <SmallGap />
      <Suspense fallback={<Loading className="barChart" />}>
        <AveragePointsBarChart artistId={artistId} />
      </Suspense>

      <MediumGap /> 

      <Suspense fallback={<Loading className="carousel" />}>
        <DatesCarousel artistId={artistId} />
      </Suspense>

    </div>
  );
}
