import styles from "@/styles/layout.module.css"
import Sidebar from "./component/Sidebar";
 
export default function Layout({ children }) {
    return (
      <main>
        <Sidebar />

        <section className={styles.main}>
          { children }
        </section> 
        
      </main>
    );
  }