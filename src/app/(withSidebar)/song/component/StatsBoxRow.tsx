import StatsBox from "@/components/common/StatsBox";
import { CrownRoundedRecIcon, MountainRoundedRecIcon, StarRoundedRecIcon, TenRoundedRecIcon } from "@/lib/icon";
import styles from "@/styles/stats.module.css"
 
export default function StatsBoxRow({ data }: { data: any }) {
    const { ranking, peak, times_in_top_10, total_chart_run } = data as {
        ranking: number, 
        peak: number,
        times_in_top_10: number, 
        total_chart_run: number,
    }

    const iconSize = 50;

    return (
        <div className={styles.statsBoxContainer}>
            <StatsBox 
                icon={<CrownRoundedRecIcon size={iconSize}/>}
                statNumber={`#${ranking}`}
                description="all-time ranking"
            />
            <StatsBox 
                icon={<StarRoundedRecIcon size={iconSize}/>}
                statNumber={peak}
                description="peak position"
            />
            <StatsBox 
                icon={<TenRoundedRecIcon size={iconSize}/>}
                statNumber={times_in_top_10}
                description="times in top ten"
            />
            <StatsBox 
                icon={<MountainRoundedRecIcon size={iconSize}/>}
                statNumber={total_chart_run || "no data yet"}
                description="total chart run"
            />
            
        </div>
    );
  }