import { notFound } from "next/navigation";
import { fetchAllDates, fetchPeakAndAvg, fetchPrevAvg, fetchSongs, fetchSong } from "../prisma"

type AvgSongsData = {
    song_id: number,
    song_name: string,
    artist_name: string,
    artist_id: number,
    ranking: number,
    previous_ranking: number | null,
    average_ranking: number,
    peak: number,
    album_id: number,
    album_name: string,
    album_color: string | null,
    track_number: number | null,
    times_in_top_100: number,
    times_in_top_10: number,
    times_in_top_1: number,
    total_chart_run: number | null,
    all_rankings: {ranking: number, date: Date, date_id: number}[],
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
            artist_name: resultItem.artist.artist_name,
            artist_id: resultItem.artist_id,
            ranking: ranking + 1,
            previous_ranking:  prevRanking === -1 ? null : prevRanking + 1,
            average_ranking: findPeakAndAvg?.average_ranking ?? NaN,
            peak: findPeakAndAvg?.peak ?? NaN,
            album_id: resultItem.album_id,
            album_name: resultItem.albums.album_name,
            album_color: resultItem.albums.album_color,
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
    
    //count songs in each albums
    const countAlbumsSongsArray = avgSongsRanking.reduce((acc: any[], cur) => {

        const existedAlbum = acc.find( item => item.album_name === cur.album_name );

        if (existedAlbum) {
            existedAlbum.count_songs ++
        } else {
            acc.push({
                album_name: cur.album_name,
                count_songs: 1
            })
        }

        return acc;
    }, []);
    
    //result
    const avgAlbumsRanking = avgSongsRanking.reduce((acc: any[], cur) => {

        const existedAlbum = acc.find( item => item.album_name === cur.album_name );
        const countAlbumsSongs = countAlbumsSongsArray.find( item => item.album_name === cur.album_name )?.count_songs;

        if (existedAlbum) {
                existedAlbum.count_times_in_top_100 += cur.times_in_top_100;
                existedAlbum.count_times_in_top_10 += cur.times_in_top_10;
                existedAlbum.count_times_in_top_1 += cur.times_in_top_1;
                if (cur.ranking <= countSongs / 4) 
                    existedAlbum.count_songs_in_25perc ++;
                if (cur.ranking <= countSongs / 2) 
                    existedAlbum.count_songs_in_50perc ++;
                if (cur.ranking <= countSongs / 2) {
                    existedAlbum.total_points_raw += (countSongs / 2 - cur.ranking);
                    existedAlbum.total_points += Math.floor((countSongs / 2 - cur.ranking) / countAlbumsSongs) * 20;
                }
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
                total_points: cur.ranking <= countSongs / 2 ? Math.floor((countSongs / 2 - cur.ranking) / countAlbumsSongs) * 20  : 0,
                total_points_raw: cur.ranking <= countSongs / 2 ? countSongs / 2 - cur.ranking : 0,
            })
        }

        return acc;
    }, []);

    return avgAlbumsRanking.sort( (a, b) => b.total_points - a.total_points );
}



type AllDatesData = {
    date_id: number,
    date: Date,
    info: string | null,
    type: "OVERALL" | "ALBUM",
    artist_name: string,
    rankings: {
        song_name: string,
        album_name: string,
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
        artist_name: item.rankings[0].songs.artist.artist_name,
        rankings: item.rankings.map( rankingsItem => ({
            song_name: rankingsItem.songs.song_name,
            album_name: rankingsItem.songs.albums.album_name,
            ranking: rankingsItem.ranking,
        }))
    }));
    
    return result;
}



type AvgSongData = {
    song_id: number,
    song_name: string,
    artist_name: string,
    artist_id: number,
    ranking: number,
    previous_ranking: number | null,
    average_ranking: number,
    peak: number,
    album_id: number,
    album_name: string,
    album_color: string | null,
    track_number: number | null,
    times_in_top_100: number,
    times_in_top_10: number,
    times_in_top_1: number,
    total_chart_run: number | null,
    all_rankings: {ranking: number, date: Date, date_id: number}[],
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


