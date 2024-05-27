"use client"
import { RecButton } from "@/components/ui/button/Button";
import styles from "@/styles/form.module.css"



export default function AddSongsForm() {

    return (  
        <div className={styles.addSongsForm}>
            <textarea rows={6} name="song"/>
        </div>
    );
}
