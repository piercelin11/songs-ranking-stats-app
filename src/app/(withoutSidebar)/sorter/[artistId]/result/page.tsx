"use client"
import { useEffect } from "react"
import styles from "@/styles/sorter.module.css"
import { useAppSelector } from "@/redux/store"
import { redirect } from "next/navigation"
import SorterForm from "../../component/SorterForm"
import SorterResultRow from "../../component/SorterRow"
 
export default function ResultPage({ params: { artistId } }: { params: { artistId: string } }) {
    const result = useAppSelector((state) => state.sorterReducer.result);

    useEffect(() => {
        if (result.length === 0)
            redirect(`/sorter/${artistId}/filter`)
    }, []);

    return ( 
        <div className={styles.sorterResultContainer}>
            <SorterForm result={result} />

            <div> 
                {result.map( (item, index) => 
                    <SorterResultRow key={index} data={item}/>)       
                }
            </div> 
        </div> 
    )
}