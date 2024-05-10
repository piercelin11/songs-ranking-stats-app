import styles from "@/styles/icon.module.css"

export function HomeIcon(props) {
    return (
        <svg 
            className={styles.sidebarIcon} 
            width={props.width || "auto"} 
            viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M8.99 43.152H3.73c-1.55 0-2.927-.966-3.43-2.406a3.525 3.525 0 011.204-3.967L47.877 1.365a3.678 3.678 0 014.45 0L98.702 36.78a3.525 3.525 0 011.204 3.967c-.502 1.44-1.88 2.406-3.43 2.406h-5.262l-6.44 46.537c-.246 1.765-1.78 3.08-3.595 3.08H19.025c-1.814 0-3.348-1.315-3.594-3.08l-6.44-46.537zM67.341 79.92a3.27 3.27 0 00-3.272-3.273H36.136a3.27 3.27 0 00-3.273 3.273v.006c0 .868.347 1.7.959 2.314a3.28 3.28 0 002.314.959H64.07a3.27 3.27 0 003.273-3.273v-.006z"/>
        </svg>
    );
}

export function ClockIcon(props) {
    return (
        <svg 
            className={styles.sidebarIcon} 
            width={props.width || "auto"} 
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.102.834c27.595 0 50 22.405 50 49.996 0 27.6-22.405 50.005-50 50.005-27.596 0-50-22.405-50-50.005 0-27.591 22.404-49.996 50-49.996zM45.35 51.232a4.474 4.474 0 001.308 3.236l21.465 21.46a4.459 4.459 0 006.317 0 4.46 4.46 0 000-6.313L54.05 49.221V20.645a4.351 4.351 0 00-4.348-4.352h-.003a4.351 4.351 0 00-4.349 4.352l.001 30.587z"/>
        </svg>
    );
}

export function StairIcon(props) {
    return (
        <svg 
            className={styles.sidebarIcon} 
            width={props.width || "auto"} 
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M70.144 60.728h30v39.999H.145V.728h40v30h30v30z"/>
        </svg>
    );
}

export function VinylIcon(props) {
    return (
        <svg 
            className={styles.sidebarIcon} 
            width={props.width || "auto"} 
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.372.533C22.943.536.374 23.107.374 50.535v.006c.284 27.232 22.767 49.481 50 49.481 27.234 0 49.716-22.249 50-49.481v-.006c0-27.43-22.572-50.002-50.002-50.002zm.005 66.313c-8.945 0-16.305-7.36-16.305-16.305s7.36-16.305 16.305-16.305 16.305 7.36 16.305 16.305-7.36 16.305-16.305 16.305z"/>
        </svg>
    );
}

export function ArchiveIcon(props) {
    return (
        <svg 
            className={styles.sidebarIcon} 
            width={props.width || "auto"} 
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M95.545 17.608H4.915c-2.6-.057-4.683-1.926-4.683-4.224v-.111.007-8.727C.232 2.254 2.316.386 4.907.329h90.638c2.6.05 4.683 1.915 4.683 4.21v.115-.007 8.633c0 .04.004.084.004.13 0 2.292-2.084 4.157-4.675 4.201h-.004l-.008-.003zM97.428 86.7V29.384a5.033 5.033 0 00-5.033-5.033H8.088a5.033 5.033 0 00-5.033 5.033v57.34a5.033 5.033 0 005.033 5.033h84.283a5.06 5.06 0 005.057-5.057zM67.072 53.12H33.419a3.903 3.903 0 01-3.867-3.867v-2.63a3.902 3.902 0 013.867-3.866h33.665a3.903 3.903 0 013.867 3.867v2.598a3.9 3.9 0 01-3.88 3.898z"/>
        </svg>
    );
}

export function SidebarMenuIcon(props) {
    if(props.variant === "HomeIcon") return HomeIcon(props);
    if(props.variant === "ClockIcon") return ClockIcon(props);
    if(props.variant === "StairIcon") return StairIcon(props);
    if(props.variant === "VinylIcon") return VinylIcon(props);
    if(props.variant === "ArchiveIcon") return ArchiveIcon(props);
}


