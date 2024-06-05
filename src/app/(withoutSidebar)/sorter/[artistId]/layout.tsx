import { ReactNode } from "react";
import { fetchArtist } from "@/lib/userDataProcessing/prismaFetching";
import { notFound } from "next/navigation";
import SorterHeader from "../component/SorterHeader";
import styles from "@/styles/sorter.module.css"


export default async function Layout( { children, params: { artistId } }: { children: ReactNode, params: { artistId: string } } ) {
    
    const artist = await fetchArtist(artistId);
    if (!artist) notFound();
    
    return (
        <div className={styles.sorterPage}>
            <SorterHeader artistData={artist} />
            <div className={styles.sorterContent}>
                { children }
            </div>
        </div>
    )
}