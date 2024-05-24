import { ReactNode } from "react";
import styles from "@/styles/layout.module.css"
import { getBanner } from "@/utils/getPic";

export default function SorterBanner({ artistName }: { artistName: string } ) {


    return (
        <div className={styles.sorterBanner} >
            <p>{artistName}</p>
        </div>
    )
}