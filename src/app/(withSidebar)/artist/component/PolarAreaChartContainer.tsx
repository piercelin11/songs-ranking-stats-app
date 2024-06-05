

import React, { Suspense } from "react";
import styles from "@/styles/stats.module.css"
import SongsPolarAreaChart from "./SongsPolarAreaChart";
import { getAlbumsByDates } from "@/lib/userDataProcessing/getDataByDate";
import Loading from "@/components/common/Loading";


export default async function PolarAreaChartContainer({ artistId, dateId }: { artistId: string, dateId: string }) {
    const albumsRanking = await getAlbumsByDates(artistId, dateId);

    return (
        <div className={`${styles.chartBox} ${styles.chartBoxFifty}`}>
            <Suspense fallback={<Loading />}>
                <SongsPolarAreaChart data={albumsRanking} />
            </Suspense>
        </div>
    );
}