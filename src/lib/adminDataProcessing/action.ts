"use server"

import { revalidatePath } from "next/cache";
import { prisma } from "../prisma";
import { redirect } from "next/navigation";
import { fetchAlbumsSongs } from "./prismaFetching";
import updateMulti from "./updateMulti";

export async function createArtist(formData: FormData): Promise<{ id: string, artist_name: string }> {
    const artistName = formData.get("artistName");

    if (typeof artistName === "string" && artistName.trim() !== "") {
        try {
            const data = await prisma.artists.create({
                data: {
                    artist_name: artistName
                }
            });
            
        } catch (error) {
            console.error("Error creating artist:", error);
            throw new Error("Failed to add data");
        }

        revalidatePath("/admin/artist");
        redirect("/admin/artist");
    } else {
        throw new Error("Missing or invalid Artist Name");
    }
}

export async function createAlbum(formData: FormData, artistId: string) {
    let albumId: string;
    const albumName = formData.get("albumName") as string;
    const releasedate = formData.get("releaseDate") as string;

    try {
        const data = await prisma.albums.create({
            data: {
                album_name: albumName,
                release_date: new Date(releasedate),
                artist_id: artistId,
            }
        })
        albumId = data.id;
    } catch (error) {
        console.error("Error creating artist:", error);
        throw new Error("Failed to add data");
    }

    revalidatePath(`/admin/artist/${artistId}`);
    redirect(`/admin/album/${albumId}`);
}

export async function updateAlbum(albumId: string, formData: FormData) {
    console.log(formData);

    const releaseDate = new Date(formData.get("releaseDate") as string);
    const albumName = formData.get("albumName") as string;
    const albumColor = formData.get("albumColor") as string ?? null;

    try {
        if (!albumColor) {
            const data = await prisma.albums.update({
                where: {
                    id: albumId
                },
                data: {
                    album_color: albumColor,
                    album_name: albumName,
                    release_date: releaseDate,
                }
            })
        } else {
            const data = await prisma.albums.update({
                where: {
                    id: albumId
                },
                data: {
                    album_name: albumName,
                    release_date: releaseDate,
                }
            })
        }
    } catch (error) {
        console.error("Error creating artist:", error);
        throw new Error("Failed to add data");
    }

    revalidatePath(`/admin/album/${albumId}`);
    redirect(`/admin/album/${albumId}`);
    
}

export async function updateSong(songId: string, formData: FormData ) {

    const songName = formData.get("songName") as string | null;
    const releaseDate = formData.get("releaseDate") ? new Date (formData.get("releaseDate") as string) : null;

    try {
        if (songName && releaseDate) {
            const data = await prisma.songs.update({
                where: {
                    id: songId
                },
                data: {
                    song_name: songName,
                    release_date: releaseDate
                }
            })
        } else if (songName) {
            const data = await prisma.songs.update({
                where: {
                    id: songId
                },
                data: {
                    song_name: songName
                }
            })
        } else {
            console.log("Empty Form")
        }
        
    } catch (error) {
        console.error("Error creating artist:", error);
        throw new Error("Failed to add data");
    }

    revalidatePath(`/admin/album`);

}

export async function deleteSong(songId: string) {

    try {
        const data = await prisma.songs.delete({
            where: {
                id: songId
            }
        })
    } catch (error) {
        console.error("Error deleting artist:", error);
        throw new Error("Failed to delete data");
    }

    revalidatePath(`/admin/album`);
}

export async function addSongs(albumId: string, artistId: string, data: string[]) {
    const createSongsData = data.map( (item, index) => ({
        artist_id: artistId,
        song_name: item,
        track_number: index + 1
    }));

    const originalSongs = await fetchAlbumsSongs(albumId);
    const originalSongsArray = originalSongs.map( item => item.song_name );

    const filteredCreateSongsData = createSongsData.filter( item => !originalSongsArray.includes(item.song_name) );

    try {
        const data = await prisma.albums.update({
            where: {
                id: albumId
            },
            data: {
                songs: {
                    createMany: {
                        data: filteredCreateSongsData
                    }
                }
            }
        })
    } catch (error) {
        console.error("Error creating artist:", error);
        throw new Error("Failed to add data");
    }

    revalidatePath(`/admin/album/${albumId}`);

}

export async function addSingles(artistId: string, data: string[]) {
    const createSongsData = data.map( item => ({
        artist_id: artistId,
        song_name: item,
    }));

    try {
        const data = await prisma.songs.createMany({
            data: createSongsData
        })
    } catch (error) {
        console.error("Error creating artist:", error);
        throw new Error("Failed to add data");
    }

    revalidatePath(`/admin/artist/${artistId}`);
}

export async function orderSongs(albumId: string, newData: string[], originalData: string[]) {
    const allSongsData = await fetchAlbumsSongs(albumId);

    const originalSongsOrder = originalData.map( (item, index) => {
        const findSong = allSongsData.find( songs => songs.song_name ===  item);
        return ({id: findSong?.song_id, track_number: index + 1})
    });

    const newSongsOrder = newData.map( (item, index) => {
        const findSong = allSongsData.find( songs => songs.song_name ===  item);
        return ({id: findSong?.song_id, track_number: index + 1})
    });

    const filterSongsOrder = newSongsOrder.filter( item => {
        const matchingItem = originalSongsOrder.find( original => original.id === item.id && original.track_number === item.track_number );
        return !matchingItem
    });

    try {
        prisma.$transaction([
            updateMulti(prisma, "songs", ["track_number"], filterSongsOrder.map( item => ([item.id, item.track_number]) )),
        ]);
    } catch (error) {
        console.error("Error creating artist:", error);
        throw new Error("Failed to add data");
    }

    revalidatePath(`/admin/album`);
}

