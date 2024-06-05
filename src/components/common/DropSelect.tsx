"use client"

import { ReactNode, useEffect, useState } from "react";
import DropButton from "../ui/DropButton";
import styles from "@/styles/tabs-dropdown.module.css"
import Link from "next/link";
import { useParams, useSearchParams } from 'next/navigation'

export default function DropSelect({ options }: { options: { id: string | number, name: string }[] }) {
    const params = useParams(); 

   
    const selectedDate = options.find( item => item.id == params.dateId)?.name;
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
                  key={item.id}
                  href={`/artist/${params.artistId}/${item.id}`}
                >
                  <DropButton 
                    label={item.name}
                  />
                </Link>
              )}
 
            </div>

          </div>
        </div>
    );
}

export function DropSelectSearchParams({ options }: { options: { id: string | number, name: string }[] }) {
  const searchParams = useSearchParams(); 
  const selectedId = searchParams.get("id");
 
  const selected = options.find( item => item.id == selectedId)?.name;
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false);
  function handleDropdown() {
    setDropdownIsOpen( prevValue => !prevValue);
  }

  function handleSelect(e: React.MouseEvent<HTMLButtonElement>) {
    const id = (e.currentTarget as HTMLButtonElement).value;
    const newParams = new URLSearchParams({id});
    window.history.pushState(null, "", `?${newParams.toString()}`);
  }

  return (
      <div>
        <div className={styles.dropdown}>

          <div className={`${styles.select} ${dropdownIsOpen && styles.selectClicked}`} onClick={handleDropdown}>
            <span className={styles.selected}>{selected || "Selecet..."}</span>
            <div className={`${styles.caret} ${dropdownIsOpen && styles.caretRotate}`}></div>
          </div>

          <div className={`${styles.menu} ${dropdownIsOpen && styles.menuOpen}`} onClick={handleDropdown}>

            {options.map( item =>
              <Link key={item.id} href={`?id=${item.id}`} replace>
                <DropButton 
                  label={item.name}
                  //id={item.id}
                  //onClick={handleSelect}
                />
              </Link>
            )}

          </div>

        </div>
      </div>
  );
}
