"use client"
import styles from "@/styles/sorter.module.css"
import SortingStage from "./SortingStage"
import { RoundButton } from "@/components/ui/button/Button"
import PageBackLink from "@/components/common/PageBackLink"
import FlexContainer from "@/components/common/FlexContainer"
import { ReactNode } from "react"


export default function SorterHeader({ artistName, percentage }: { artistName: string, percentage: number }) {

    return (
        <div className={styles.sorterHeader}>
            <div>
                <div>
                    <p className={styles.mainText}>{artistName}</p>
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

                <PageBackLink>
                    <RoundButton variant="onBackground" padding="12 30">
                        Quit Sorter
                    </RoundButton>
                </PageBackLink>

            </FlexContainer>
            
        </div>

    )
}