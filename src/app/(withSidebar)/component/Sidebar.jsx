import styles from "@/styles/sidebar.module.css"
import SidebarMenuItem from "@/app/(withSidebar)/component/SidebarMenuItem";
import SidebarProfile from "./SidebarProfile";

export const sidebarMenu = [
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
                <SidebarProfile />
                
                {
                    sidebarMenu.map( item =>  
                        <SidebarMenuItem key={item.title} title={item.title} icon={item.icon}/>
                    )
                }
            </div>

            <SidebarMenuItem title="Log Out" icon="LogoutIcon" />

        </aside>
    );
} 