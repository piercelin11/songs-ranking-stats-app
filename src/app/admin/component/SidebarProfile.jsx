import styles from "@/styles/sidebar.module.css";
import RoundImg from "@/components/ui/RoundImg";

export default function SidebarProfile() {
  return (
    <div className={styles.profileContainer}>
      <RoundImg
        size={70}
        url="/pic/taylor-swift/banner.jpg"
        alt="user profile"
        priority={true}
      />
      <div>
        <p className={styles.mainText}>pierce</p>
        <p className={styles.description}>this is my name</p>
      </div>
    </div>
  );
}
