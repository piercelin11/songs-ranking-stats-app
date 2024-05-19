"use client"

import styles from "@/styles/stats.module.css"
import RankingRow from "./RankingRow";
import RankingHeader from "./RankingHeader";
import { ArrowUpRightIcon } from "@/lib/icon";
import IconButton from "../ui/IconButton";
import Pagination from "./Pagination";
import { useState } from "react";

type DataType = {
  song_id: number,
  song_name: string,
  ranking: number,
  previous_ranking: number | null,
  average_ranking: number,
  peak: number,
  album_id: number,
  album_name: string,
  //album_color: string | null,
  //track_number: number | null,
  times_in_top_10: number | null,
  total_chart_run: number | null,
  //all_rankings: {ranking: number, date: Date}[],
  difference: number | null
}

export default function RankingBox({ data } : { data: DataType[] }) {
  const [showedData, setShowedData] = useState(data.slice(0, 5));
  const totalPage = Math.ceil(data.length / 5);

  function handleDataPage(selectedPage: number) {
    setShowedData(data.slice(((selectedPage - 1) * 5), (selectedPage * 5)));
  }
  
  return (
    <div className={styles.chartBox}>
        <div className={styles.header}>
            <h2>ALL-TIME SONGS RANKING</h2>
            <IconButton> 
                <ArrowUpRightIcon size={15}/>
            </IconButton>
        </div>
        
        <div className={styles.rankingContainer}>
            <RankingHeader />
            {
              showedData.map( item => 
                <RankingRow key={item.song_id} data={item} /> 
              )
            }
        </div>
        
        <div className={styles.paginationContainer}>
          <Pagination totalPage={totalPage} onPageChange={handleDataPage}/>
        </div>

    </div>
  );
}
