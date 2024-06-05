"use client"

import React from "react";
import PolarAreaChart from "@/components/chart/PolarAreaChart";
import { SmallGap } from "@/components/common/Gap";
import SwitchButton from "@/components/ui/SwitchButton";
import styles from "@/styles/stats.module.css"
import { useState } from "react";

type AlbumsStats = {
    album_id: number,
    album_name: string,
    album_color: string | null,
    count_songs_in_25perc: number,
    count_songs_in_50perc: number,
    total_points: number,
    previous_total_points: number | null,
    total_points_raw: number
}

const options = [
    {label: "songs in top 50%", value: "50" },
    {label: "songs in top 25%", value: "25" },
]

export default function SongsPolarAreaChart({ data }: { data: AlbumsStats[] }) {

    const [selected, setSelectd] = useState("50");

    function handleSelect(e: React.MouseEvent<HTMLButtonElement>) {
        const target = e.target as HTMLButtonElement;
        const value = target.value;

        setSelectd(value);
    }

    const chartData = {
        labels: data.map( item => item.album_name ),
        mainData: data.map( item => selected === "25" ? item.count_songs_in_25perc : item.count_songs_in_50perc  ),
        color: data.map( item => item.album_color ),
    }

    return (
        <div>
            <div className={styles.header}>
                <SwitchButton 
                    options={options}
                    selected={selected}
                    onSelect={handleSelect}
                />
            </div> 
            
            <SmallGap /> 

            <div className={styles.polarAreaBox}>
                <PolarAreaChart data={chartData} />
            </div> 

            <SmallGap /> 
        </div>
    );
}