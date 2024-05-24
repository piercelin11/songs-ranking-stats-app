import { notFound } from "next/navigation";
import { fetchAllDates, fetchPeakAndAvg, fetchPrevAvg, fetchSongs, fetchSong, fetchSongsList } from "./prismaFetching"

type AvgSongsData = {
    song_id: string,
    song_name: string,
    artist_name: string,
    artist_id: string,
    ranking: number,
    previous_ranking: number | null,
    average_ranking: number,
    peak: number,
    album_id: string | null,
    album_name: string | null,
    album_color: string | null,
    track_number: number | null,
    times_in_top_100: number,
    times_in_top_10: number,
    times_in_top_1: number,
    total_chart_run: number | null,
    all_rankings: {ranking: number, date: Date, date_id: string}[],
    difference: number | null
}
 
export async function getAvgSongsRanking(artistId: number | string, take?: number): Promise<AvgSongsData[]> {

    const songs = await fetchSongs(artistId, take);
    const peakAndAvg = await fetchPeakAndAvg(artistId);
    const prevAvg = await fetchPrevAvg(artistId);

    const result = songs.map( resultItem => {
        const findPeakAndAvg = peakAndAvg.find( item => item.song_id === resultItem.id );

        const ranking = peakAndAvg.findIndex( item => item.song_id === resultItem.id );
        const prevRanking = prevAvg.findIndex( item => item.song_id === resultItem.id );

        return ({
            song_id: resultItem.id,
            song_name: resultItem.song_name,
            artist_name: resultItem.artists.artist_name,
            artist_id: resultItem.artist_id,
            ranking: ranking + 1,
            previous_ranking:  prevRanking === -1 ? null : prevRanking + 1,
            average_ranking: findPeakAndAvg?.average_ranking ?? NaN,
            peak: findPeakAndAvg?.peak ?? NaN,
            album_id: resultItem.album_id,
            album_name: resultItem.albums?.album_name ?? null,
            album_color: resultItem.albums?.album_color ?? null,
            track_number: resultItem.track_number,
            times_in_top_100: resultItem.rankings.filter( item => item.ranking <= 100 ).length,
            times_in_top_10: resultItem.rankings.filter( item => item.ranking <= 10 ).length,
            times_in_top_1: resultItem.rankings.filter( item => item.ranking === 1 ).length,
            total_chart_run: prevRanking === -1 ?  null : resultItem.rankings.reduce((acc, cur, index, array) => {
                if (index === 0) {
                  return acc;
                }
                return acc + Math.abs(cur.ranking - array[index - 1].ranking);
              }, 0),
            all_rankings: resultItem.rankings.map( item => ({
                date_id: item.date_id,
                date: item.dates.date,
                ranking: item.ranking
            })),
            difference: prevRanking !== -1 ? prevRanking - ranking : null
        })
    });


    return result.sort((a, b) => a.ranking - b.ranking);
}

 

