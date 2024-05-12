import styles from "@/styles/sidebar.module.css"
import RoundImg from "@/components/ui/RoundImg";

export default function SidebarProfile() {
    return (
        <div className={styles.profileContainer}>
            <RoundImg 
                size={70}
                url="https://i.pinimg.com/736x/67/0a/3e/670a3e554cb9f1e61d218c8cf35b41d0.jpg"
                alt="user profile"
            />
            <div>
                <p className={styles.mainText}>pierce</p>
                <p className={styles.description}>this is my name</p>
            </div>
        </div>
    );
} 