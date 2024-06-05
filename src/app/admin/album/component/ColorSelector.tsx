import styles from "@/styles/admin.module.css"
import { rgbToHex } from "@/utils/colorHelper"
import { useEffect } from "react";

type ColorSelectorProps = {
    colorArray: Uint8ClampedArray[] | null, 
    originalColor: string | null
};

export default function ColorSelector({ colorArray, originalColor }: ColorSelectorProps) {
    const hexArray = colorArray?.map( item => rgbToHex(item));
    const uniqueHexArray = Array.from(new Set(hexArray));
     
    return(
        <div className={styles.colorSelectContainer}>

            {uniqueHexArray.map( (item, index) =>  
                <div key={item}>

                    <input 
                        className={styles.colorInput} 
                        type="radio" name="albumColor" 
                        id={item} 
                        value={item}
                        defaultChecked={originalColor === item ? true : false}
                    />
                    <label className={styles.colorLabel} htmlFor={item} >
                        <span style={{backgroundColor: item}} >
                            <span className={styles.colorSelected} ></span>
                        </span>
                    </label>

                </div>
            )}
            
        </div>
    )

}