import { fetchPeakAndAvg, fetchPrevDates, fetchPrevRanking, fetchSongsByDate } from "./prismaFetching";

type SongsRankingData = {
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

export async function getAlbumsByDates(artistId: number | string, dateId: number | string): Promise<AlbumsRankingData[]> {
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
        const percentileRank = (countSongs - cur.ranking + 1) / countSongs;
        let score = percentileRank > 0.5 ? percentileRank * 1000 : 0;
        const adjustedScore = Math.floor(score / countAlbumsSongs);
        const rawScore = Math.floor(score / (countSongs / countAlbumsPrevSongsArray.length));

        // 計算之前百分比排名
        let prevAdjustedScore = 0;
        if (cur.previous_ranking) {
            const prevPercentileRank = (countPrevSongs - cur.previous_ranking + 1) / countPrevSongs;
            let prevScore = prevPercentileRank > 0.5 ? prevPercentileRank * 1000 : 0;
            prevAdjustedScore = Math.floor(prevScore / countAlbumsPrevSongs);
        }

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