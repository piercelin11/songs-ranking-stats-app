
export default async function fetchSpotifyTracklist(id: string) {

  const data = await fetch(`http://localhost:3000/api/spotify-album-tracks?id=${id}` , {
    method: "GET",
    next: { revalidate: 1 }
  });

  if (!data) return;

  const result = await data.json();

  const trackList = (result.data.items as { name: string }[])?.map( item => item.name );

  return trackList;

};