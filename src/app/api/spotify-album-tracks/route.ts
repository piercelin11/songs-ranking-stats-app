import axios from "axios";
import { cookies } from "next/headers";
import { NextResponse, NextRequest } from "next/server"
import { fetchToken } from "../spotify-cover/route";



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

    const id = url.searchParams.get("id");

    const route = `https://api.spotify.com/v1/albums/${id}/tracks`;
    
    const response = await fetch(route, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${accessToken}`
        }
    });

    const data = await response.json();

    return NextResponse.json({ data })
}