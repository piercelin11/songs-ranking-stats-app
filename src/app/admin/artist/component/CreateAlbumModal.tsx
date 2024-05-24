"use client"

import FlexContainer from "@/components/common/FlexContainer";
import { SmallGap } from "@/components/common/Gap";
import PageBackLink from "@/components/common/PageBackLink";
import BasicInput from "@/components/ui/Input/BasicInput";
import DateInput from "@/components/ui/Input/DateInput";
import { RecButton } from "@/components/ui/button/Button";
import { createAlbum } from "@/lib/adminDataProcessing/action";
import styles from "@/styles/admin.module.css"
import Image from "next/image";
import { useParams } from "next/navigation";


export default function CreateAlbumModal() {
    const params = useParams<{ artistId: string }>();

    return (
        <FlexContainer align="flex-end" isChilfrenFlex={true}>
            <Image 
                src="/pic/not-found.jpg"
                width={250}
                height={250}
                alt="upload"
            />

            <form action={(formData: FormData) => createAlbum(formData, params.artistId)}>
                <BasicInput 
                        name="albumName" 
                        placeholder="Enter album name"
                        label="Album name"
                />
                <DateInput 
                    name="releaseDate" 
                    placeholder="YYYY-MM-DD"
                    label="Release date"
                />

                <div className={styles.flexButtonContainer}>
                    <RecButton type="submit" variant="primary">
                        Save
                    </RecButton>
                    
                    <PageBackLink>
                        <RecButton variant="onSurface">
                            Cancel
                        </RecButton>
                    </PageBackLink>
                </div>

            </form>
        </FlexContainer>
    );
}
