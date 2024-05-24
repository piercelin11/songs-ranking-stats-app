import styles from "@/styles/sorter.module.css"
import SorterForm from "./SorterForm"
import CardRankingRow from "@/components/common/CardRankingRow"

export default function SorterResult({ data: result }: { data: any[] }) {
    return (
        <div className={styles.sorterResultContainer}>
            <SorterForm result={result} />

            <div style={{width: "70%"}}> 
                { 
                    result.map( (item, index) => <CardRankingRow key={index} data={item}/>)       
                }
            </div> 
        </div>
    )
}