import { gradientDarkOverlay } from "@/lib/gradient"
import styles from "@/styles/layout.module.css"
import { getBanner } from "@/utils/getPic"

export default function BannerHeader({ artistName }: { artistName: string  }) {
    return (
        <div 
            className={styles.bannerHeader} 
            style={{
                backgroundImage: `linear-gradient(rgb(0, 0, 0, 0.15), rgb(0, 0, 0, 0.3)) ,url(${getBanner(artistName)})`,
            }}
        >
            <p>{artistName}</p>
        </div>
    )
}
