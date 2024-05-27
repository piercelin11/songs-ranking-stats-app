import getDataType from "@/utils/getDataType";
import styles from "@/styles/button.module.css"
import { NextIcon, PreviousIcon } from "@/lib/icon";
import Link from "next/link";

export default function PaginationButtonWithName({ data, direction }: { data: any, direction: "next" | "previous" }) {

    const {type, id, title, subtitle} = getDataType(data);

    if (direction === "next")
        return(
            
                <div className={styles.PaginationButtonWithName}>
                    <Link href={`/${type}/${id}`} replace>
                    <div className={styles.next} >
                        <div>
                            <p className={styles.mainText}>{title}</p>
                            <p className={styles.subText}>{subtitle}</p>
                        </div>
                        <NextIcon size={27}/>
                    </div>
                    </Link>
                </div>
        )

    if (direction === "previous")
        return(
                <div className={styles.PaginationButtonWithName}>
                    <Link href={`/${type}/${id}`} replace>
                    <div className={styles.previous} >
                        <PreviousIcon size={27} />
                        <div>
                            <p className={styles.mainText}>{title}</p>
                            <p className={styles.subText}>{subtitle}</p>
                        </div>
                    </div>
                    </Link>
                </div>
            
        )
    
    else return <p></p>
}