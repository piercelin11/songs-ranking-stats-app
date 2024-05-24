import styles from "@/styles/common.module.css"
import Image from "next/image";

type PropsType = 
    {
      size: number;
      url: string;
      alt: string;
      fill?: false;
      priority?: boolean
    }
  | {
      url: string;
      alt: string;
      fill: true;
      size?: number;
      priority?: boolean
    };

export default function RoundRecImg({ size, url, alt, fill = false, priority = false }: PropsType) {

    if(fill)

        return (
            <Image
                className={styles.roundRecImg}
                src={url}
                alt={alt}
                fill={fill}
                priority={priority}
                sizes="(max-width: 768px) 100%, (max-width: 1200px) 100%, 100%"
            />
        );

    else

        return (
            <Image
                className={styles.roundImg}
                src={url}
                alt={alt}
                width={size}
                height={size}
                priority={priority}
            />
        );
}