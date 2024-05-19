import styles from "@/styles/common.module.css"
import useDominantColor from "@/hooks/useDominantColor";
import { getBanner } from "@/utils/getPic";


export default function StickyHeader({ opacity, title }: { opacity: number, title: string  }) {
    const [color] = useDominantColor(getBanner(title));
    const rgb = `${color?.[0]}, ${color?.[1]}, ${color?.[2]}`;  

    return(
        <div 
            className={styles.stickyHeader}
            style={{
                backgroundImage: `linear-gradient(rgb(${rgb}, 0.5), rgb(${rgb}, 0.5))`,
                opacity: `${opacity}`, 
            }}
        >
            <p>{title}</p>
        </div>
    );
}
