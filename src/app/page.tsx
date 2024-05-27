

export default async function Home() {
  /* const result = await fetch(`http://localhost:3000/api/spotify-cover?album=folklore&artist=Taylor Swift&year=2020` , {
    method: "GET",
    next: { revalidate: 86400 }
  });

  const data = await result.json();

  console.log(data.data.albums.items[0]); */

  const result = await fetch(`http://localhost:3000/api/spotify-album-tracks` , {
    method: "GET",
    next: { revalidate: 1 }
  });

  const data = await result.json();

  //console.log(data.data.items[0].name);
 
  return (
    <main>
      <h1>Empty Page</h1>
      
    </main>
  );
}
