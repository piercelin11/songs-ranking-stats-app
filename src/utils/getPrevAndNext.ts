import { sortBy } from "./helper";

 
export default function getPrevAndNext(data: any[], forSort: string, benchmark: string | number) {
    const sortedData = sortBy(data, forSort, "ASC");
    const index = sortedData.findIndex( item => item[forSort] == benchmark);

    const previous = sortedData[index - 1] ?? sortedData[sortedData.length - 1];
    const next = sortedData[index + 1] ?? sortedData[0];

    return ({previous, next})
}