import FlexContainer from "@/components/common/FlexContainer";
import RoundImg from "@/components/ui/RoundImg";
import { RoundButton } from "@/components/ui/button/Button";
import { IconButtonRound } from "@/components/ui/button/IconButton";
import { PlusIcon } from "@/lib/icon";
import styles from "@/styles/home.module.css"
import { getProfile } from "@/utils/getPic";
import Image from "next/image";
import Link from "next/link";

type ArtistData = {
    artist_id: string,
    artist_name: string,
    count_logs?: number | null
}

export default async function ArtistItem({ data: { artist_id, artist_name, count_logs = null }  }: { data: ArtistData }) {

    return (
        <div className={styles.artistItem}>
            <div className={styles.sorterBtn}>
                <Link href={`/sorter/${artist_id}`}>
                    <IconButtonRound size="100%">
                        <PlusIcon size="40%" color="onPrimary" />
                    </IconButtonRound>
                </Link>
            </div>

            <Link href={`/artist/${artist_id}`}>
                <div>
                    <div className={styles.artistImg}>
                        <RoundImg
                            url={getProfile(artist_name)} 
                            fill={true}
                            alt="placeholder"
                        />
                    </div>

                    <p>{artist_name}</p>

                    <FlexContainer align="center" gap={5}>
                        <p className={styles.subText}>Artist</p>
                        {count_logs &&
                            <span className={styles.dot}></span>
                        }
                        {count_logs &&
                            <p className={styles.subText}>{count_logs} log{count_logs > 1 ? "s" : ""}</p>
                        }      
                    </FlexContainer>
                </div>
            </Link>

        </div>
    )
}