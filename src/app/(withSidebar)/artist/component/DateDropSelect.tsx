
import DropSelect from "@/components/common/DropSelect";
import { MediumGap, SmallGap } from "@/components/common/Gap";
import DropButton from "@/components/ui/DropButton";
import { fetchAllDates } from "@/lib/userDataProcessing/prismaFetching";
import { alterDateFormatToLong } from "@/utils/alterDateFormat";
import Link from "next/link";


export default async function DateDropSelect({ artistId }: { artistId: string }) {

 
  const allDates = await fetchAllDates(artistId);
  

  const options = allDates.map( item => ({
    name: alterDateFormatToLong(item.date),
    id: item.id 
  }));

  return (
    <div style={{marginBottom: "40px"}}> 
        <DropSelect options={options} />
    </div>
    
  );
}
