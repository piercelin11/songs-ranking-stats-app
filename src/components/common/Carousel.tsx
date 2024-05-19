import Card from "./Card";
import CarouselNavParent from "./CarouselNavParent";

type Data = {
    date_id: number,
    date: Date,
    info: string | null,
    type: "OVERALL" | "ALBUM",
    artist_name: string,
    rankings: {
        song_name: string,
        album_name: string,
        ranking: number,
    }[]
}

export default async function Carousel({ data }: { data: Data[] }) {

    const cardsLength = data.length;
    
    return(
        <div>
            <CarouselNavParent length={cardsLength}>
                {data.map( item => 
                    <Card 
                        key={item.date_id}
                        data={item}
                    /> 
                )}
            </CarouselNavParent>
        </div>  
    )
}