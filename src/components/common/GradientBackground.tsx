
import { ReactNode } from "react";
import styles from "@/styles/layout.module.css"
import { getBanner, getCover } from "@/utils/getPic";
import dominantColor from "@/lib/dominantColor";
import path from "path";
import useDominantColor from "@/hooks/useDominantColor";

type GradientData = {
  artist?: string,
  album?: string,
  song?: string,
}

 
export default async function GradientBackground({ children, data: { artist, album, song } }: { children: ReactNode, data: GradientData } ) {
  const imgUrl = !artist ? "" : album ? getCover(artist, album, song) : getBanner(artist);

  const color = await dominantColor.getPalette(imgUrl);
  const rgb = imgUrl === "" ? "(50, 50, 50)" : `${color?.[0][0]}, ${color?.[0][1]}, ${color?.[0][2]}`;
  return (
      <div 
          className={styles.bannerPageContent}
          style={{backgroundImage: `linear-gradient(rgb(${rgb}, 0.3) 0%, rgb(${rgb}, 0.15) 25%, rgb(0, 0, 0) 100%)`}}
      >
        { children }
      </div> 
  );
  }