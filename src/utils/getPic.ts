
function toFileName(str: string): string | null {
    if (!str) return null

    const fileName = str.toLowerCase().replace(/ /g, '-');
    return fileName;
}

export function getCover(artist: string, album: string, song: string = "" ): string {
    const artistName = toFileName(artist);
    const albumName = toFileName(album);
    const songName = toFileName(song);

    if (!artistName || !albumName)
        return "/pic/image-not-found.jpg"

    if (albumName === "single")
        return (`/pic/${artistName}/single/${songName}.jpg`)
    else 
        return (`/pic/${artistName}/album/${albumName}.jpg`)
}

export function getPhotoshoot(artist: string, album: string ): string {
    const artistName = toFileName(artist);
    const albumName = toFileName(album);

    if (!artistName || !albumName)
        return "/pic/image-not-found.jpg"

    return (`/pic/${artistName}/photoshoot/${albumName}.jpg`);
}

export function getBanner(artist: string ): string {
    const artistName = toFileName(artist);

    if (!artistName)
        return "/pic/image-not-found.jpg"

    return (`/pic/${artistName}/banner.jpg`);
}