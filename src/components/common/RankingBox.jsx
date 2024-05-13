import styles from "@/styles/stats.module.css"
import RankingRow from "./RankingRow";
import RankingHeader from "./RankingHeader";
import { ArrowUpRightIcon } from "@/lib/icon";
import IconButton from "../ui/IconButton";

export default function RankingBox({ data }) {
  const showedData = data.slice(0, 5);
  
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
    </div>
  );
}
