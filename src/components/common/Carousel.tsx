import Link from "next/link";
import Card from "./Card";
import CarouselNavParent from "./CarouselNavParent";
import styles from "@/styles/card.module.css"

type Data = {
    date_id: string,
    date: Date,
    info: string | null,
    type: "OVERALL" | "ALBUM",
    artist_id: string,
    artist_name: string,
    rankings: {
        song_name: string,
        album_name: string | null,
        ranking: number,
        release_date: Date | null
    }[]
}

export default async function Carousel({ data }: { data: Data[] }) {

    const cardsLength = data.length;
    
    return(
        <div>
            <CarouselNavParent length={cardsLength}>
                {data.map( item => 
                    <Card 
                        data={item}
                        key={item.date_id}
                    /> 
                )}
            </CarouselNavParent>
        </div>  
    )
}