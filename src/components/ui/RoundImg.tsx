import styles from "@/styles/common.module.css"
import Image from "next/image";

type PropsType = {
    size: number,
    url: string,
    alt: string
}

export default function RoundImg({ size, url, alt }: PropsType) {
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