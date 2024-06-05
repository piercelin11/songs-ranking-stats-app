"use client"
import styles from "@/styles/layout.module.css"
import useBannerAnimation from "@/hooks/useBannerAnimation";
import StickyHeader from "@/components/common/StickyHeader";
import { ReactNode } from "react";
import { getBanner } from "@/utils/getPic";

export default function Banner({ children, artistName }: { children?: ReactNode, artistName: string }) {

    const {ref, coverSize, overlayOpacity, stickyOpacity} = useBannerAnimation();
    

    return(
        <div>
            <div 
                className={styles.banner}
                style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, ${overlayOpacity}), rgba(0, 0, 0, ${overlayOpacity})) ,url(${getBanner(artistName)})`,
                    backgroundSize: `${coverSize}%`
                }}
                ref={ref}
            >  
                <div>
                    { children }
                </div>
                <div>
                    <h1>{artistName}</h1>
                    <p>101,100,101 followers</p>
                </div>
            </div>

            {/* <StickyHeader opacity={stickyOpacity} title={artistName} /> */}
        </div>
    );
}