type AvgAlbumsData = {
    album_id: number,
    album_name: string,
    album_color: string | null,
    artist_name: string,
    count_times_in_top_100: number,
    count_times_in_top_10: number,
    count_times_in_top_1: number,
    count_songs_in_25perc: number,
    count_songs_in_50perc: number,
    total_points: number, 
    total_points_raw: number
}
export async function getAvgAlbumsRanking(artistId: number | string): Promise<AvgAlbumsData[]> {
    
    const avgSongsRanking = await getAvgSongsRanking(artistId);
    const countSongs = avgSongsRanking.length;
    
    // 計算每個專輯中的歌曲數量
    const countAlbumsSongsArray = avgSongsRanking.reduce((acc: any[], cur) => {
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
    
    // 計算專輯的平均排名
    const avgAlbumsRanking = avgSongsRanking.filter(item => item.album_id !== null).reduce((acc: any[], cur) => {
        const existedAlbum = acc.find(item => item.album_name === cur.album_name);
        const countAlbumsSongs = countAlbumsSongsArray.find(item => item.album_name === cur.album_name)?.count_songs;

        // 計算百分比排名
        const percentileRank = (countSongs - cur.ranking + 1) / countSongs;

        // 計算分數
        let score = percentileRank > 0.5 ? percentileRank * 1000 : 0;

        // 調整分數
        const adjustedScore = Math.floor(score / countAlbumsSongs);
        const rawScore = Math.floor(score / (countSongs / countAlbumsSongsArray.length));

        if (existedAlbum) {
            existedAlbum.count_times_in_top_100 += cur.times_in_top_100;
            existedAlbum.count_times_in_top_10 += cur.times_in_top_10;
            existedAlbum.count_times_in_top_1 += cur.times_in_top_1;
            existedAlbum.total_points_raw += rawScore;
            existedAlbum.total_points += adjustedScore;
            
            if (cur.ranking <= countSongs / 4) 
                existedAlbum.count_songs_in_25perc++;
            if (cur.ranking <= countSongs / 2) 
                existedAlbum.count_songs_in_50perc++;
            
        } else {
            acc.push({
                album_id: cur.album_id,
                album_name: cur.album_name,
                album_color: cur.album_color,
                artist_name: cur.artist_name,
                count_songs_in_25perc: cur.ranking <= countSongs / 4 ? 1 : 0,
                count_songs_in_50perc: cur.ranking <= countSongs / 2 ? 1 : 0,
                count_times_in_top_100: cur.times_in_top_100,
                count_times_in_top_10: cur.times_in_top_10,
                count_times_in_top_1: cur.times_in_top_1,
                total_points: adjustedScore,
                total_points_raw: rawScore,
            });
        }

        return acc;
    }, []);

    return avgAlbumsRanking.sort((a, b) => b.total_points - a.total_points);
}



type AllDatesData = {
    date_id: string,
    date: Date,
    info: string | null,
    type: "OVERALL" | "ALBUM",
    artist_name: string,
    rankings: {
        song_name: string,
        album_name: string | null,
        ranking: number,
    }[]
}

export async function getAllDates (artistId: number | string, take?: number): Promise<AllDatesData[]> {
     
    const allDates = await fetchAllDates(artistId, take);

    const result = allDates.map( item => ({
        date_id: item.id,
        date: item.date,
        info: item.info,
        type: item.type,
        artist_name: item.rankings[0].songs.artists.artist_name,
        rankings: item.rankings.map( rankingsItem => ({
            song_name: rankingsItem.songs.song_name,
            album_name: rankingsItem.songs.albums?.album_name ?? null,
            ranking: rankingsItem.ranking,
        }))
    }));
    
    return result;
}



type AvgSongData = {
    song_id: string,
    song_name: string,
    artist_name: string,
    artist_id: string,
    ranking: number,
    previous_ranking: number | null,
    average_ranking: number,
    peak: number,
    album_id: string | null,
    album_name: string | null,
    album_color: string | null,
    track_number: number | null,
    times_in_top_100: number,
    times_in_top_10: number,
    times_in_top_1: number,
    total_chart_run: number | null,
    all_rankings: {ranking: number, date: Date, date_id: string}[],
    difference: number | null
} 

export async function getAvgSongRanking(songId: number | string): Promise<AvgSongData> {

    const song = await fetchSong(songId);
    if (!song) notFound();

    const songs = await getAvgSongsRanking(song.artist_id);
    const result = songs.find( item => item.song_id == songId );

    if (!result) notFound();
    

    return result;
}


type SongsList = {
    song_id: string,
    song_name: string,
    album_id: string | null,
    album_name: string | null,
    track_numer: number | null,
    artist_id: string,
    artist_name: string,
}

export async function getSongsList(artist: number | string): Promise<SongsList[]> {
    
    const songsList = await fetchSongsList(artist);

    const result = songsList.map( item => ({
        song_id: item.id,
        song_name: item.song_name,
        album_id: item.album_id ?? null,
        album_name: item.albums?.album_name ?? null,
        track_numer: item.track_number,
        artist_id: item.artist_id,
        artist_name: item.artists.artist_name
    }))

    return result;
}
