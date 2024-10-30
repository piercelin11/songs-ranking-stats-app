import InfoBox from "@/components/common/InfoBox";
import { RoundArrowDownIcon, RoundArrowUpIcon } from "@/lib/icon";
import { getPhotoshoot } from "@/utils/getPic";
import styles from "@/styles/stats.module.css";
import { getAlbumsByDates } from "@/lib/userDataProcessing/getDataByDate";
import { fetchSpotifyAlbumData } from "@/lib/spotify/fetchSpotifyCover";
import { AlbumsRankingData } from "@/lib/userDataProcessing/getDataByDate";

export default async function InfoBoxColContainer({
  artistId,
  dateId,
}: {
  artistId: string;
  dateId: string;
}) {
  const albumsRanking = await getAlbumsByDates(artistId, dateId);
  const infoboxData = albumsRanking
    .map((item) => ({
      ...item,
      difference: item.previous_total_points
        ? item.total_points - item.previous_total_points
        : NaN,
    }))
    .filter((item) => !isNaN(item.difference));

  const max = Math.max(...infoboxData.map((item) => item.difference));
  const min = Math.min(...infoboxData.map((item) => item.difference));

  const biggestGainer =
    max > 0 ? infoboxData.find((item) => item.difference === max) : null;
  const biggestLoser =
    min < 0 ? infoboxData.find((item) => item.difference === min) : null;

  async function getImgUrl(albumData: AlbumsRankingData | null | undefined) {
    if (albumData) {
      if (albumData.artist_name === "Taylor Swift") {
        return getPhotoshoot(albumData.artist_name, albumData.album_name);
      } else {
        const { imgUrl, id: spotifyAlbumId } = await fetchSpotifyAlbumData(
          albumData.artist_name,
          albumData.album_name,
          albumData.release_date
        );
        return imgUrl;
      }
    } else {
      return "";
    }
  }

  const gainerImg = await getImgUrl(biggestGainer);
  const loserImg = await getImgUrl(biggestLoser);

  return (
    <div className={styles.infoBoxColContainer}>
      <InfoBox
        title={biggestGainer?.album_name}
        description="is the biggest gainer in points"
        img={gainerImg}
        icon={<RoundArrowUpIcon size={45} />}
        stats={biggestGainer?.difference}
      />
      <InfoBox
        title={biggestLoser?.album_name}
        description="is biggest loser in points"
        img={loserImg}
        icon={<RoundArrowDownIcon size={45} />}
        stats={biggestLoser?.difference}
      />
    </div>
  );
}
