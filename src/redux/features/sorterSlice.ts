import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ResultType = { 
    album_name: string | null, 
    artist_id: string, 
    artist_name: string, 
    ranking: number,
    song_id: string, 
    song_name: string, 
}

type SorterState = {
    isStart: boolean,
    selectedSongs: string[],
    percentage: null | number
    result: ResultType[],
}

const initialState: SorterState = {
    isStart: false,
    selectedSongs: [],
    result: [],
    percentage: null,
}

const sorterSlice = createSlice({
    name: "sorter",
    initialState,
    reducers: {
        selectSongs: (state, action: PayloadAction<string[]>) => {
            state.isStart = true,
            state.selectedSongs = action.payload
        },
        setPercentage: (state, action: PayloadAction<number>) => {
            state.percentage = action.payload
        },
        setResult: (state, action: PayloadAction<ResultType[]>) => {
            state.result = action.payload
            state.percentage = 100
        },
        clear: (state) => {
            state.isStart = false,
            state.selectedSongs = [],
            state.result = [],
            state.percentage = 0
        },
    }
});

export const { selectSongs, setPercentage, setResult, clear } = sorterSlice.actions;
export default sorterSlice.reducer;