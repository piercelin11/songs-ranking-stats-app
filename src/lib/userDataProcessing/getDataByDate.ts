import { calculateAlbumPoints } from "./getDataByArtist";
import { fetchPeakAndAvg, fetchPrevDates, fetchPrevRanking, fetchSongsByDate } from "./prismaFetching";

export type SongsRankingData = {
    song_id: string,
    song_name: string,
    artist_id: string,
    artist_name: string,
    album_id: string | null,
    album_name: string | null,
    album_color: string | null,
    date_id: string,
    date: Date,
    info: string | null,
    ranking: number,
    previous_ranking: number | null,
    peak: number,
    difference: number | null
}
 
export async function getSongsByDates (artistId: string, dateId: string): Promise<SongsRankingData[]>  {
    const songs = await fetchSongsByDate(artistId, dateId);
    const peak = await fetchPeakAndAvg(artistId);
    const prevRanking = await fetchPrevRanking(artistId, dateId); 

    const result = songs.map( resultItem => {
        const findPeak = peak.find( item => item.song_id === resultItem.song_id );
        const findPrevRanking = prevRanking?.find( item => item.song_id === resultItem.song_id );

        return ({
            song_id: resultItem.song_id,
            song_name: resultItem.songs.song_name,
            artist_id: resultItem.songs.artists.id,
            artist_name: resultItem.songs.artists.artist_name,
            album_id: resultItem.songs.albums?.id ?? null,
            album_name: resultItem.songs.albums?.album_name ?? null,
            album_color: resultItem.songs.albums?.album_color ?? null,
            date_id: resultItem.date_id,
            date: resultItem.dates.date,
            info: resultItem.dates.info,
            ranking: resultItem.ranking,
            previous_ranking: findPrevRanking?.ranking ?? null,
            peak: findPeak?.peak ?? NaN,
            difference: findPrevRanking ? findPrevRanking?.ranking - resultItem.ranking : null
        })

    });

    return result;
}



export type AlbumsRankingData = {
    album_id: number,
    album_name: string,
    album_color: string | null,
    artist_name: string,
    artist_id: string,
    count_times_in_top_100: number,
    count_times_in_top_10: number,
    count_times_in_top_1: number,
    count_songs_in_25perc: number,
    count_songs_in_50perc: number,
    total_points: number, 
    previous_total_points: number | null,
    total_points_raw: number
}

export async function getAlbumsByDates(artistId: string, dateId: string): Promise<AlbumsRankingData[]> {
    const songsRanking = await getSongsByDates(artistId, dateId);
    const prevDate = await fetchPrevDates(artistId, dateId);
    const prevSongsRanking = await getSongsByDates(artistId, prevDate?.id);

    const countSongs = songsRanking.length;
    const countPrevSongs = prevSongsRanking.length;

    // 計算當前每個專輯中的歌曲數量
    const countAlbumsSongsArray = songsRanking.reduce((acc: any[], cur) => {
        const existedAlbum = acc.find(item => item.album_name === cur.album_name);
        if (existedAlbum) {
            existedAlbum.count_songs++;
        } else {
            acc.push({
                album_name: cur.album_name,
                count_songs: 1
            });
        }
        return acc;
    }, []);

    // 計算之前每個專輯中的歌曲數量
    const countAlbumsPrevSongsArray = prevSongsRanking.reduce((acc: any[], cur) => {
        const existedAlbum = acc.find(item => item.album_name === cur.album_name);
        if (existedAlbum) {
            existedAlbum.count_songs++;
        } else {
            acc.push({
                album_name: cur.album_name,
                count_songs: 1
            });
        }
        return acc;
    }, []);

    // 結果
    const avgAlbumsRanking = songsRanking.filter(item => item.album_id !== null).reduce((acc: any[], cur) => {
        const existedAlbum = acc.find(item => item.album_name === cur.album_name);
        const countAlbumsSongs = countAlbumsSongsArray.find(item => item.album_name === cur.album_name)?.count_songs;
        const countAlbumsPrevSongs = countAlbumsPrevSongsArray.find(item => item.album_name === cur.album_name)?.count_songs;

        // 計算當前百分比排名
        const {score, adjustedScore} = calculateAlbumPoints(cur.ranking, countSongs, countAlbumsSongs);
        const rawScore = Math.floor(score! / (countSongs / countAlbumsSongsArray.length));

        // 計算之前百分比排名
        const {adjustedScore: prevAdjustedScore} = calculateAlbumPoints(cur.previous_ranking, countPrevSongs, countAlbumsPrevSongs);


        if (existedAlbum) {
            if (cur.ranking <= countSongs / 4) 
                existedAlbum.count_songs_in_25perc++;
            if (cur.ranking <= countSongs / 2) 
                existedAlbum.count_songs_in_50perc++;
            
            existedAlbum.previous_total_points += prevAdjustedScore;
            existedAlbum.total_points_raw += rawScore;
            existedAlbum.total_points += adjustedScore;
        } else {
            acc.push({
                album_id: cur.album_id,
                album_name: cur.album_name,
                album_color: cur.album_color,
                artist_id: cur.artist_id,
                artist_name: cur.artist_name,
                count_songs_in_25perc: cur.ranking <= countSongs / 4 ? 1 : 0,
                count_songs_in_50perc: cur.ranking <= countSongs / 2 ? 1 : 0,
                total_points: adjustedScore,
                previous_total_points: cur.previous_ranking ? prevAdjustedScore : 0,
                total_points_raw: rawScore,
            });
        }

        return acc;
    }, []);

    return avgAlbumsRanking.sort((a, b) => b.total_points - a.total_points);
}


