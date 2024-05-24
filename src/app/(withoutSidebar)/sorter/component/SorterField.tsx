"use client"
import { useState, useEffect, useRef, MutableRefObject } from "react";
import { getCover } from "@/utils/getPic";
import { CloseIcon, PreviousIcon } from "@/lib/icon";
import styles from "@/styles/sorter.module.css"
import Image from "next/image";

type SongsList = {
    song_id: string,
    song_name: string,
    album_id: string | null,
    album_name: string | null,
    track_numer: number | null,
    artist_id: string,
    artist_name: string,
}

type HistoryState = {
    cmp1: number;
    cmp2: number;
    head1: number;
    head2: number;
    rec: number[];
    nrec: number;
    equal: number[];
    finishSize: number;
    finishFlag: number;
    lstMember: number[][];
    parent: number[];
    totalSize: number;
};

export default function SorterField({ data: songsList, setResult }: { data: SongsList[], setResult: (result: any) => void }) {
    
    const artist = songsList[0]?.artist_name;

    let namMember = songsList.map( item => item.song_name );
    /* let namMember = [
        "peace",
        "hoax",
        "Stay Stay Stay",
        "Blank Space",
        "Red",
        "closure",
        "evermore",
        "Enchanted"
    ] */

    const [percentage, setPercentage] = useState(0); 
    const [leftFieldSong, setLeftFieldSong] = useState<string>("");
    const [rightFieldSong, setRightFieldSong] = useState<string>("");

    

    const leftFieldAlbum = songsList.find( item => item.song_name === leftFieldSong)?.album_name!;
    const rightFieldAlbum = songsList.find( item => item.song_name === rightFieldSong)?.album_name!;
    

    const history = useRef<HistoryState[]>([]);
    const lstMember: MutableRefObject<number[][]> = useRef([]);
    const parent: MutableRefObject<number[]> = useRef([]);
    const equal: MutableRefObject<number[]> = useRef([]);
    const rec: MutableRefObject<number[]> = useRef([]);
    const array: MutableRefObject<string[]> = useRef([]);

    const cmp1 = useRef(0);
    const cmp2 = useRef(0);
    const head1 = useRef(0);
    const head2 = useRef(0);
    const nrec = useRef(0);
    const totalSize = useRef(0);
    const finishSize = useRef(0);
    const finishFlag = useRef(0);
    
    //將歌曲分割成小單位
    function initList() {
        var n = 0;
        var mid;
        var i;
    
        lstMember.current[n] = [];
        for (i = 0; i < namMember.length; i++) {
            lstMember.current[n][i] = i;
        }
        parent.current[n] = -1;
        totalSize.current = 0;
        n++;
    
        for (i = 0; i < lstMember.current.length; i++) {
            if (lstMember.current[i].length >= 2) {
                mid = Math.ceil(lstMember.current[i].length / 2);
                lstMember.current[n] = lstMember.current[i].slice(0, mid);
                totalSize.current += lstMember.current[n].length;
                parent.current[n] = i;
                n++;
                lstMember.current[n] = lstMember.current[i].slice(mid, lstMember.current[i].length);
                totalSize.current += lstMember.current[n].length;
                parent.current[n] = i;
                n++;
            }
        }
    
        for (i = 0; i < namMember.length; i++) {
            rec.current[i] = 0;
        }
        nrec.current = 0;
    
        for (i = 0; i <= namMember.length; i++) {
            equal.current[i] = -1;
        }
    
        cmp1.current = lstMember.current.length - 2;
        cmp2.current = lstMember.current.length - 1;
        head1.current = 0;
        head2.current = 0;
        finishSize.current = 0;
        finishFlag.current = 0;
    }

    //用來對歌曲列表進行排序的根據 flag 的值，可以決定選擇左邊的歌曲、右邊的歌曲，或者宣告平局。
    function sortList(flag: number) {
        recordHistory();

        var i;
        if (flag === -1) {
            rec.current[nrec.current] = lstMember.current[cmp1.current][head1.current];
            head1.current++;
            nrec.current++;
            finishSize.current++;
            while (equal.current[rec.current[nrec.current - 1]] != -1) {
                rec.current[nrec.current] = lstMember.current[cmp1.current][head1.current];
                head1.current++;
                nrec.current++;
                finishSize.current++;
            }
        } else if (flag === 1) {
            rec.current[nrec.current] = lstMember.current[cmp2.current][head2.current];
            head2.current++;
            nrec.current++;
            finishSize.current++;
            while (equal.current[rec.current[nrec.current - 1]] != -1) {
                rec.current[nrec.current] = lstMember.current[cmp2.current][head2.current];
                head2.current++;
                nrec.current++;
                finishSize.current++;
            }
        } else {
            rec.current[nrec.current] = lstMember.current[cmp1.current][head1.current];
            head1.current++;
            nrec.current++;
            finishSize.current++;
            while (equal.current[rec.current[nrec.current - 1]] != -1) {
                rec.current[nrec.current] = lstMember.current[cmp1.current][head1.current];
                head1.current++;
                nrec.current++;
                finishSize.current++;
            }
            equal.current[rec.current[nrec.current - 1]] = lstMember.current[cmp2.current][head2.current];
            rec.current[nrec.current] = lstMember.current[cmp2.current][head2.current];
            head2.current++;
            nrec.current++;
            finishSize.current++;
            while (equal.current[rec.current[nrec.current - 1]] != -1) {
                rec.current[nrec.current] = lstMember.current[cmp2.current][head2.current];
                head2.current++;
                nrec.current++;
                finishSize.current++;
            }
        }
    
        if (head1.current < lstMember.current[cmp1.current].length && head2.current == lstMember.current[cmp2.current].length) {
            while (head1.current < lstMember.current[cmp1.current].length) {
                rec.current[nrec.current] = lstMember.current[cmp1.current][head1.current];
                head1.current++;
                nrec.current++;
                finishSize.current++;
            }
        } else if (head1.current == lstMember.current[cmp1.current].length && head2.current < lstMember.current[cmp2.current].length) {
            while (head2.current < lstMember.current[cmp2.current].length) {
                rec.current[nrec.current] = lstMember.current[cmp2.current][head2.current];
                head2.current++;
                nrec.current++;
                finishSize.current++;
            }
        }
    
        if (head1.current == lstMember.current[cmp1.current].length && head2.current == lstMember.current[cmp2.current].length) {
            for (i = 0; i < lstMember.current[cmp1.current].length + lstMember.current[cmp2.current].length; i++) {
                lstMember.current[parent.current[cmp1.current]][i] = rec.current[i];
            }
            lstMember.current.pop();
            lstMember.current.pop();
            cmp1.current = cmp1.current - 2;
            cmp2.current = cmp2.current - 2;
            head1.current = 0;
            head2.current = 0;
    
            if (head1.current == 0 && head2.current == 0) {
                for (i = 0; i < namMember.length; i++) {
                    rec.current[i] = 0;
                }
                nrec.current = 0;
            }
        }
    
        if (cmp1.current < 0) {
            const percentage = Math.floor(finishSize.current * 100 / totalSize.current);
            setPercentage(percentage);
    
            showResult();
            finishFlag.current = 1;
        } else {
            showImage();
        }
    }
    
    //將歌名顯示於比較兩首歌曲的表格中
    function showImage() {
        const percentage = Math.floor(finishSize.current * 100 / totalSize.current);
        const leftField = "" + toNameFace(lstMember.current[cmp1.current][head1.current]);
        const rightField = "" + toNameFace(lstMember.current[cmp2.current][head2.current]);

        setLeftFieldSong(leftField);
        setRightFieldSong(rightField);
        setPercentage(percentage);
    }
    
    //顯示最終排序結果
    function showResult() {
        var rankingNum = 1;
        var sameRank = 1;
        var str = "";
        var i: number;
        let resultArray = [];
    
        for (i = 0; i < namMember.length; i++) {            
            resultArray.push({
                ranking: rankingNum,
                song_name: namMember[lstMember.current[0][i]],
                song_id: songsList.find( item => item.song_name === namMember[lstMember.current[0][i]])?.song_id,
                album_name: songsList.find( item => item.song_name === namMember[lstMember.current[0][i]])?.album_name,
                artist_name: songsList.find( item => item.song_name === namMember[lstMember.current[0][i]])?.artist_name,
                artist_id: songsList.find( item => item.song_name === namMember[lstMember.current[0][i]])?.artist_id,
            })
            
            if (i < namMember.length - 1) {
                if (equal.current[lstMember.current[0][i]] == lstMember.current[0][i + 1]) {
                    sameRank++;
                } else {
                    rankingNum += sameRank;
                    sameRank = 1;
                }
            }
        }
    
        for (i = 0; i < namMember.length; i++) {
            array.current[i] = namMember[lstMember.current[0][i]];
        }

        setResult(resultArray);

    }
    
    //將排序數字轉換成歌名
    function toNameFace(n: number) {
        var str = namMember[n];
        return str;
    }

    //紀錄當前變數與陣列資料，用於 sortList 中
    function recordHistory() {
        var currentState = {
            cmp1: cmp1.current,
            cmp2: cmp2.current,
            head1: head1.current,
            head2: head2.current,
            rec: rec.current.slice(), // Create a copy of rec array
            nrec: nrec.current,
            equal: equal.current.slice(), // Create a copy of equal array
            finishSize: finishSize.current,
            finishFlag: finishFlag.current,
            lstMember: lstMember.current.slice(), // Create a copy of lstMember array
            parent: parent.current.slice(), // Create a copy of parent array
            totalSize: totalSize.current,
        };
        history.current.push(currentState);
    }

    //將所有變數與陣列資料重回上一步驟的資料
    function restorePreviousState() {
        var prevState = history.current.pop()

        if (!prevState) {
            alert("No previous step available.");
        } else {
            cmp1.current = prevState.cmp1;
            cmp2.current = prevState.cmp2;
            head1.current = prevState.head1;
            head2.current = prevState.head2;
            rec.current = prevState.rec;
            nrec.current = prevState.nrec;
            equal.current = prevState.equal;
            finishSize.current = prevState.finishSize;
            finishFlag.current = prevState.finishFlag;
            lstMember.current = prevState.lstMember.slice(); // Restore lstMember array
            parent.current = prevState.parent.slice(); // Restore parent array
            totalSize.current = prevState.totalSize;
            showImage(); // Update the UI
        }
    }

    useEffect(() => {
        initList();
        showImage();
    }, []);

    return(
        <div className={styles.sorterField}>
            <p className="light-gray-text align-right-text">{percentage}%</p>
            <div className={styles.sorterProgress}>
                <div className={styles.sorterBar} style={{width: `${percentage}%`}}></div>
            </div>
            
            <div className={styles.sorterButtonContainer}>
                <div>
                <div className={styles.sorterButton} onClick={() => {if(finishFlag.current === 0 ) sortList(-1)}}>
                    <div className={styles.sorterCover}>
                        <Image 
                            src={getCover(artist, leftFieldAlbum, leftFieldSong)} 
                            fill
                            sizes="(max-width: 600px) 100vw, 50vw"
                            priority 
                            alt="cover"
                        />
                    </div>
                    <div>
                        <p className={styles.mainText}>{leftFieldSong}</p>
                        <p className={styles.subText}>{leftFieldAlbum}</p>
                    </div> 

                </div>
                </div>

                <div>
                    <button className={styles.sorterButton} onClick={() => {if(finishFlag.current === 0 ) sortList(0)}}>i like both</button>
                    <button className={styles.sorterButton} onClick={() => {if(finishFlag.current === 0 ) sortList(0)}}>no opinion</button>
                </div> 

                <div> 
                <div className={styles.sorterButton} onClick={() => {if(finishFlag.current === 0 ) sortList(1)}}>
                    <div className={styles.sorterCover}>
                        <Image 
                            src={getCover(artist, rightFieldAlbum, rightFieldSong)} 
                            fill
                            sizes="(max-width: 600px) 100vw, 50vw"
                            priority 
                            alt="cover"
                        />
                    </div>
                    <div>
                        <p className={styles.mainText}>{rightFieldSong}</p>
                        <p className={styles.subText}>{rightFieldAlbum}</p>
                    </div>
                    

                </div>
                </div>
            </div>

            <button className={styles.sorterTextButton} onClick={restorePreviousState}>
                <PreviousIcon size={15} />
                Previous Step
            </button>

        </div>
    )
}