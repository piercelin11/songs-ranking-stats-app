import styles from "@/styles/sidebar.module.css"
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarProfile from "./SidebarProfile";
import Link from "next/link";

export const sidebarMenu = [
    {
        title: "Artist",
        icon: "VinylIcon",
        url: "/admin/artist"
    },
    {
        title: "Home",
        icon: "HomeIcon",
        url: ""
    }
] 

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>
 
            <div>
                {
                    sidebarMenu.map( item =>
                        <Link key={item.title} href={item.url}>
                            <SidebarMenuItem  title={item.title} icon={item.icon}/>
                        </Link>  
                    )
                }
            </div>
            


        </aside>
    );
} 