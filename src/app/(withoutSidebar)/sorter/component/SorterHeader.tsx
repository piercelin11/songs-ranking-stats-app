"use client"
import styles from "@/styles/sorter.module.css"
import { RoundButton } from "@/components/ui/button/Button"
import PageBackLink from "@/components/common/PageBackLink"
import FlexContainer from "@/components/common/FlexContainer"
import { ReactNode, useEffect, useState } from "react"
import { useAppSelector } from "@/redux/store"
import Link from "next/link"


export default function SorterHeader({ artistData: { id: artist_id, artist_name } }: { artistData: { id: string, artist_name: string } }) {
    const percentageState = useAppSelector((state) => state.sorterReducer.percentage);
    const [percentage, setPercentage] = useState<number>(percentageState || 0);

    useEffect(() => {
        const historyString = localStorage.getItem(artist_name === "Championship" ? "CHAMPIONSHIP" : artist_name);
        const percentage = historyString ? JSON.parse(historyString).percent : 0;
        
        setPercentage(percentage);
    }, []);

    useEffect(() => {
        setPercentage(percentageState || 0)
    }, [percentageState]);

    return (
        <div className={styles.sorterHeader}>
            <div>
                <div>
                    <p className={styles.mainText}>{artist_name}</p>
                    <p className={styles.subText}>songs sorter</p>
                </div>
                <div className={styles.sorterProgress}>
                    <p 
                        className={styles.percentageNumber}
                        style={{left: `${percentage}%`}}
                    >
                        {percentage}%
                    </p>
                    <div className={styles.sorterBar} style={{width: `${percentage}%`}}></div>
                </div>
            </div>
 
            <FlexContainer gap={10}>

                <Link href={`/artist/${artist_id}`}>
                    <RoundButton variant="onBackground" padding="12 30">
                        Quit Sorter
                    </RoundButton>
                </Link>

            </FlexContainer>
            
        </div>

    )
}