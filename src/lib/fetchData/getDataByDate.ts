import { fetchPeakAndAvg, fetchPrevRanking, fetchSongsByDate } from "../prisma";

type SongsRankingData = {
    song_id: number,
    song_name: string,
    artist_name: string,
    album_id: number,
    album_name: string,
    album_color: string | null,
    date_id: number,
    date: Date,
    info: string | null,
    ranking: number,
    previous_ranking: number | null,
    peak: number,
    difference: number | null
}

export async function getSongsByDates (artistId: number | string, dateId: number | string): Promise<SongsRankingData[]>  {
    const songs = await fetchSongsByDate(artistId, dateId);
    const peak = await fetchPeakAndAvg(artistId);
    const prevRanking = await fetchPrevRanking(artistId, dateId);

    const result = songs.map( resultItem => {
        const findPeak = peak.find( item => item.song_id === resultItem.song_id );
        const findPrevRanking = prevRanking?.find( item => item.song_id === resultItem.song_id );

        return ({
            song_id: resultItem.song_id,
            song_name: resultItem.songs.song_name,
            artist_name: resultItem.songs.artist.artist_name,
            album_id: resultItem.songs.albums.id,
            album_name: resultItem.songs.albums.album_name,
            album_color: resultItem.songs.albums.album_color,
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



type AlbumsRankingData = {
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
    previous_total_points: number | null,
    total_points_raw: number
}

export async function getAlbumsByDates (artistId: number | string, dateId: number | string): Promise<AlbumsRankingData[]> {
    const songsRanking = await getSongsByDates(artistId, dateId);
    const countSongs = songsRanking.length;

    //count songs in each albums
    const countAlbumsSongsArray = songsRanking.reduce((acc: any[], cur) => {

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
    const avgAlbumsRanking = songsRanking.reduce((acc: any[], cur) => {

        const existedAlbum = acc.find( item => item.album_name === cur.album_name );
        const countAlbumsSongs = countAlbumsSongsArray.find( item => item.album_name === cur.album_name )?.count_songs;

        if (existedAlbum) {
                //existedAlbum.count_times_in_top_100 += cur.times_in_top_100;
                //existedAlbum.count_times_in_top_10 += cur.times_in_top_10;
                //existedAlbum.count_times_in_top_1 += cur.times_in_top_1;
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
                //count_times_in_top_100: cur.times_in_top_100,
                //count_times_in_top_10: cur.times_in_top_10,
                //count_times_in_top_1: cur.times_in_top_1,
                total_points: cur.ranking <= countSongs / 2 ? Math.floor((countSongs / 2 - cur.ranking) / countAlbumsSongs) * 20  : 0,
                previous_total_points: cur.previous_ranking ? (cur.previous_ranking <= countSongs / 2 ? Math.floor((countSongs / 2 - cur.previous_ranking) / countAlbumsSongs) * 20  : 0) : null,
                total_points_raw: cur.ranking <= countSongs / 2 ? countSongs / 2 - cur.ranking : 0,
            })
        }

        return acc;
    }, []);

    return avgAlbumsRanking.sort( (a, b) => b.total_points - a.total_points );
}