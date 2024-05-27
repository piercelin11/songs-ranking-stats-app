import styles from "@/styles/sorter.module.css"
import SorterForm from "./SorterForm"
import CardRankingRow from "@/components/common/CardRankingRow"
import SorterResultRow from "./SorterRow"

export default function SorterResult({ data: result }: { data: any[] }) {
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