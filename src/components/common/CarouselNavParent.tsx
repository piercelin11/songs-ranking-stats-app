"use client"

import { ReactNode } from "react";
import { useState } from "react";
import styles from "@/styles/card.module.css"
import IconRoundButton from "../ui/IconRoundButton";
import { NavigateLeftIcon, NavigateRightIcon } from "@/lib/icon";

export default function CarouselNavParent({ children, length }: {children: ReactNode, length: number}) {

    const [carouselChange, setCarouselChange] = useState(0);

    function handleCarouselPrev() {
        if (carouselChange > 0) {
            setCarouselChange(prevValue => prevValue - 1)
        }  
    }

    function handleCarouselNext() {
        if (carouselChange < (length <= 2 ? 0 : length - 1)) {
            setCarouselChange(prevValue => prevValue + 1)
        }
    }
    
    return(
        <div>
            <div className={styles.carouselNavContainer}>
                <h2>Some Random Words For Title</h2>

                <div className={styles.carouselNav}>
                    <IconRoundButton onClick={handleCarouselPrev}>
                        <NavigateLeftIcon size={20}/>
                    </IconRoundButton>

                    <IconRoundButton onClick={handleCarouselNext}>
                        <NavigateRightIcon size={20}/>
                    </IconRoundButton>
                </div>
            </div>

            <div className={styles.carouselContainer}>
                <div className={styles.carouselChange} style={{transform: `translateX(${ -35 * carouselChange}%) translateX(${ -30 * carouselChange}px)`}}>
                    {children}
                </div>
            </div>
        </div>  
    )
}