
function toFileName(str: string | null): string | null {
    if (!str) return null

    const fileName = str.toLowerCase().replace(/[^\w\s]/gi, '').trim().replace(/ /g, '-');
    return fileName;
}

export function getCover(artist: string, album: string | null, song: string = "" ): string {
    const artistName = toFileName(artist);
    const albumName = toFileName(album);
    const songName = toFileName(song);

    if (!artistName)
        return "/pic/not-found.jpg"

    if (!albumName)
        return (`/pic/${artistName}/single/${songName}.jpg`)
    else 
        return (`/pic/${artistName}/album/${albumName}.jpg`)
}

export function getPhotoshoot(artist: string, album: string ): string {
    const artistName = toFileName(artist);
    const albumName = toFileName(album);

    if (!artistName)
        return "/pic/not-found.jpg"
    if (!albumName)
        return `/pic/${artistName}/profile.jpg`

    return (`/pic/${artistName}/photoshoot/${albumName}.jpg`);
}

export function getBanner(artist: string ): string {
    const artistName = toFileName(artist);

    if (!artistName)
        return "/pic/not-found.jpg"

    return (`/pic/${artistName}/banner.jpg`);
}

export function getProfile(artist: string ): string {
    const artistName = toFileName(artist);

    if (!artistName)
        return "/pic/not-found.jpg"

    return (`/pic/${artistName}/profile.jpg`);
}