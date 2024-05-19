import { CrownIcon, ThreeDotsIcon } from "@/lib/icon";
import styles from "@/styles/stats.module.css"
import { gradientDarkOverlay } from "@/lib/gradient";
import NoData from "./NoData";

type PropsType = {
    title: string, 
    description: string, 
    img: string, 
    icon: any,
    stats?: number
}


export default function InfoBox({title, description, img, icon, stats}: PropsType) {
    return (
        <div 
            className={styles.infoBox}
            style={{backgroundImage: `${title && gradientDarkOverlay},url(${img})`}}
        >   
            <NoData condition={title}>
                <div className={styles.infoBoxFirstChild}>
                    <ThreeDotsIcon size={20} />
                </div>
                
                <div>
                    <div className={styles.infoBoxIconContainer}>
                        { icon }
                        <p>{stats && Math.abs(stats)}</p>
                    </div>
                    <p className={styles.mainText}>{title}</p>
                    <p className={styles.subText}>{description}</p>
                </div>
            </NoData>
        </div>
    );
}