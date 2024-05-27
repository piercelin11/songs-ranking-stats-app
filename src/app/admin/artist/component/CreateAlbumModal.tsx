"use client"

import FlexContainer from "@/components/common/FlexContainer";
import BasicInput from "@/components/ui/Input/BasicInput";
import DateInput from "@/components/ui/Input/DateInput";

export default function CreateAlbumModal() {
    
    return (
        <div>
            <FlexContainer
                direction="column"
                gap={15}
            >
                <BasicInput 
                    name="albumName" 
                    placeholder="Enter album name"
                    //label="Album name"
                />
                <DateInput 
                    name="releaseDate" 
                    placeholder="YYYY-MM-DD"
                    //label="Release date"
                />
            </FlexContainer>
        </div>
    );
}
