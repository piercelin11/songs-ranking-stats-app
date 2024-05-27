import { MediumGap, SmallGap } from "@/components/common/Gap"
import UnderlineInput from "@/components/ui/Input/UnderlineInput"
import { createArtist } from "@/lib/adminDataProcessing/action"
import styles from "@/styles/form.module.css"
import { RecButton } from "@/components/ui/button/Button"

export default function CreateArtistModal() {
    return (
        
        <div className={styles.alignCenterForm}>
            <UnderlineInput 
                name="artistName"
                placeholder="Enter artist name here"
            />
        </div>
    )
}