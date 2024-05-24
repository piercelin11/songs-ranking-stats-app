import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { fetchArtist } from "@/lib/userDataProcessing/prismaFetching";
import styles from "@/styles/layout.module.css"
import BannerHeader from "../component/BannerHeader";
 
export default async function Layout({ children, params: { artistId } }: { children: ReactNode, params: { artistId: string } }) {

    const artist = await fetchArtist(artistId);
    if (!artist) notFound();

    return (
      <div>
        
        <BannerHeader artistName={artist.artist_name} />
        
        <div className={styles.content}>
          { children }
        </div>
      </div>
    );
  }