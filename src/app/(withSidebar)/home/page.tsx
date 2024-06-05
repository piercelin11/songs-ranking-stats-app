import { LargeGap, MediumGap, MiniGap, SmallGap } from "@/components/common/Gap";
import AnnouncementBanner from "./component/AnnouncementBanner";
import LoggedArtistsContainer from "./component/LoggedArtistsContainer";
import TopAlbumsContainer from "./component/TopAlbumsContainer";
import NewArtistsContainer from "./component/UnLoggedArtistsContainer";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import AllRankingsCarousel from "./component/AllRankingsCarousel";
import Link from "next/link";


export default async function HomePage() {


    return (
        <div>
            <AnnouncementBanner />

            <MediumGap />


            <h2>Your top albums</h2>
            <MiniGap />
            <Suspense fallback={<Loading className="topAlbumGallery"/>}>
                <TopAlbumsContainer />
            </Suspense>
            {/* <Link href="/sorter/championship">
                CHAMP
            </Link> */}


            <LargeGap />

            <Suspense fallback={<Loading />}>
                <LoggedArtistsContainer />
            </Suspense>

            <MediumGap />

            <Suspense fallback={<Loading  className="carousel"/>}>
                <AllRankingsCarousel />
            </Suspense>
            
            <MediumGap />

            <Suspense fallback={<Loading />}>
                <NewArtistsContainer />
            </Suspense>

            
            <LargeGap />
            

        </div>
    )
}