import { ReactNode } from "react";
import { notFound } from "next/navigation";
import { fetchArtist, fetchLatestDates } from "@/lib/userDataProcessing/prismaFetching";
import styles from "@/styles/layout.module.css"
import Banner from "../component/Banner";
import Tab from "../component/Tab";
import GradientBackground from "../../../../components/common/GradientBackground";
import SwitchButton from "../component/SwitchButton";
import { IconButtonRound } from "@/components/ui/button/IconButton";
import { PlusIcon } from "@/lib/icon";
import FlexContainer from "@/components/common/FlexContainer";
import Link from "next/link";
 
export default async function Layout({ children, params: { artistId } }: { children: ReactNode, params: { artistId: string } }) {

    const artist = await fetchArtist(artistId);
    if (!artist) notFound();

    const latestDate = await fetchLatestDates(artistId);

    const dataForGradient = { artist: artist.artist_name };

    return (
      <div>
        
        <Banner artistName={artist.artist_name}>
          <FlexContainer gap={20}>

            <SwitchButton latestDateId={latestDate?.id ?? null} />

            <Link href={`/sorter/${artistId}`}>
              <IconButtonRound size={45}>
                <PlusIcon size={15} color="onPrimary" />
              </IconButtonRound>
            </Link>

          </FlexContainer>
        </Banner> 
        
        <GradientBackground data={dataForGradient}>
          { children }
        </GradientBackground>
      </div>
    );
  }