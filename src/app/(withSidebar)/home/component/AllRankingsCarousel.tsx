import Link from "next/link";
import CarouselNavParent from "@/components/common/CarouselNavParent";
import styles from "@/styles/card.module.css"
import CarouselCardContainer from "@/components/common/CarouselCardContainer";
import { getAllDates } from "@/lib/userDataProcessing/getDataByArtist";
import { Suspense } from "react";
import Loading from "@/components/common/Loading";
import Card from "@/components/common/Card";
import { getAllDatesByUser } from "@/lib/userDataProcessing/getDataByUser";
  

export default async function AllRankingsCarousel() {
    const allDates = await getAllDatesByUser(10, 4); 
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