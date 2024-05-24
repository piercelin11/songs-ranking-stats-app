import { notFound } from "next/navigation";
import { prisma } from "../prisma";

function toString(params: number | string) : string {
    if (typeof params === "number") return params.toString() || ""
    else return params
}


export async function fetchAllArtists () {
    const data = await prisma.artists.findMany({
        orderBy: {
            artist_name: "asc"
        }
    });

    return data.map( item => ({
        artist_id: item.id,
        artist_name: item.artist_name
    }));
}

export async function fetchArtistsAlbums (artist: string, take?: number) {
    const artistId = toString(artist);

    const data = await prisma.albums.findMany({
        where: {
            artist_id: artistId
        },
        include: {
            artists: true
        },
        orderBy: {
            release_date: "desc"
        },
        take,
    });


    return data.map( item => ({
        album_id: item.id,
        album_name: item.album_name,
        album_color: item.album_color,
        artist_id: item.artist_id,
        release_date: item.release_date,
        artist_name: item.artists.artist_name
    }));
}

export async function fetchArtistsSingles (artist: string, take?: number) {
    const artistId = toString(artist);

    const data = await prisma.songs.findMany({
        where: {
            artist_id: artistId,
            album_id: null
        },
        include: {
            artists: true
        },
        orderBy: {
            release_date: "desc"
        },
        take
    })

    return data.map( item => ({
        song_id: item.id,
        song_name: item.song_name,
        artist_id: item.artist_id,
        release_date: item.release_date,
        artist_name: item.artists.artist_name
    }));
}

export async function fetchAlbumsInfo (album: string) {
    const albumId = toString(album);

    const data = await prisma.albums.findFirst({
        where: {
            id: albumId
        },
        include: {
            artists: true
        }
    });

    if (!data) notFound();


    return ({
        album_id: data.id,
        album_name: data.album_name,
        album_color: data.album_color,
        artist_id: data.artist_id,
        release_date: data.release_date,
        artist_name: data.artists.artist_name
    });
}

export async function fetchAlbumsSongs (album: string) {
    const albumId = toString(album);

    const data = await prisma.songs.findMany({
        where: {
            album_id: albumId
        },
        include: {
            albums: true,
            artists: true,
        },
        orderBy: {
            track_number: "asc"
        }
    })


    return data.map( item => ({
        song_id: item.id,
        song_name: item.song_name,
        album_id: item.id,
        album_name: item.albums!.album_name,
        album_color: item.albums!.album_color ?? null,
        artist_id: item.artist_id,
        artist_name: item.artists.artist_name,
        track_number: item.track_number
    }));
}
