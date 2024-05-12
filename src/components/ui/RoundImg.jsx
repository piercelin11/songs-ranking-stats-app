import styles from "@/styles/common.module.css"
import Image from "next/image";

export default function RoundImg({ size, url, alt }) {
    return (
            <Image 
                className={styles.roundImg}
                src={url}
                alt={alt}
                width={size}
                height={size}
            />
    );
} 