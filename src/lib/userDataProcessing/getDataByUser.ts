import { calculateAlbumPoints } from "./getDataByArtist";
import { fetchAllDatesByUser, fetchAllSongs, fetchArtistByUser, fetchPeakAndAvg, fetchSongs } from "./prismaFetching";


export type ArtistLogCount = {
    artist_id: string,
    artist_name: string,
    count_logs: number,
}

export async function getArtistByUser(): Promise<ArtistLogCount[]> {
    const allDates = await fetchArtistByUser();

    const rawResult = allDates.reduce( (acc: any[], cur) => {
        const existedArtist = acc.find(item => item.artist_name === cur.artist_name);
        if (existedArtist) {
            existedArtist.count_logs++;
        } else {
            acc.push({
                artist_id: cur.artist_id,
                artist_name: cur.artist_name,
                count_logs: 1
            });
        }
        return acc;
    }, []);

    const result = rawResult.reduce( (acc: any[], cur) => {
        const boygenius = ["56f75caa-407f-4032-86fd-e1341b9a5532", "eba8588b-6256-401e-9fec-0696a910ced1", "46f6c0a0-df49-4c28-897e-da4f23c817ea", "1cbc780e-c60d-410f-9e9e-fe835d13d493"];
        const isBoygenius = boygenius.includes(cur.artist_id);

        if (!isBoygenius) {
            acc.push(cur);
        } else {
            acc.push({
                artist_id: "56f75caa-407f-4032-86fd-e1341b9a5532",
                artist_name: "boygenius",
                count_logs: cur.count_logs
            });
        }
        return acc;
    }, []);


    return result;
}



export async function getAllSongs() {
    const songsAvg = await fetchPeakAndAvg();
    const allSongs = await fetchAllSongs();

    const result = allSongs.map( resultItem => {
        const findPeakAndAvg = songsAvg.find( item => item.song_id === resultItem.id );

        return ({
            song_id: resultItem.id,
            song_name: resultItem.song_name,
            artist_name: resultItem.artists.artist_name,
            artist_id: resultItem.artist_id,
            album_release_date: resultItem.albums?.release_date,
            average_ranking: findPeakAndAvg?.average_ranking ?? NaN,
            album_id: resultItem.album_id ?? null,
            album_name: resultItem.albums?.album_name ?? null,
            album_color: resultItem.albums?.album_color ?? null,
            count_artist_songs: resultItem.artists.songs.length,
            count_album_songs: resultItem.albums?.songs.length ?? null,
        })
    });

    return result;
}



export type AllAbumsPoints = {
    album_id: string,
    album_name: string,
    album_color: string,
    artist_name: string,
    artist_id: string,
    total_points: number,
    release_date: Date | null,
}

export async function getAllAlbums(): Promise<AllAbumsPoints[]> {
    const songs = await getAllSongs();

    //計算歌曲的排名
    const songsWithRanking = songs.map( rankingItem => {
        const artistSongs = songs.filter( item => item.artist_id === rankingItem.artist_id).sort((a, b) => a.average_ranking - b.average_ranking);
        const ranking = artistSongs.findIndex( item => item.song_id === rankingItem.song_id ) + 1;

        return ({...rankingItem, ranking});
    })


    // 計算專輯的平均排名
    const allAlbumsPoints = songsWithRanking.reduce((acc: any[], cur) => {
        const existedAlbum = acc.find(item => item.album_name === cur.album_name);
        
        const {score, adjustedScore} = calculateAlbumPoints(cur.ranking, cur.count_artist_songs, cur.count_album_songs);

        if (existedAlbum) {
            existedAlbum.total_points += adjustedScore;
            
        } else {
            acc.push({
                album_id: cur.album_id,
                album_name: cur.album_name,
                album_color: cur.album_color,
                artist_id: cur.artist_id,
                artist_name: cur.artist_name,
                total_points: adjustedScore,
                release_date: cur.album_release_date,
            });
        }

        return acc;
    }, []);

    return allAlbumsPoints.sort( (a, b) => b.total_points - a.total_points );
}


export type AllDatesData = {
    date_id: string,
    date: Date,
    info: string | null,
    type: "ARTIST" | "ALBUM" | "FRIENDLY_MATCH" | "CHAMPIONSHIP" | "OVERALL",
    artist_name: string | null,
    artist_id: string | null,
    rankings: {
        song_name: string,
        artist_name: string,
        album_name: string | null,
        ranking: number,
        release_date: Date | null,
    }[]
}

export async function getAllDatesByUser (datesTake?: number, rankingsTake?: number): Promise<AllDatesData[]> {
      
    const allDates = await fetchAllDatesByUser(datesTake, rankingsTake);

    const result = allDates.map( item => ({
        date_id: item.id,
        date: item.date,
        info: item.info,
        type: item.type, 
        artist_name: item.type === "CHAMPIONSHIP" ? null : item.rankings[0].songs.artists.artist_name,
        artist_id: item.type === "CHAMPIONSHIP" ? null :item.rankings[0].songs.artists.id,
        rankings: item.rankings.map( rankingsItem => ({
            song_name: rankingsItem.songs.song_name,
            album_name: rankingsItem.songs.albums?.album_name ?? null,
            artist_name: rankingsItem.songs.artists.artist_name,
            release_date: rankingsItem.songs.albums?.release_date || rankingsItem.songs.release_date,
            ranking: rankingsItem.ranking,
        }))
    }));
    
    return result;
}