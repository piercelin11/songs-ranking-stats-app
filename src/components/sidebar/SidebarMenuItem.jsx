import styles from "@/styles/sidebar.module.css";
import { SidebarMenuIcon } from "@/lib/icon";

export default function SidebarMenuItem(props) {
    return (
        <div className={styles.sidebarMenuItem}>
            <SidebarMenuIcon variant={props.icon} width="22px" />
            <p>{props.title}</p>
        </div> 
    );
} 