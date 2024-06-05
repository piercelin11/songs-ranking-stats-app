"use client"
import React, { useState, useEffect, useRef, MutableRefObject } from "react";
import { getCover } from "@/utils/getPic";
import { CloseIcon, PreviousIcon } from "@/lib/icon";
import styles from "@/styles/sorter.module.css"
import Image from "next/image";
import { RecButton } from "@/components/ui/button/Button";
import FlexContainer from "@/components/common/FlexContainer";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setPercentage, setResult, clear } from "@/redux/features/sorterSlice";

type SongsList = {
    song_id: string,
    song_name: string,
    album_id: string | null,
    album_name: string | null,
    track_numer: number | null,
    artist_id: string,
    artist_name: string,
    imgUrl: string,
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
    percent: number;
};

type Props = { 
    data: SongsList[], 
    type?: "CHAMPIONSHIP" | "ARTIST"
}

export default function SorterField({ data: songsList, type }: Props) {
    
    const artist = songsList[0]?.artist_name;
    const artistId = songsList[0]?.artist_id;
    
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter();
    
    const namMember = useRef<string[]>(songsList.map( item => item.song_name ));
    
    const [leftField, setLeftField] = useState<any>("");
    const [rightField, setRightField] = useState<any>("");

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
    const percent = useRef(0);

    //將歌曲分割成小單位
    function initList() {
        var n = 0;
        var mid;
        var i;
    
        lstMember.current[n] = [];
        for (i = 0; i < namMember.current.length; i++) {
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
    
        for (i = 0; i < namMember.current.length; i++) {
            rec.current[i] = 0;
        }
        nrec.current = 0;
    
        for (i = 0; i <= namMember.current.length; i++) {
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
                for (i = 0; i < namMember.current.length; i++) {
                    rec.current[i] = 0;
                }
                nrec.current = 0;
            }
        }
    
        if (cmp1.current < 0) {
            const percentage = Math.floor(finishSize.current * 100 / totalSize.current);
            dispatch(setPercentage(percentage));
            percent.current = percentage;
    
            showResult();
            finishFlag.current = 1;
        } else {
            saveHistory();
            showImage();
        }
    }
    
    //將歌名顯示於比較兩首歌曲的表格中
    function showImage() {
        const percentage = Math.floor(finishSize.current * 100 / totalSize.current);
        const leftField = "" + toNameFace(lstMember.current[cmp1.current][head1.current]);
        const rightField = "" + toNameFace(lstMember.current[cmp2.current][head2.current]);

        const leftFieldData = songsList.find( item => item.song_name === leftField);
        const rightFieldData = songsList.find( item => item.song_name === rightField);
        setLeftField(leftFieldData);
        setRightField(rightFieldData);

        dispatch(setPercentage(percentage));
        percent.current = percentage;
    }
    
    //將排序數字轉換成歌名
    function toNameFace(n: number) {
        var str = namMember.current[n];
        return str;
    }

    //紀錄當前變數與陣列資料，用於 sortList 中
    function recordHistory() {
        var prevState = {
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
            percent: percent.current,
        };
        history.current.push(prevState);
        localStorage.setItem(type === "CHAMPIONSHIP" ? "CHAMPIONSHIP" : artist, JSON.stringify(prevState));
    }

    //每次sort變儲存記錄到本地存儲
    function saveHistory() {
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
            namMember: namMember.current,
            percent: percent.current,
        };
        localStorage.setItem(type === "CHAMPIONSHIP" ? "CHAMPIONSHIP" : artist, JSON.stringify(currentState));
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
            percent.current = prevState.percent;
            showImage(); // Update the UI
        }
    }

    //刪除本地存儲資料
    function handleClear() {
        localStorage.removeItem(type === "CHAMPIONSHIP" ? "CHAMPIONSHIP" : artist);
        dispatch(clear());
        percent.current = 0;
    }

    //顯示最終排序結果
    function showResult() {
        var rankingNum = 1;
        var sameRank = 1;
        var str = "";
        var i: number;
        let resultArray = [];
    
        for (i = 0; i < namMember.current.length; i++) {            
            resultArray.push({
                ranking: rankingNum,
                song_name: namMember.current[lstMember.current[0][i]],
                song_id: songsList.find( item => item.song_name === namMember.current[lstMember.current[0][i]])!.song_id,
                album_name: songsList.find( item => item.song_name === namMember.current[lstMember.current[0][i]])!.album_name,
                artist_name: songsList.find( item => item.song_name === namMember.current[lstMember.current[0][i]])!.artist_name,
                artist_id: songsList.find( item => item.song_name === namMember.current[lstMember.current[0][i]])!.artist_id,
            })
            
            if (i < namMember.current.length - 1) {
                if (equal.current[lstMember.current[0][i]] == lstMember.current[0][i + 1]) {
                    sameRank++;
                } else {
                    rankingNum += sameRank;
                    sameRank = 1;
                }
            } 
        }
    
        for (i = 0; i < namMember.current.length; i++) {
            array.current[i] = namMember.current[lstMember.current[0][i]];
        }

        localStorage.removeItem(type === "CHAMPIONSHIP" ? "CHAMPIONSHIP" : artist);
        dispatch(setResult(resultArray));
        router.replace(type === "CHAMPIONSHIP" ? "/sorter/championship/result" : `/sorter/${artistId}/result`);
    }


    useEffect(() => {
        const historyString = localStorage.getItem(type === "CHAMPIONSHIP" ? "CHAMPIONSHIP" : artist);
        const history = historyString ? JSON.parse(historyString) : null;

        if (!history) {
            initList();
            showImage();
        } else {
            cmp1.current = history.cmp1;
            cmp2.current = history.cmp2;
            head1.current = history.head1;
            head2.current = history.head2;
            rec.current = history.rec;
            nrec.current = history.nrec;
            equal.current = history.equal;
            finishSize.current = history.finishSize;
            finishFlag.current = history.finishFlag;
            lstMember.current = history.lstMember; 
            parent.current = history.parent; 
            totalSize.current = history.totalSize;
            namMember.current = history.namMember;
            showImage();
        }

    }, []);
    
    //用鍵盤選擇歌曲
    const [pressedBtn, setPressedBtn] = useState<string>("");

    function handleKeyUp(e: KeyboardEvent): void {
        const key = e.key;
        if (key === "ArrowLeft") {
            if(finishFlag.current === 0 ) sortList(-1)
            setPressedBtn("")
        }
        if (key === "ArrowRight") {
            if(finishFlag.current === 0 ) sortList(1)
            setPressedBtn("")
        }
        if (key === "ArrowUp" || key === "ArrowDown") {
            if(finishFlag.current === 0 ) sortList(0)
            setPressedBtn("")
        }
        
    }

    function handleKeyDown(e: KeyboardEvent): void {
        const key = e.key;
        if (key === "ArrowLeft") {
            setPressedBtn("ArrowLeft")
        }
        if (key === "ArrowRight") {
            setPressedBtn("ArrowRight")
        }
        if (key === "ArrowUp") {
            setPressedBtn("ArrowUp")
        }
        if (key === "ArrowDown") {
            setPressedBtn("ArrowDown")
        }
    }
    
    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);
    
        return function cleanup() {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        };
    }, [handleKeyUp]);

    return( 
        <div className={styles.sorterField}>
            
            <div className={styles.sorterButtonContainer}>
                <div>
                <button 
                    className={`${styles.sorterButton} ${pressedBtn==="ArrowLeft" ? styles.active : ""}`} 
                    onClick={() => {if(finishFlag.current === 0 ) sortList(-1)}}
                    onKeyDown={(e) => { console.log(e.key) }}
                >
                    <div className={styles.sorterCover}>
                        <Image 
                            src={leftField.imgUrl || "/pic/placeholder.jpg"} 
                            fill
                            sizes="(max-width: 600px) 100vw, 50vw"
                            priority 
                            alt="cover"
                        />
                    </div>
                    <div>
                        <p className={styles.mainText}>{leftField.song_name}</p>
                        <p className={styles.subText}>{leftField.album_name || "Non-album track"}</p>
                    </div> 

                </button>
                </div>

                <div>
                    <button className={`${styles.sorterButton} ${pressedBtn==="ArrowUp" ? styles.active : ""}`}  onClick={() => {if(finishFlag.current === 0 ) sortList(0)}}>i like both</button>
                    <button className={`${styles.sorterButton} ${pressedBtn==="ArrowDown" ? styles.active : ""}`}  onClick={() => {if(finishFlag.current === 0 ) sortList(0)}}>no opinion</button>
                </div> 

                <div> 
                <button 
                    className={`${styles.sorterButton} ${pressedBtn==="ArrowRight" ? styles.active : ""}`} 
                    onClick={() => {if(finishFlag.current === 0 ) sortList(1)}}
                >
                    <div className={styles.sorterCover}>
                        <Image 
                            src={rightField.imgUrl || "/pic/placeholder.jpg"} 
                            fill
                            sizes="(max-width: 600px) 100vw, 50vw"
                            priority 
                            alt="cover"
                        />
                    </div>
                    <div>
                        <p className={styles.mainText}>{rightField.song_name}</p>
                        <p className={styles.subText}>{rightField.album_name || "Non-album track"}</p>
                    </div>
                    

                </button>
                </div>
            </div>

            <FlexContainer justify="space-between">
                <RecButton 
                    variant="onBackground"
                    onClick={restorePreviousState}
                    gap={20}
                    padding="25 30"
                >
                    <PreviousIcon size={15} />
                    Previous Step
                </RecButton>

                <Link href={type === "CHAMPIONSHIP" ? "/sorter/championship/filter" : `/sorter/${artistId}/filter`} replace>
                    <RecButton 
                        variant="onBackground"
                        onClick={handleClear}
                        padding="25 30"
                    >
                        Clear and Restart
                    </RecButton>
                </Link>
                

            </FlexContainer>

        </div>
    )
}