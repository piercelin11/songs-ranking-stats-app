import styles from "@/styles/sidebar.module.css"
import SidebarMenuItem from "@/components/sidebar/SidebarMenuItem";

export const sidebarMenu = [
    {
        title: "Dashboard",
        icon: "HomeIcon"
    },
    {
        title: "History",
        icon: "ClockIcon"
    },
    {
        title: "Sorter",
        icon: "StairIcon"
    },
    {
        title: "Discography",
        icon: "ArchiveIcon"
    },
]

export default function Sidebar() {
    return (
        <aside className={styles.sidebar}>

            <div>
                {
                    sidebarMenu.map( (item, index) =>  
                        <SidebarMenuItem key={index} title={item.title} icon={item.icon}/>
                    )
                }
            </div>

        </aside>
    );
} 