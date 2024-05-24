"use client"
import { RecButton } from "@/components/ui/button/Button";
import styles from "@/styles/form.module.css"



export default function AddSongsForm({ onSubmit }: { onSubmit: (formData: FormData) => void }) {

    return ( 
        <div>
            <form 
                action={onSubmit}
                className={styles.addSongsForm}
            >
                <textarea rows={6} name="song"/>

                <div>
                    <RecButton type="submit" variant="primary">
                        Enter
                    </RecButton>
                </div>
            </form>
        </div>
    );
}
