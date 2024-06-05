
import { ReactNode } from "react";
import styles from "@/styles/layout.module.css"
import { getProfile } from "@/utils/getPic";
import { LargeGap } from "@/components/common/Gap";


 
export default async function Background({ children, artistName }: { children: ReactNode, artistName: string } ) {
  const imgUrl = getProfile(artistName);


  return (
      <div 
          className={styles.content}
          style={{
            backgroundImage: `linear-gradient(#000000CC 0px, #000000 500px), url(${imgUrl})`
          }}
      >
        <LargeGap />
        { children }
      </div> 
  );
  }