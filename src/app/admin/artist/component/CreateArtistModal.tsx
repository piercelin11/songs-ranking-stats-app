import { MediumGap } from "@/components/common/Gap"
import UnderlineInput from "@/components/ui/Input/UnderlineInput"
import { createArtist } from "@/lib/adminDataProcessing/action"
import styles from "@/styles/form.module.css"
import { RecButton } from "@/components/ui/button/Button"

export default function CreateArtistModal() {
    return (
        
        <div>
            <h2 >Artist Name</h2>

            <MediumGap />
            
            <form 
                className={styles.alignCenterForm}
                action={createArtist}
            >
                <UnderlineInput 
                    name="artistName"
                    placeholder="Enter artist name here"
                />
                <RecButton type="submit" variant="primary">
                    Save
                </RecButton>
            </form>
        </div>
    )
}