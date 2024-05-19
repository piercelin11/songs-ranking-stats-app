"use client"
import { LineChart } from "@/components/chart/LineChart";
import MultiSelect from "@/components/common/MultiSelect";
import styles from "@/styles/stats.module.css"
import { alterDateFormat } from "@/utils/alterDateFormat";
import { findUnique, sortBy } from "@/utils/helper";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

type SongsData = {
    song_id: number,
    song_name: string,
    artist_name: string,
    artist_id: number,
    ranking: number,
    previous_ranking: number | null,
    average_ranking: number,
    peak: number,
    album_id: number,
    album_name: string,
    album_color: string | null,
    track_number: number | null,
    times_in_top_100: number,
    times_in_top_10: number,
    times_in_top_1: number,
    total_chart_run: number | null,
    all_rankings: {ranking: number, date: Date, date_id: number}[],
    difference: number | null
}

export default function SongsLineChart({ defaultSongId, data }: { defaultSongId: number, data: SongsData[] }) {
    const searchParams = useSearchParams();
    const compareId: number[] = searchParams.getAll("compare").map( item => parseInt(item) );

    const defaultSong = data.find( item => item.song_id === defaultSongId )!;
    const compareSong = data.filter( item => compareId.includes(item.song_id) );

    const showedData = [defaultSong, ...compareSong];

    const dateArray = showedData.map( item => item?.all_rankings.map( allRankings => allRankings.date ) ).flat();
    const sortedDateArray = dateArray.sort((a, b) => new Date(a).getTime() - new Date(b).getTime()).map( item => alterDateFormat(item) );
    const uniqueDateArray = findUnique(sortedDateArray);

    const dataset = showedData.map( item => ({
        song_name: item?.song_name,
        color: item?.album_color,
        rankings: uniqueDateArray.map( dateItem => {
            const ranking = item?.all_rankings.find( rankingItem => alterDateFormat(rankingItem.date) === dateItem )?.ranking ?? null;
            return ranking;
        })
    }));

    return (
        <div className={styles.chartBox} >
            <div className={styles.header} >
                <h2>Songs Chart Run</h2>
                <MultiSelect defaultData={defaultSong} data={data} />
            </div>

            <div className={styles.rankingContainer}>
                <LineChart data={{date: uniqueDateArray, dataset: dataset}}/>
            </div>
        </div>
    );
}