export type ChampSongsRankingData = {
    song_id: string,
    song_name: string,
    artist_id: string,
    artist_name: string,
    album_id: string | null,
    album_name: string | null,
    album_color: string | null,
    date_id: string,
    date: Date,
    info: string | null,
    ranking: number
}
 
export async function getChampSongsByDates (dateId: string): Promise<ChampSongsRankingData[]>  {
    const songs = await fetchSongsByDate(null, dateId, "CHAMPIONSHIP");

    const result = songs.map( resultItem => {

        return ({
            song_id: resultItem.song_id,
            song_name: resultItem.songs.song_name,
            artist_id: resultItem.songs.artists.id,
            artist_name: resultItem.songs.artists.artist_name,
            album_id: resultItem.songs.albums?.id ?? null,
            album_name: resultItem.songs.albums?.album_name ?? null,
            album_color: resultItem.songs.albums?.album_color ?? null,
            date_id: resultItem.date_id,
            date: resultItem.dates.date,
            info: resultItem.dates.info,
            ranking: resultItem.ranking,
        })

    });

    return result;
}


export type ChampAlbumsRankingData = {
    album_id: number,
    album_name: string,
    album_color: string | null,
    artist_name: string,
    artist_id: string,
    count_songs_in_25perc: number,
    count_songs_in_50perc: number,
    total_points: number, 
    total_points_raw: number
}

export async function getChampAlbumsByDates(dateId: string): Promise<ChampAlbumsRankingData[]> {
    const songsRanking = await getChampSongsByDates(dateId);

    const countSongs = songsRanking.length;

    // 計算當前每個專輯中的歌曲數量
    const countAlbumsSongsArray = songsRanking.reduce((acc: any[], cur) => {
        const existedAlbum = acc.find(item => item.album_name === cur.album_name);
        if (existedAlbum) {
            existedAlbum.count_songs++;
        } else {
            acc.push({
                album_name: cur.album_name,
                count_songs: 1
            });
        }
        return acc;
    }, []);

    // 結果
    const avgAlbumsRanking = songsRanking.filter(item => item.album_id !== null).reduce((acc: any[], cur) => {
        const existedAlbum = acc.find(item => item.album_name === cur.album_name);
        const countAlbumsSongs = countAlbumsSongsArray.find(item => item.album_name === cur.album_name)?.count_songs;

        // 計算當前百分比排名
        const {score, adjustedScore} = calculateAlbumPoints(cur.ranking, countSongs, countAlbumsSongs);
        const rawScore = Math.floor(score! / (countSongs / countAlbumsSongsArray.length));


        if (existedAlbum) {
            if (cur.ranking <= countSongs / 4) 
                existedAlbum.count_songs_in_25perc++;
            if (cur.ranking <= countSongs / 2) 
                existedAlbum.count_songs_in_50perc++;

            existedAlbum.total_points_raw += rawScore;
            existedAlbum.total_points += adjustedScore;
        } else {
            acc.push({
                album_id: cur.album_id,
                album_name: cur.album_name,
                album_color: cur.album_color,
                artist_id: cur.artist_id,
                artist_name: cur.artist_name,
                count_songs_in_25perc: cur.ranking <= countSongs / 4 ? 1 : 0,
                count_songs_in_50perc: cur.ranking <= countSongs / 2 ? 1 : 0,
                total_points: adjustedScore,
                total_points_raw: rawScore,
            });
        }

        return acc;
    }, []);

    return avgAlbumsRanking.sort((a, b) => b.total_points - a.total_points);
}


export type ChampArtistRankingData = {
    artist_name: string,
    artist_id: string,
    count_songs_in_25perc: number,
    count_songs_in_50perc: number,
    artist_points: number, 
}

export async function getChampArtistByDates(dateId: string): Promise<ChampArtistRankingData[]>  {
    const albumRanking = await getChampAlbumsByDates(dateId);

    const artistRanking = albumRanking.reduce((acc: ChampArtistRankingData[], cur) => {
        const existedArtist = acc.find( item => item.artist_id === cur.artist_id );

        if (existedArtist) {
            existedArtist.artist_points += cur.total_points;
            existedArtist.count_songs_in_25perc += cur.count_songs_in_25perc;
            existedArtist.count_songs_in_50perc += cur.count_songs_in_50perc;
        } else {
            acc.push({
                artist_id: cur.artist_id,
                artist_name: cur.artist_name,
                artist_points: cur.total_points,
                count_songs_in_25perc: cur.count_songs_in_25perc,
                count_songs_in_50perc: cur.count_songs_in_50perc,
            })
        }

        return acc
    }, [])

    return artistRanking.sort((a, b) => b.artist_points - a.artist_points);
}