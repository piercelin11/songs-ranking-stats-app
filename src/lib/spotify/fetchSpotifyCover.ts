import config from "./config";


export default async function fetchSpotifyCover(artistName: string, albumName: string | null, releaseDate: Date | null ) {
  let imgIndex = albumName && config[albumName] ? config[albumName] : 0

  const data = await fetch(`http://localhost:3000/api/spotify-cover?album=${albumName ?? undefined}&artist=${artistName}&year=${releaseDate ? releaseDate.getFullYear() : "2000-2030"}` , {
    method: "GET",
    next: { revalidate: 86400 }
  });

  if (!data) return "/pic/not-found.jpg"

  const result = await data.json();

  return !result.data.albums ? "/pic/placeholder.jpg" : 
         result.data.albums.items[0] ? result.data.albums.items[imgIndex].images[0].url : 
         result.data.tracks.items[0] ? result.data.tracks.items[imgIndex].images[0].url : 
         "/pic/placeholder.jpg"
};

export async function fetchSpotifyAlbumData(artistName: string, albumName: string | null, releaseDate: Date | null ) {
  let imgIndex = albumName && config[albumName] ? config[albumName] : 0

  const data = await fetch(`http://localhost:3000/api/spotify-cover?album=${albumName ?? undefined}&artist=${artistName}&year=${releaseDate ? releaseDate.getFullYear() : "2000-2030"}` , {
    method: "GET",
    next: { revalidate: 86400 }
  });

  if (!data) return ({imgUrl: "/pic/not-found.jpg", id: "" });

  const result = await data.json();



  const imgUrl = !result.data.albums ? "/pic/placeholder.jpg" : 
                 result.data.albums.items[0] ? result.data.albums.items[imgIndex].images[0].url : 
                 "/pic/placeholder.jpg";

  const id = !result.data.albums ? "" :
             result.data.albums.items[imgIndex].id;

  return ({imgUrl ,id})
};
  

type fetchAllCover =  {
  song_id?: string,
  artist_id?: string,
  artist_name: string, 
  release_date: Date | null, 
  album_id?: string | null,
  album_name: string | null,
  song_name?: string,
}

export async function fetchAllSpotifyCover(data: fetchAllCover[]): Promise<any[]> {
  const promises = data.map( async(item) => {
    const imgUrl = await fetchSpotifyCover(item.artist_name, item.album_name || item.song_name || null, item.release_date )
    return ({
      ...item,
      imgUrl
    })
  })

  const coverFetchedData = await Promise.all(promises); 
  return coverFetchedData;
}