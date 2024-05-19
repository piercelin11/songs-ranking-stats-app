"use client"
import { ReactNode, useEffect } from "react";
import styles from "@/styles/layout.module.css"
import useDominantColor from "@/hooks/useDominantColor";
import { getBanner, getCover } from "@/utils/getPic";

type GradientData = {
  artist?: string,
  album?: string,
  song?: string,
}

 
export default function GradientBackground({ children, data: { artist, album, song } }: { children: ReactNode, data: GradientData } ) {
  const imgUrl = !artist ? "" : album ? getCover(artist, album, song) : getBanner(artist);

  const [color] = useDominantColor(imgUrl);
  const rgb = imgUrl === "" ? "(50, 50, 50)" : `${color?.[0]}, ${color?.[1]}, ${color?.[2]}`;

  return (
      <div 
          className={styles.bannerPageContent}
          style={{backgroundImage: `linear-gradient(rgb(${rgb}, 0.7) 0%, rgb(${rgb}, 0.3) 40%, rgb(0, 0, 0) 100%)`}}
      >
        { children }
      </div> 
  );
  }