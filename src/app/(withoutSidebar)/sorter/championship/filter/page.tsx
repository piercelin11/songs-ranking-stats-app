
import { getAllAlbums } from "@/lib/userDataProcessing/getDataByUser";
import { AllAbumsPoints } from "@/lib/userDataProcessing/getDataByUser";
import FilterStage from "../component/FilterStage";

export type FilterArtistList = {
    artist_id: string,
    artist_name: string,
    albums: 
        {
            album_id: string,
            album_name: string,
            album_color: string,
            total_points: number,
            release_date: Date | null,
        }[] 
}

export default async function Page() {
    
    const albums = await getAllAlbums();
    const filterArtistList = albums.reduce((acc: FilterArtistList[], cur) => {
        const findArtist = acc.find( item => item.artist_id === cur.artist_id );

        if (findArtist) {
            findArtist.albums.push({
                album_id: cur.album_id,
                album_name: cur.album_name,
                album_color: cur.album_color,
                total_points: cur.total_points,
                release_date: cur.release_date,
            })
        } else {
            acc.push({
                artist_id: cur.artist_id,
                artist_name: cur.artist_name,
                albums: [
                    {
                        album_id: cur.album_id,
                        album_name: cur.album_name,
                        album_color: cur.album_color,
                        total_points: cur.total_points,
                        release_date: cur.release_date,
                    }
                ] 
            })
        }

        return acc
    }, []);

    const sortedFilterArtistList = filterArtistList.map( item => ({
        ...item,
        albums: item.albums.sort( (a, b) => b.total_points - a.total_points )
    }));


    return (  
        <FilterStage filterList={sortedFilterArtistList} />      
    )
}

