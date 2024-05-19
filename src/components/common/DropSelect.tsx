"use client"

import { useEffect, useState } from "react";
import DropButton from "../ui/DropButton";
import styles from "@/styles/tabs-dropdown.module.css"
import Link from "next/link";
import { useParams } from 'next/navigation'

export default function DropSelect({ options }: { options: { label: string, value: string | number }[] }) {
    const params = useParams(); 

   
    const [selectedDate, setSelectedDate] = useState(options.find( item => item.value == params.dateId)?.label);
    const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
    function handleDropdown() {
      setDropdownIsOpen( prevValue => !prevValue);
    }

    return (
        <div>
          <div className={styles.dropdown}>

            <div className={`${styles.select} ${dropdownIsOpen && styles.selectClicked}`} onClick={handleDropdown}>
              <span className={styles.selected}>{selectedDate}</span>
              <div className={`${styles.caret} ${dropdownIsOpen && styles.caretRotate}`}></div>
            </div>

            <div className={`${styles.menu} ${dropdownIsOpen && styles.menuOpen}`} onClick={handleDropdown}>

              {options.map( item =>
                <Link
                  key={item.value}
                  href={`/artist/${params.artistId}/${item.value}`}
                >
                  <DropButton 
                    label={item.label}
                  />
                </Link>
              )}
 
            </div>

          </div>
        </div>
    );
}
