
import { ReactNode } from "react";
import styles from "@/styles/layout.module.css"
import { getBanner } from "@/utils/getPic";
import dominantColor from "@/lib/dominantColor";
import path from "path";
import useDominantColor from "@/hooks/useDominantColor";
import { adjustSaturation, ensureDarkness, rgbToHex } from "@/utils/colorHelper";

type GradientData = {
  artist: string,
  album?: string,
  song?: string,
}

 
export default async function GradientBackground({ children, data: { artist, album, song } }: { children: ReactNode, data: GradientData } ) {
  const imgUrl = getBanner(artist);

  const color = await dominantColor.getPalette(imgUrl);
  const rgb = imgUrl === "" ? "(50, 50, 50)" : `${color?.[0][0]}, ${color?.[0][1]}, ${color?.[0][2]}`;
  const hex = rgbToHex(color?.[0])
  const darkColor = adjustSaturation(ensureDarkness(hex, 0.5));

  return (
      <div 
          className={styles.bannerPageContent}
          style={{backgroundImage: `linear-gradient(${darkColor}40 0%, ${darkColor}25 40%, #00000000 100%)`}}
      >
        { children }
      </div> 
  );
  }