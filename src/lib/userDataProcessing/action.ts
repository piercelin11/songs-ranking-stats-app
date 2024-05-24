"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const userId = "c9485cbd-9d5a-4889-86b5-403db666b9d3"

export async function submitSorterResult(result: any[], formData: FormData ) {
    const info = formData.get("info")! as string;
    const rankingsData = result.map( item => ({
        song_id: item.song_id,
        ranking: item.ranking,
        user_id: userId,
    }));

    let dateId: string;

    try {
        const data = await prisma.dates.create({
            data: {
                user_id: userId,
                info: info,
                type: "OVERALL",
                rankings: {
                    createMany: {
                        data: rankingsData
                    }
                }
            }
        })

        dateId = data.id;
        
    } catch (error) {
        console.log("Failed to add rankings", error)
        throw new Error("Failed to add rankings");
    }

    revalidatePath("/artist");
    redirect(`/artist/${result[0].artist_id}/${dateId}`);
}