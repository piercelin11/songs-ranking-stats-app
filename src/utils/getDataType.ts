
export default function getDataType(data: Record<string, unknown> = {}) { 
    const { song_id, song_name, album_id, album_name } = data as {
        song_id: number,
        song_name: string,
        album_id: number,
        album_name: string,
    }

    if (song_id) {
        return {
            type: "song", 
            id: song_id,  
            name: song_name, 
            subname: album_name
        }
    } else {
        return {
            type: "album", 
            id: album_id, 
            name: album_name, 
            subname: null
        }
    }
}