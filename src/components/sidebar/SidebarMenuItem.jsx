import styles from "@/styles/sidebar.module.css";
import { SidebarMenuIcon } from "@/lib/icon";

export default function SidebarMenuItem({ icon, title }) {
    return (
        <div className={styles.sidebarMenuItem}>
            <SidebarMenuIcon variant={icon} width="22px" />
            <p>{title}</p>
        </div> 
    );
} 