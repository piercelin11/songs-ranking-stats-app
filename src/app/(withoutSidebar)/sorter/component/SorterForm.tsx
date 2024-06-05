
import styles from "@/styles/sorter.module.css"
import { RecButton } from "@/components/ui/button/Button"
import { submitSorterResult } from "@/lib/userDataProcessing/action"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { clear } from "@/redux/features/sorterSlice"

export default function SorterForm( { result, type }: { result: any[], type?: "CHAMPIONSHIP" }  ) {
    const dispatch = useDispatch<AppDispatch>();

    function handleSubmit() {
        console.log(result)
        dispatch(clear());
    }
    
    return(
        <div className={styles.resultFormContainer}>
            {/* <p>Say something, such as what's your overall feelings recently? Whether your perspective on certain songs has changed? What you had for breakfast this morning? <br />...... in short, anything to sum up this ranking.</p> */}
            <form 
                className={styles.resultForm}
                action={(formData) => { submitSorterResult(result, formData, type); handleSubmit() }}
            >
                <textarea 
                    placeholder="say something..." 
                    rows={3}
                    name="info" 
                    maxLength={300}
                    autoComplete="off" 
                    required 
                />
                <RecButton type="submit" variant="primary" >
                    submit and save the result
                </RecButton>
            </form>
        </div>
    )
}