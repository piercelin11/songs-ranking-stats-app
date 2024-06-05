import styles from "@/styles/layout.module.css"
 
export default function SidebarLayout({ children }) {
    return (
      <div className={styles.content}>
          { children }
      </div>
    );
  }