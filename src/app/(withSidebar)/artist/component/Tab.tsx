"use client"
import styles from "@/styles/tabs-dropdown.module.css"
import { useParams } from "next/navigation"
import Link from "next/link"

export default function Tab({ latestDateId }: { latestDateId: string | null }) {
    const params = useParams(); 

    return(
        <div className={styles.tabContainer} >
            
            <Link href={`/artist/${params.artistId}`}>
                <div className={!params.dateId ? styles.currentTab : ""}>
                    <p>Overall</p>
                </div>
            </Link>
            
            <Link href={`/artist/${params.artistId}/${latestDateId}`}>
                <div className={params.dateId ? styles.currentTab : ""}>
                    <p>Ranking History</p>
                </div>
            </Link>

        </div>
    )
}