import { ReactNode } from "react";
import { fetchArtist } from "@/lib/userDataProcessing/prismaFetching";
import { notFound } from "next/navigation";
import SorterHeader from "../component/SorterHeader";
import styles from "@/styles/sorter.module.css"


export default async function Layout({ children }: { children: ReactNode }) {
    const artist = {
        id: "Championship",
        artist_name: "Championship"
    }
    
    return (
        <div className={styles.sorterPage}>
            <SorterHeader artistData={artist} />
            <div className={styles.sorterContent}>
                { children }
            </div>
        </div>
    )
}