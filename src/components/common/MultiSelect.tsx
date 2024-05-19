"use client"
import React, { useState, useEffect } from "react";
import MultiSelectTag from "./MultiSelectTag";
import DropButton from "../ui/DropButton";
import MultiSelectMenuFilter from "./MultiSelectMenuFilter";
import styles from "@/styles/tabs-dropdown.module.css"
import { createOptions, createUniqueOptions, sortSongsOrder } from "@/utils/helper";
import useDropdown from "@/hooks/useDropdown";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type SongsData = {
  song_id: number,
  song_name: string,
  artist_name: string,
  artist_id: number,
  ranking: number,
  previous_ranking: number | null,
  average_ranking: number,
  peak: number,
  album_id: number,
  album_name: string,
  album_color: string | null,
  track_number: number | null,
  times_in_top_100: number,
  times_in_top_10: number,
  times_in_top_1: number,
  total_chart_run: number | null,
  all_rankings: {ranking: number, date: Date, date_id: number}[],
  difference: number | null
}

type Options = {
  id: number,
  name: string,
  color?: string | null,
  album_id?: number | null
};
 
export default function MultiSelect({ data, defaultData }: { data: SongsData[], defaultData: SongsData }) {
    
    //handle dropdown and dropdown filter
    const {isOpen, toggleDropdown} = useDropdown();

    const [menuFilterBy, setMenuFilter] = useState("all");

    const albumTagOptions = createUniqueOptions(sortSongsOrder(data), "album_id", "album_name", "DESC", true) as Options[];
    const songsMenuOptions = createOptions(sortSongsOrder(data), "song_id", "song_name", false) as Options[];

    const [options, setOptions] = useState(songsMenuOptions);

    function handleFilter(e: React.MouseEvent<HTMLButtonElement>): void {
      const value = (e.target as HTMLButtonElement).value;
    
      if (value === "all") {
        setOptions(songsMenuOptions);
        setMenuFilter(value);
      } if (value === menuFilterBy) {
        setOptions(songsMenuOptions);
        setMenuFilter("all");
      } else {
        setOptions(songsMenuOptions.filter( item => item.album_id === parseInt(value) ));
        setMenuFilter(value);
      } 
    }


    //handle searchParams
    const searchParams = useSearchParams();
    const compareId: string[] = searchParams.getAll("compare");

    const paramsArray = compareId.map( item => ["compare", item] );

    function updateURL(id: string) {
      if (!compareId.includes(id)) {
        const newParamsArray = [...paramsArray, ["compare", id]];
        const newParams = new URLSearchParams(newParamsArray);

        window.history.pushState(null, '', `?${newParams.toString()}`);
      }
    }
    
    //handle tag
    const tagOptions = songsMenuOptions.filter( item => compareId.includes(item.id.toString()) );

    return (
        <div>

          <div className={styles.multiDropdown}>

            <div className={`${styles.multiSelect} ${isOpen && styles.multiSelectClicked}`} onClick={toggleDropdown}>
              
              <div className={styles.tagContainer}>
 
                <div className={styles.tagContainerOverflow}>
                  <MultiSelectTag 
                    isFixed={true}
                    color={defaultData.album_color}
                    value={defaultData.song_id}
                    label={defaultData.song_name}
                  />

                  {tagOptions.map( item => 
                    <MultiSelectTag 
                      key={item.id}
                      value={item.id}
                      label={item.name}
                    />
                  )}
                </div>

              </div>

              <div className={`${styles.caret} ${isOpen && styles.caretRotate}`}></div>
            </div>


            <div className={`${styles.multiSelectMenu} ${isOpen && styles.multiSelectMenuOpen}`}>
              <MultiSelectMenuFilter 
                selected={menuFilterBy}
                options={albumTagOptions} 
                onFilter={handleFilter}
              />

              {options.map( item =>
                <div 
                  key={item.id}
                  onClick={() => { updateURL( item.id.toString() ); toggleDropdown(); }}
                >
                  <DropButton label={item.name}/>
                </div>
              )}

            </div>

          </div>
        </div>
    );
}