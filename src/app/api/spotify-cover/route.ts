import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server"

async function fetchToken() {
  
  const CLIENT_ID = process.env.CLIENT_ID;
  const CLIENT_SECRET = process.env.CLIENT_SECRET;
  const response = await axios.post("https://accounts.spotify.com/api/token", 
      { "grant_type": "client_credentials" }, 
      {
          headers: {
              "Authorization": "Basic " + Buffer.from(CLIENT_ID + ":" + CLIENT_SECRET).toString("base64"),
              "content-type": "application/x-www-form-urlencoded",
          }
      }
  );

  const data = await response.data;
  const token = data.access_token;

  return token;
}

export async function GET( req: NextRequest ) {

    let accessToken = cookies().get("spotifyToken")?.value;
    
    if(!accessToken) {
      const token = await fetchToken();
      cookies().set({
        name: "spotifyToken",
        value: token,
        expires: new Date(Date.now() + 3600000)
      });
      accessToken = token;
    }

    const url = new URL(req.url);

    const artist = url.searchParams.get("artist");
    const album = url.searchParams.get("album");
    const year = url.searchParams.get("year");
    
    const query = `artist:${artist} album:${album} year:${year}`
    const route = `https://api.spotify.com/v1/search?q=${query.replaceAll(" ", "%20")}&type=track%2Calbum`;
    
    const response = await fetch(route, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
    });

    const data = await response.json();

    return NextResponse.json({ data })
}