import styles from "@/styles/icon.module.css"

export function HomeIcon({ size }) {
    return (
        <svg 
            className={styles.grayIcon} 
            width={`${size}px`} 
            viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M8.99 43.152H3.73c-1.55 0-2.927-.966-3.43-2.406a3.525 3.525 0 011.204-3.967L47.877 1.365a3.678 3.678 0 014.45 0L98.702 36.78a3.525 3.525 0 011.204 3.967c-.502 1.44-1.88 2.406-3.43 2.406h-5.262l-6.44 46.537c-.246 1.765-1.78 3.08-3.595 3.08H19.025c-1.814 0-3.348-1.315-3.594-3.08l-6.44-46.537zM67.341 79.92a3.27 3.27 0 00-3.272-3.273H36.136a3.27 3.27 0 00-3.273 3.273v.006c0 .868.347 1.7.959 2.314a3.28 3.28 0 002.314.959H64.07a3.27 3.27 0 003.273-3.273v-.006z"/>
        </svg>
    );
}

export function ClockIcon({ size }) {
    return (
        <svg 
            className={styles.grayIcon} 
            width={`${size}px`} 
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.102.834c27.595 0 50 22.405 50 49.996 0 27.6-22.405 50.005-50 50.005-27.596 0-50-22.405-50-50.005 0-27.591 22.404-49.996 50-49.996zM45.35 51.232a4.474 4.474 0 001.308 3.236l21.465 21.46a4.459 4.459 0 006.317 0 4.46 4.46 0 000-6.313L54.05 49.221V20.645a4.351 4.351 0 00-4.348-4.352h-.003a4.351 4.351 0 00-4.349 4.352l.001 30.587z"/>
        </svg>
    );
}

export function StairIcon({ size }) {
    return (
        <svg 
            className={styles.grayIcon} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M70.144 60.728h30v39.999H.145V.728h40v30h30v30z"/>
        </svg>
    );
}

export function VinylIcon({ size }) {
    return (
        <svg 
            className={styles.grayIcon} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.372.533C22.943.536.374 23.107.374 50.535v.006c.284 27.232 22.767 49.481 50 49.481 27.234 0 49.716-22.249 50-49.481v-.006c0-27.43-22.572-50.002-50.002-50.002zm.005 66.313c-8.945 0-16.305-7.36-16.305-16.305s7.36-16.305 16.305-16.305 16.305 7.36 16.305 16.305-7.36 16.305-16.305 16.305z"/>
        </svg>
    );
}

export function ArchiveIcon({ size }) {
    return (
        <svg 
            className={styles.grayIcon} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M95.545 17.608H4.915c-2.6-.057-4.683-1.926-4.683-4.224v-.111.007-8.727C.232 2.254 2.316.386 4.907.329h90.638c2.6.05 4.683 1.915 4.683 4.21v.115-.007 8.633c0 .04.004.084.004.13 0 2.292-2.084 4.157-4.675 4.201h-.004l-.008-.003zM97.428 86.7V29.384a5.033 5.033 0 00-5.033-5.033H8.088a5.033 5.033 0 00-5.033 5.033v57.34a5.033 5.033 0 005.033 5.033h84.283a5.06 5.06 0 005.057-5.057zM67.072 53.12H33.419a3.903 3.903 0 01-3.867-3.867v-2.63a3.902 3.902 0 013.867-3.866h33.665a3.903 3.903 0 013.867 3.867v2.598a3.9 3.9 0 01-3.88 3.898z"/>
        </svg>
    );
}

export function LogoutIcon({ size }) {
    return (
        <svg 
            className={styles.grayIcon} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M47.59.326a6.827 6.827 0 016.821 6.82 6.82 6.82 0 01-6.822 6.82H14.242v70.62H47.59a6.82 6.82 0 110 13.64H7.42a6.82 6.82 0 01-6.823-6.82V7.146A6.82 6.82 0 017.42.326h40.17zm-6.652 55.16a6.21 6.21 0 01-6.208-6.21 6.21 6.21 0 016.208-6.21h34.685l-11.666-11.66c-2.424-2.43-2.424-6.36.001-8.78a6.187 6.187 0 014.39-1.82c1.647 0 3.226.65 4.39 1.82l20.628 20.63a8.495 8.495 0 012.496 6.02c0 2.26-.898 4.43-2.496 6.03l-20.627 20.62a6.188 6.188 0 01-4.39 1.82 6.187 6.187 0 01-4.39-1.82c-2.426-2.42-2.426-6.35-.002-8.78l11.666-11.66H40.938z"/>
        </svg>
    );
}

export function RankUpIcon({ size }) {
    return (
        <svg 
            className={styles.increaseIcon} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.952.9c27.595 0 50 22.405 50 49.998 0 27.593-22.405 49.998-50 49.998-27.596 0-50-22.405-50-49.998C.951 23.305 23.355.9 50.951.9zm0 19.158L25.482 71h50.94l-25.47-50.942z"/>
        </svg>
    );
}

export function RankDownIcon({ size }) {
    return (
        <svg 
            className={styles.decreaseIcon} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.956 100.727c-27.596 0-50-22.406-50-49.998C.956 23.136 23.36.73 50.956.73s50 22.405 50 49.998c0 27.592-22.404 49.998-50 49.998zm0-19.158l25.47-50.942h-50.94l25.47 50.942z"/>
        </svg>
    );
}

export function RankUnchangeIcon({ size }) {
    return (
        <svg 
            className={styles.grayIcon} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M100.875 50.894c0 27.595-22.403 50.007-50 50.007-27.595 0-50-22.412-50-50.007C.876 23.3 23.28.898 50.876.898c27.597 0 50 22.402 50 49.996zm-21.44-7.04h-57.12v14.081h57.12V43.853z"/>
        </svg>
    );
}

export function CircleIcon({ size }) {
    return (
        <svg 
            className={styles.neutralIcon} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <circle cx="2810.08" cy="2765.14" r="28.286" transform="translate(-4917.187 -4836.865) scale(1.76764)"/>
        </svg>
    );
}

export function ArrowUpRightIcon({ size }) {
    return (
        <svg 
            className={styles.primaryIcon} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M76.964 13.467H.3V.075h86.41v-.076h13.388v100.012H86.71V22.63L9.544 99.96.099 90.495l76.865-77.028z"/>
        </svg>
    );
}

export function SidebarMenuIcon({ variant, size }) {
    if(variant === "HomeIcon") return HomeIcon({size});
    if(variant === "ClockIcon") return ClockIcon({size});
    if(variant === "StairIcon") return StairIcon({size});
    if(variant === "VinylIcon") return VinylIcon({size});
    if(variant === "ArchiveIcon") return ArchiveIcon({size});
    if(variant === "LogoutIcon") return LogoutIcon({size});
}

export function RankChangeIcon({ variant, size }) {
    if(variant === "RankUpIcon") return RankUpIcon({size});
    if(variant === "RankDownIcon") return RankDownIcon({size});
    if(variant === "RankUnchangeIcon") return RankUnchangeIcon({size});
    if(variant === "CircleIcon") return CircleIcon({size});
}






