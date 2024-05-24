
import styles from "@/styles/sorter.module.css"
import { RecButton } from "@/components/ui/button/Button"
import { submitSorterResult } from "@/lib/userDataProcessing/action"

export default function SorterForm( { result }: { result: any[] }  ) {

    
    return(
        <div className={styles.resultFormContainer}>
            {/* <p>Say something, such as what's your overall feelings recently? Whether your perspective on certain songs has changed? What you had for breakfast this morning? <br />...... in short, anything to sum up this ranking.</p> */}
            <form 
                className={styles.resultForm}
                action={(formData) => { submitSorterResult(result, formData) }}
            >
                <textarea 
                    placeholder="say something..." 
                    rows={3}
                    name="info" 
                    maxLength={300}
                    autoComplete="off" 
                    required 
                />
                <RecButton type="submit" variant="primary">
                    submit and save the result
                </RecButton>
            </form>
        </div>
    )
}