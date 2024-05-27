import styles from "@/styles/layout.module.css"
import Sidebar from "@/app/(withSidebar)/component/Sidebar";
 
export default function SidebarLayout({ children }) {
    return (
      <main>
        <Sidebar />
          
        <section className={styles.main}>
          { children }
        </section> 
      </main>
    );
  }