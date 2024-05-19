import { alterDateFormatToLong } from "./alterDateFormat";


export function createOptions(data: any[], id: number | string, name: number | string, hasSelectAll: boolean) {

    const options = data.map( 
        item => ({
            id: item[id],
            name: name === "date" ? alterDateFormatToLong(item[name]) : item[name],
            color: item["album_color"] ?? null,
            album_id: item["album_id"] ?? null,
        }
    ));

    if (hasSelectAll) return [{id: "all", name: "Select All"}, ...options];
    return options;
}


export function sortBy(data: any[], forSort: keyof typeof data[0], order: "ASC" | "DESC") {
    const sorted = data.sort((a, b) => {
        if (a[forSort] === null && b[forSort] === null) {
            return 0;
        } else if (a[forSort] === null) {
            return 1;
        } else if (b[forSort] === null) {
            return -1;
        } else if (typeof a[forSort] === "string" && typeof b[forSort] === "string" && forSort === "date") {
            return order === "ASC" 
                ? new Date(a[forSort]).getTime() - new Date(b[forSort]).getTime()
                : new Date(b[forSort]).getTime() - new Date(a[forSort]).getTime();
        } else if (typeof a[forSort] === "number" && typeof b[forSort] === "number") {
            return order === "ASC" ? a[forSort] - b[forSort] : b[forSort] - a[forSort];
        } else {
            return 0;
        }
    });

    return sorted;
}

export function filterBy(data: any[], forFilter: keyof typeof data[0], benchmark: number | string) {

    const filtered = data.filter( item => item[forFilter] === benchmark);

    return filtered; 
}

export function findUnique(data: any[], forUnique?: keyof typeof data[0]) {
    const uniqueObjectArray = data.reduce((acc: any[], cur) => {
        if(forUnique){
            const existed = acc.find( item => item[forUnique] === cur[forUnique] );

            if (!existed) {
                acc.push(cur);
            }
            return acc
        } else {
            const existed = acc.find( item => item === cur );

            if (!existed) {
                acc.push(cur);
            }
            return acc
        }
    }, []);

    return uniqueObjectArray;
}

export function findUniqueAndSort(data: any[], forSort: keyof typeof data[0], order: "ASC" | "DESC") {
    const unique = findUnique(data, forSort);
    const sortedAndUnique = sortBy(unique, forSort, order);

    return sortedAndUnique;
}

export function sortSongsOrder(data: any[]) {
    const sortData = data.sort((a, b) => {
        const aAlbumId = a.album_id === 0 ? Infinity : a.album_id;
        const bAlbumId = b.album_id === 0 ? Infinity : b.album_id;
      
        if (aAlbumId === bAlbumId) {
          if (a.track_number && b.track_number) {
            return a.track_number - b.track_number;
          } else {
            return a.song_id - b.song_id;
          }
        } else {
          return aAlbumId - bAlbumId;
        }
    });

    return sortData;
}


export function createUniqueOptions(data: any[], id: number | string, name: number | string, order: "ASC" | "DESC", hasSelectAll: boolean) {
    const dateList = findUnique(data, id);
    const sortDateList = sortBy(dateList, id, order);
    const uniqueOptions = createOptions(sortDateList, id, name, hasSelectAll);

    return uniqueOptions;
} 