import styles from "@/styles/sidebar.module.css"
import SidebarMenuItem from "@/app/(withSidebar)/component/SidebarMenuItem";
import SidebarProfile from "./SidebarProfile";
import FlexContainer from "@/components/common/FlexContainer";
import RoundRecImg from "@/components/ui/RoundRecImg";
import { SmallGap } from "@/components/common/Gap";
import SidebarDisplay from "./SidebarLibrary";

type Menu = {
    icon: "ClockIcon" | "StairIcon" | "VinylIcon" | "ArchiveIcon" | "LogoutIcon" | "SearchIcon" | "HomeIcon",
    title: string
}

export const sidebarMenu : Menu[] = [
    {
        title: "Home",
        icon: "HomeIcon"
    },
    {
        title: "History",
        icon: "SearchIcon"
    }
] 

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>

            <div>
                {
                    sidebarMenu.map( item =>  
                        <SidebarMenuItem key={item.title} title={item.title} icon={item.icon}/>
                    )
                }
            </div>

            <SidebarDisplay />

        </aside>
    );
} 