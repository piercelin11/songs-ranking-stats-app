
import styles from "@/styles/layout.module.css"
import Sidebar from "@/app/(withSidebar)/component/Sidebar";
import SidebarLibrary from "./component/SidebarLibrary";
import { ReactNode } from "react";
 
export default function SidebarLayout({ children }: { children: ReactNode }) {

    return ( 
      <main>
        <Sidebar>
          <SidebarLibrary />
        </Sidebar>
          
        <section className={styles.main}>
          { children }
        </section> 
      </main>
    );
  }