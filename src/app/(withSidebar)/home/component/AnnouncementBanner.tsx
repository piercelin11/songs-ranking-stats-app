import FlexContainer from "@/components/common/FlexContainer";
import { MediumGap, SmallGap } from "@/components/common/Gap";
import { RoundButton } from "@/components/ui/button/Button";
import { prisma } from "@/lib/prisma"
import fetchSpotifyCover from "@/lib/spotify/fetchSpotifyCover";
import styles from "@/styles/home.module.css"
import Image from "next/image";

export default async function AnnouncementBanner() {
    const latestAlbum = await prisma.albums.findFirst({
        include: {
            artists: true,
        },
        orderBy: {
            release_date: "desc"
        }
    });

    const imgUrl = await fetchSpotifyCover(latestAlbum?.artists.artist_name!, latestAlbum?.album_name!, latestAlbum?.release_date!);


    return (
        <div>
            <div 
                className={styles.announcementBanner}
                style={{
                    backgroundImage: `linear-gradient(155deg, ${latestAlbum?.album_color} 0%, ${latestAlbum?.album_color}55 50%, ${latestAlbum?.album_color}00 80%)`
                }}
            >
                <Image 
                    src={imgUrl}
                    width={325}
                    height={325}
                    alt="cover"
                    priority
                />

                <div>
                    <p className={styles.subText}>New Album Release</p>
                    <p className={styles.mainText}>{latestAlbum?.album_name}</p>

                    <SmallGap />
                    
                    <p className={styles.description}>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock.</p>

                    <SmallGap />

                    <FlexContainer gap={10}>
                        <RoundButton>
                            Sort Album
                        </RoundButton>
                        <RoundButton variant="secondary">
                            Sort Album
                        </RoundButton>
                    </FlexContainer>

                </div>
            </div>
        </div>
    )
}