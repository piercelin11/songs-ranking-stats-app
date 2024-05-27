import styles from "@/styles/sidebar.module.css";
import { SidebarMenuIcon } from "@/lib/icon";


type Menu = {
    icon: "ClockIcon" | "StairIcon" | "VinylIcon" | "ArchiveIcon" | "LogoutIcon" | "SearchIcon" | "HomeIcon",
    title: string
}

export default function SidebarMenuItem({ icon, title }: Menu) {
    return (
        <div className={styles.sidebarMenuItem}>
            <SidebarMenuIcon variant={icon} size={22} />
            <p>{title}</p>
        </div> 
    );
} 