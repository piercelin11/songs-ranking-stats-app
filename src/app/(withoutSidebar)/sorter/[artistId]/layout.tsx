import { ReactNode } from "react";
import styles from "@/styles/layout.module.css"
import SorterBanner from "../component/SorterBanner";
import { fetchArtist } from "@/lib/userDataProcessing/prismaFetching";
import { notFound } from "next/navigation";
import { CloseIcon } from "@/lib/icon";
import { SmallGap } from "@/components/common/Gap";
import { RecButton } from "@/components/ui/button/Button";

export default async function Layout( { children, params: { artistId } }: { children: ReactNode, params: { artistId: string } } ) {
    
    const artist = await fetchArtist(artistId);
    if (!artist) notFound();
    
    return (
        <div /* className={styles.content} */>
            {/* <RecButton variant="transparent">
                <CloseIcon size={15}/>
                QUIT
            </RecButton>

            <SmallGap />

            <div className={styles.content}>
                { children }
            </div> */}
            { children }
        </div>
    )
}