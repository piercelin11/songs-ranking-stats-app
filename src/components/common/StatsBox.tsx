import { ReactNode } from "react";
import styles from "@/styles/stats.module.css"
import { CrownIcon, CrownRoundedRecIcon } from "@/lib/icon";
import { SmallGap } from "./Gap";

type Props = {
    icon: ReactNode, 
    statNumber: number | string | null, 
    description: string
}
 
export default async function StatsBox({ icon, statNumber, description }: Props) {

    return (
        <div className={styles.statsBox}>
            {icon}
            <div>
                <p className={styles.mainText}>{statNumber}</p>
                <p className={styles.subText}>{description}</p>
            </div>
        </div>
    );
  }