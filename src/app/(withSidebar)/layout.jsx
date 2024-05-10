import styles from "@/styles/layout.module.css"
import Sidebar from "@/components/sidebar/Sidebar";
 
export default function SidebarLayout({ children }) {
    return (
      <main>
        <Sidebar />

        <section className={styles.mainContent}>
          { children }
        </section>
        
      </main>
    );
  }