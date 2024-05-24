"use client"
import styles from "@/styles/layout.module.css"
import GalleryItem from "./GalleryItem";
import { PlusIcon } from "@/lib/icon";
import getDataType from "@/utils/getDataType";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconButtonRound } from "../ui/button/IconButton";

type DataForGallery = {
    data: any[], 
    addClick?: () => void, 
    link?: string | {
        pathname: string,
        query: {
            id: string
        }
    },
    title?: string
}


export default function GalleryContainer({ data, addClick, link, title }: DataForGallery) {

    const pathname = usePathname();
    const isAdmin = pathname.startsWith("/admin") ? "/admin" : "/";

    const { type } = getDataType(data[0]);

    return (
        <div>
            <h2>{title}</h2>
            <div className={styles.galleryContainer}>

                {data.map( item => 
                    <Link 
                        href={`${isAdmin}/${type}/${item[`${type}_id`]}`}
                        key={item[`${type}_id`]}
                    >
                        <GalleryItem data={item} />
                    </Link>
                )}

                
                {addClick &&
                    <div className={styles.plusButton}>
                        <IconButtonRound 
                            size="100%"
                            onClick={addClick}
                            variant="onBackground"
                        >
                            <PlusIcon size={"25%"}/>
                        </IconButtonRound>
                    </div>
                }

                {link &&
                    <div className={styles.plusButton}>
                        <Link href={link}>
                            <IconButtonRound 
                                size="100%"
                                variant="onBackground"
                            >
                                <PlusIcon size={"25%"}/>
                            </IconButtonRound>
                        </Link>
                    </div>
                }

            </div>
        </div>
    );
}
