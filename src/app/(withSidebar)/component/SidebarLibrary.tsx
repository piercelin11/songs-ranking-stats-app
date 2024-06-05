
import Image from "next/image";
import styles from "@/styles/sidebar.module.css"
import RoundRecImg from "@/components/ui/RoundRecImg";
import ArtistListItem from "./ArtistListItem";
import Link from "next/link";
import { getArtistByUser } from "@/lib/userDataProcessing/getDataByUser";


export default async function SidebarLibrary() {
    const artistList = await getArtistByUser();

    return (
        <div>
            {artistList.map( item =>
                <Link href={`/artist/${item.artist_id}`} key={item.artist_id}>
                    <ArtistListItem data={item}/>
                </Link> 
            )}
        </div>
    )
}