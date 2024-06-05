
import InfoBox from "@/components/common/InfoBox";
import { RoundArrowDownIcon, RoundArrowUpIcon } from "@/lib/icon";
import { getPhotoshoot } from "@/utils/getPic";
import styles from "@/styles/stats.module.css"
import { getAlbumsByDates } from "@/lib/userDataProcessing/getDataByDate";


export default async function InfoBoxColContainer({ artistId, dateId }: { artistId: string, dateId: string }) {
    const albumsRanking = await getAlbumsByDates(artistId, dateId);
    
    const infoboxData = albumsRanking.map( item => ({
        ...item,
        difference: item.previous_total_points ? item.total_points - item.previous_total_points : NaN,
    })).filter( item => !isNaN(item.difference) );

    const max = Math.max(...infoboxData.map( item => item.difference ));
    const min = Math.min(...infoboxData.map( item => item.difference ));
    
    const biggestGainer = max > 0 ? infoboxData.find( item => item.difference === max ) : null;
    const biggestLoser = min < 0 ? infoboxData.find( item => item.difference === min ) : null;
 
    return (
        <div className={styles.infoBoxColContainer}>
            <InfoBox 
                title={biggestGainer?.album_name}
                description="is the biggest gainer in points"
                img={biggestGainer ? getPhotoshoot(biggestGainer.artist_name ,biggestGainer.album_name) : ""}
                icon={<RoundArrowUpIcon size={45}/>}
                stats={biggestGainer?.difference}
            />
            <InfoBox 
                title={biggestLoser?.album_name}
                description="is biggest loser in points"
                img={biggestLoser ? getPhotoshoot(biggestLoser.artist_name ,biggestLoser.album_name) : ""}
                icon={<RoundArrowDownIcon size={45}/>}
                stats={biggestLoser?.difference}
            />
        </div>
    );
}