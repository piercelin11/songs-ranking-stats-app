import Link from "next/link";
import CarouselNavParent from "@/components/common/CarouselNavParent";
import styles from "@/styles/card.module.css"
import CarouselCardContainer from "@/components/common/CarouselCardContainer";
import { getAllDates } from "@/lib/userDataProcessing/getDataByArtist";
import { Suspense } from "react"; 
import Loading from "@/components/common/Loading";
import Card from "@/components/common/Card";
import NoData from "@/components/common/NoData";
 

export default async function DatesCarousel({ artistId }: { artistId: string }) {
    const allDates = await getAllDates(artistId, 4); 
    const cardsLength = allDates.length; 
    
    return(
        <div>

            <CarouselNavParent length={cardsLength}>
                    {allDates.map( item =>
                        <Card 
                            data={item}
                            key={item.date_id}
                        /> 
                    )}
            </CarouselNavParent>

        </div>  
    )
}