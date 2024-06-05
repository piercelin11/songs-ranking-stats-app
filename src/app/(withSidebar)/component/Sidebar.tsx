"use client"
import styles from "@/styles/sidebar.module.css"
import SidebarMenuItem from "@/app/(withSidebar)/component/SidebarMenuItem";
import SidebarProfile from "./SidebarProfile";
import FlexContainer from "@/components/common/FlexContainer";
import RoundRecImg from "@/components/ui/RoundRecImg";
import { SmallGap } from "@/components/common/Gap";
import Link from "next/link";
import { IconButtonRec } from "@/components/ui/button/IconButton";
import { ReactNode, useState } from "react";

type Menu = {
    icon: "ClockIcon" | "StairIcon" | "VinylIcon" | "ArchiveIcon" | "LogoutIcon" | "SearchIcon" | "HomeIcon",
    title: string,
    url: string,
}

export const sidebarMenu : Menu[] = [
    {
        title: "Home",
        icon: "HomeIcon",
        url: "/home"
    },
    {
        title: "History",
        icon: "SearchIcon",
        url: "/home"
    }
] 


export default function Sidebar({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
 

    return (
        <div className={isOpen ? styles.open : ""}>
            <button className={styles.hamburger} onClick={() => {setIsOpen(prev => !prev)}}>
                <hr />
                <hr />
            </button>
            <aside className={`${styles.sidebar} ${isOpen ? styles.open : ""}`} onClick={() => {setIsOpen(prev => !prev)}}>

                <div className={styles.menuItemContainer}>
                    {
                        sidebarMenu.map( item =>
                            <Link href={item.url} key={item.title}>
                                <SidebarMenuItem title={item.title} icon={item.icon}/>
                            </Link>
                        )
                    }
                </div>

                { children }

            </aside>
        </div>
    );
} 