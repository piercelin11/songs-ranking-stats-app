import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { fetchArtist, fetchLatestDates } from "@/lib/prisma";
import styles from "@/styles/layout.module.css"
import Banner from "../component/Banner";
import Tab from "../component/Tab";
import GradientBackground from "../../../../components/common/GradientBackground";
 
export default async function Layout({ children, params: { artistId } }: { children: ReactNode, params: { artistId: string } }) {

    const artist = await fetchArtist(artistId);
    if (!artist) notFound();

    const latestDate = await fetchLatestDates(artistId);

    const dataForGradient = { artist: artist.artist_name };

    return (
      <div>
        
        <Banner artistName={artist.artist_name}>
          <Tab latestDateId={latestDate?.id ?? null} />
        </Banner>
        
        <GradientBackground data={dataForGradient}>
          { children }
        </GradientBackground>
      </div>
    );
  }