import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { fetchArtist  } from "@/lib/adminDataProcessing/prismaFetching";
import styles from "@/styles/layout.module.css"
import Banner from "../component/Banner";
import GradientBackground from "../../../../components/common/GradientBackground";
 
export default async function Layout({ children, params: { artistId } }: { children: ReactNode, params: { artistId: string } }) {

    const artist = await fetchArtist(artistId);
    if (!artist) notFound();

    return (
      <div>
        
        <Banner artistName={artist.artist_name} />
        
        <div className={styles.content} >
          { children }
        </div>
      </div>
    );
  }