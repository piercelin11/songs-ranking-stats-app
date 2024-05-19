export default function createPageNumber(selectedPage : number, totalPage: number) {
    if (selectedPage < 3 ) {
        return [1, 2, 3, 4, 5]; 
    } else if (selectedPage > (totalPage - 3)) {
        return [totalPage - 4, totalPage - 3, totalPage - 2, totalPage - 1, totalPage];
    } else {
        return [selectedPage - 2, selectedPage - 1, selectedPage, selectedPage + 1, selectedPage + 2];
    }
} 