
import FlexContainer from "@/components/common/FlexContainer";
import InfoBoxColContainer from "../../component/InfoBoxColContainer";
import { LargeGap, SmallGap } from "@/components/common/Gap";
import { DatePointsBarChart } from "../../component/PointsBarChart";
import DateTopSongs from "../../component/DateTopSongs";
import PolarAreaChartContainer from "../../component/PolarAreaChartContainer";
import DateDropSelect from "../../component/DateDropSelect";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";

export default async function Artist({ params: { artistId, dateId } }: { params: { artistId: string, dateId: string } }) {

  return (
    <div>
      <DateDropSelect artistId={artistId} />
       
      <DateTopSongs artistId={artistId} dateId={dateId} />

      <LargeGap /> 

      <Suspense fallback={<Loading className="twoColInfoBox"/>}>
        <FlexContainer isFullWidth={true} isChilfrenFlex={true}>
          <InfoBoxColContainer artistId={artistId} dateId={dateId} />
          <PolarAreaChartContainer artistId={artistId} dateId={dateId}/>
        </FlexContainer>
      </Suspense>

      <LargeGap /> 

      <h2>Album Points Chart</h2>
      <SmallGap />
      <Suspense fallback={<Loading className="barChart" />}>
        <DatePointsBarChart artistId={artistId} dateId={dateId} />
      </Suspense>

    </div>
  );
}
