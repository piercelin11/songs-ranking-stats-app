import { ReactNode } from "react";
import { notFound } from "next/navigation";
import styles from "@/styles/layout.module.css"
import SongBanner from "../component/SongBanner";
import BlurBanner from "../component/BlurBanner";
import { getAvgSongRanking } from "@/lib/userDataProcessing/getDataByArtist";
 
export default async function Layout({ children, params: { songId } }: { children: ReactNode, params: { songId: string } }) {

    const song = await getAvgSongRanking(songId);

    return (
      <div>
        <BlurBanner data={song} />
        <SongBanner data={song} />
        
        <div className={styles.content} >
          { children }
        </div>
  
      </div>
    );
  }