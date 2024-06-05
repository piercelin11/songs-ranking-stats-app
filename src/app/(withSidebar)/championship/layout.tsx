import { getChampArtistByDates } from "@/lib/userDataProcessing/getDataByDate"
import styles from "@/styles/layout.module.css"
import { ReactNode } from "react"
import Background from "./component/Background";
import { notFound } from "next/navigation";

export default async function ChampLayout({ params: { dateId }, children }: { params: { dateId: string }, children: ReactNode }) {
    
    const artistRanking = await getChampArtistByDates(dateId);
    if(artistRanking.length === 0) notFound();
    
    return (
        <div>
            <Background artistName={artistRanking[0].artist_name}>
                { children }
            </Background>
        </div>
    )
}