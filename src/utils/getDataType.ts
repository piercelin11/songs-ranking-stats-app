
export default function getDataType(data: Record<string, unknown> = {}) { 
    const { song_id, song_name, album_id, album_name, artist_id, artist_name, release_date } = data as {
        song_id: string,
        song_name: string,
        album_id: string,
        album_name: string,
        artist_id: string,
        artist_name: string,
        release_date: Date
    }

    if (song_name) {
        return {
            type: "song", 
            id: song_id,  
            title: song_name, 
            subtitle: album_name
        }
    } else if (album_name) {
        return {
            type: "album", 
            id: album_id, 
            title: album_name, 
            subtitle: release_date ? release_date.getFullYear() : ""
        }
    } else {
        return {
            type: "artist", 
            id: artist_id, 
            title: artist_name, 
            subtitle: release_date ? release_date.getFullYear() : ""
        }
    }
}