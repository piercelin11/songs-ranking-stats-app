import styles from "@/styles/icon.module.css"

type IconProps = {
    size: number | string,
    color?: "backgroundInverse" | "onSurface" | "onBackground" | "hoverable" | "onPrimary",
}

type VariantProps = {
    variant: string,
    size: number
}

const iconColor: Record<string, string> = {
    backgroundInverse: "backgroundInverseIcon",
    onSurface: "onSurfaceIcon",
    onBackground: "onBackgroundIcon",
    hoverable: "hoverableIcon",
    onPrimary: "onPrimaryIcon",
}

export function HomeIcon({ size, color = "onSurface" }: IconProps) {

    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`} 
            viewBox="0 0 101 101" xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M8.99 43.152H3.73c-1.55 0-2.927-.966-3.43-2.406a3.525 3.525 0 011.204-3.967L47.877 1.365a3.678 3.678 0 014.45 0L98.702 36.78a3.525 3.525 0 011.204 3.967c-.502 1.44-1.88 2.406-3.43 2.406h-5.262l-6.44 46.537c-.246 1.765-1.78 3.08-3.595 3.08H19.025c-1.814 0-3.348-1.315-3.594-3.08l-6.44-46.537zM67.341 79.92a3.27 3.27 0 00-3.272-3.273H36.136a3.27 3.27 0 00-3.273 3.273v.006c0 .868.347 1.7.959 2.314a3.28 3.28 0 002.314.959H64.07a3.27 3.27 0 003.273-3.273v-.006z"/>
        </svg>
    );
}

export function ClockIcon({ size, color = "onSurface" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`} 
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.102.834c27.595 0 50 22.405 50 49.996 0 27.6-22.405 50.005-50 50.005-27.596 0-50-22.405-50-50.005 0-27.591 22.404-49.996 50-49.996zM45.35 51.232a4.474 4.474 0 001.308 3.236l21.465 21.46a4.459 4.459 0 006.317 0 4.46 4.46 0 000-6.313L54.05 49.221V20.645a4.351 4.351 0 00-4.348-4.352h-.003a4.351 4.351 0 00-4.349 4.352l.001 30.587z"/>
        </svg>
    );
}

export function StairIcon({ size, color = "onSurface" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M70.144 60.728h30v39.999H.145V.728h40v30h30v30z"/>
        </svg>
    );
}

export function VinylIcon({ size, color = "onSurface" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.372.533C22.943.536.374 23.107.374 50.535v.006c.284 27.232 22.767 49.481 50 49.481 27.234 0 49.716-22.249 50-49.481v-.006c0-27.43-22.572-50.002-50.002-50.002zm.005 66.313c-8.945 0-16.305-7.36-16.305-16.305s7.36-16.305 16.305-16.305 16.305 7.36 16.305 16.305-7.36 16.305-16.305 16.305z"/>
        </svg>
    );
}

export function ArchiveIcon({ size, color = "onSurface" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M95.545 17.608H4.915c-2.6-.057-4.683-1.926-4.683-4.224v-.111.007-8.727C.232 2.254 2.316.386 4.907.329h90.638c2.6.05 4.683 1.915 4.683 4.21v.115-.007 8.633c0 .04.004.084.004.13 0 2.292-2.084 4.157-4.675 4.201h-.004l-.008-.003zM97.428 86.7V29.384a5.033 5.033 0 00-5.033-5.033H8.088a5.033 5.033 0 00-5.033 5.033v57.34a5.033 5.033 0 005.033 5.033h84.283a5.06 5.06 0 005.057-5.057zM67.072 53.12H33.419a3.903 3.903 0 01-3.867-3.867v-2.63a3.902 3.902 0 013.867-3.866h33.665a3.903 3.903 0 013.867 3.867v2.598a3.9 3.9 0 01-3.88 3.898z"/>
        </svg>
    );
}

export function LogoutIcon({ size, color = "onSurface" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M47.59.326a6.827 6.827 0 016.821 6.82 6.82 6.82 0 01-6.822 6.82H14.242v70.62H47.59a6.82 6.82 0 110 13.64H7.42a6.82 6.82 0 01-6.823-6.82V7.146A6.82 6.82 0 017.42.326h40.17zm-6.652 55.16a6.21 6.21 0 01-6.208-6.21 6.21 6.21 0 016.208-6.21h34.685l-11.666-11.66c-2.424-2.43-2.424-6.36.001-8.78a6.187 6.187 0 014.39-1.82c1.647 0 3.226.65 4.39 1.82l20.628 20.63a8.495 8.495 0 012.496 6.02c0 2.26-.898 4.43-2.496 6.03l-20.627 20.62a6.188 6.188 0 01-4.39 1.82 6.187 6.187 0 01-4.39-1.82c-2.426-2.42-2.426-6.35-.002-8.78l11.666-11.66H40.938z"/>
        </svg>
    );
}

export function RankUpIcon({ size }: IconProps) {
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

export function RankDownIcon({ size }: IconProps) {
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

export function RankUnchangeIcon({ size }: IconProps) {
    return (
        <svg 
            className={styles.onSurfaceIcon} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M100.875 50.894c0 27.595-22.403 50.007-50 50.007-27.595 0-50-22.412-50-50.007C.876 23.3 23.28.898 50.876.898c27.597 0 50 22.402 50 49.996zm-21.44-7.04h-57.12v14.081h57.12V43.853z"/>
        </svg>
    );
}

export function CircleIcon({ size }: IconProps) {
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

export function ArrowUpRightIcon({ size, color = "backgroundInverse" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M76.964 13.467H.3V.075h86.41v-.076h13.388v100.012H86.71V22.63L9.544 99.96.099 90.495l76.865-77.028z"/>
        </svg>
    );
}

export function NavigateRightIcon({ size, color = "backgroundInverse" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            height={`${size}px`}
            viewBox="0 0 61 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9.995 100.542L.864 91.41l40.858-40.859L.845 9.669 9.97.544l50.04 49.983-50.015 50.015z"/>
        </svg>
    );
}

export function NavigateLeftIcon({ size, color = "backgroundInverse" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            height={`${size}px`}
            viewBox="0 0 61 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.907.536l9.131 9.131L19.18 50.526l40.878 40.883-9.125 9.125L.892 50.55 50.907.536z"/>
        </svg>
    );
}

export function CrownIcon({ size, color = "backgroundInverse" }: IconProps) {
    return ( 
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M.929 100.632v-100l33.373 33.333L50.949.631l16.686 33.334L100.97.631v100.001H.93z"/>
        </svg>
    );
}

export function CrownRoundIcon({ size, color = "backgroundInverse" }: IconProps) {
    return ( 
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path fill="#fff" d="M50.218.766c27.621 0 50.02 22.324 50.02 49.945s-22.399 50.324-50.02 50.324C22.634 101.035.234 78.332.234 50.71S22.634.766 50.218.766zM26.683 74.549h47.07V27.252L58.088 43.144l-7.87-15.892-7.833 15.892-15.702-15.892v47.297z"/>
        </svg>
    );
}


export function ThreeDotsIcon({ size, color = "backgroundInverse" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 24" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M11.535.543c6.302 0 11.415 5.11 11.415 11.357 0 6.298-5.113 11.357-11.415 11.357C5.233 23.257.12 18.198.12 11.9.12 5.654 5.233.543 11.535.543zm38.585 0c6.302 0 11.415 5.11 11.415 11.357 0 6.298-5.113 11.357-11.415 11.357-6.302 0-11.415-5.059-11.415-11.357C38.705 5.654 43.818.543 50.12.543zm38.585 0c6.302 0 11.415 5.11 11.415 11.357 0 6.298-5.113 11.357-11.415 11.357-6.302 0-11.415-5.059-11.415-11.357C77.29 5.654 82.403.543 88.705.543z"/>
        </svg>
    );
}

export function RoundArrowUpIcon({ size, color = "backgroundInverse" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.774.61c27.596 0 50.003 22.407 50.003 50.002 0 27.595-22.407 50.002-50.003 50.002C23.18 100.614.772 78.207.772 50.612.772 23.017 23.179.61 50.774.61zm4.305 78.697V38.394l18.289 18.304 6.086-6.086-28.68-28.679-28.694 28.68 6.086 6.085 18.303-18.304v40.913h8.61z"/>
        </svg>
    );
}

export function RoundArrowDownIcon({ size, color = "backgroundInverse" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.62 100.628C23.025 100.628.617 78.22.617 50.625S23.025.623 50.62.623s50.002 22.407 50.002 50.002c0 27.595-22.407 50.003-50.002 50.003zM46.315 21.93v40.912L28.026 44.54l-6.085 6.086 28.679 28.68 28.694-28.68-6.086-6.086-18.303 18.304V21.931h-8.61z"/>
        </svg>
    );
}

export function SpotifyIcon({ size, color = "hoverable" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.253.73c27.596 0 50 22.404 50 50.004 0 27.593-22.404 49.997-50 49.997s-50-22.404-50-49.997c0-27.6 22.404-50.004 50-50.004zM21.989 39.315s29.72-9.47 57.772 5.797a4.813 4.813 0 004.598-8.455c-31.702-17.245-65.295-6.506-65.295-6.506a4.81 4.81 0 102.925 9.164zm3.186 29.764s25.307-7.408 43.226 4.582a3.246 3.246 0 004.497-.89 3.243 3.243 0 00-.892-4.498C51.836 54.78 23.383 62.85 23.383 62.85a3.241 3.241 0 101.792 6.229zm-.78-14.515s25.63-7.745 49.51 5.718a4.129 4.129 0 005.624-1.575 4.128 4.128 0 00-1.57-5.622c-26.988-15.213-55.957-6.428-55.957-6.428a4.136 4.136 0 00-2.756 5.153 4.133 4.133 0 005.148 2.754z"/>
        </svg>
    );
}

export function CrownRoundedRecIcon({ size, color = "onBackground" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M77.726 12.814A12.508 12.508 0 0065.217.305H12.856A12.508 12.508 0 00.347 12.815v52.36a12.51 12.51 0 0012.509 12.51h52.361a12.508 12.508 0 0012.509-12.51v-52.36z"/>
            <path fill="#DBDBDB" d="M22.798 55.247V22.769l10.839 10.826 5.406-10.826 5.42 10.826 10.826-10.826v32.478H22.798z"/>        
        </svg>
    );
}

export function StarRoundedRecIcon({ size, color = "onBackground" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M78.345 12.814A12.508 12.508 0 0065.836.305H13.475A12.508 12.508 0 00.966 12.815v52.36a12.51 12.51 0 0012.509 12.51h52.361a12.508 12.508 0 0012.509-12.51v-52.36z"/>
            <path fill="#DBDBDB" d="M39.656 18.319l5.132 15.794h16.608L47.96 43.875l5.132 15.795-13.436-9.762L26.22 59.67l5.132-15.795-13.436-9.762h16.608l5.132-15.794z"/>
        </svg>
    );
}

export function MountainRoundedRecIcon({ size, color = "onBackground" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M77.487 12.814A12.508 12.508 0 0064.978.305H12.617A12.508 12.508 0 00.108 12.815v52.36a12.51 12.51 0 0012.509 12.51h52.361a12.508 12.508 0 0012.509-12.51v-52.36z"/>
            <path fill="#DBDBDB" d="M61.876 55.232h-46.16l14.775-32.476 8.306 18.255 8.304-18.255 14.775 32.476z"/>
        </svg>
    );
}

export function TenRoundedRecIcon({ size, color = "onBackground" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            width={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M78.107 12.814A12.508 12.508 0 0065.598.305H13.237A12.508 12.508 0 00.728 12.815v52.36a12.51 12.51 0 0012.509 12.51h52.361a12.508 12.508 0 0012.509-12.51v-52.36z"/>
            <path fill="#DBDBDB" d="M19.65 39.634c.435 0 .884-.021 1.347-.065.461-.044.885-.11 1.268-.197.385-.087.703-.205.956-.353.252-.149.38-.327.38-.537a.813.813 0 00-.237-.6c-.435.156-.92.291-1.452.405-.53.113-1.207.17-2.028.17-.802 0-1.569-.14-2.301-.419a5.359 5.359 0 01-1.936-1.27c-.559-.566-1.003-1.277-1.335-2.131-.331-.855-.497-1.866-.497-3.035 0-.994.092-1.814.275-2.46.182-.645.397-1.246.641-1.805a27.787 27.787 0 002.642-.431 10.041 10.041 0 004.787-2.486c.734-.671 1.431-1.538 2.094-2.602h4.684c.697 0 1.324.06 1.883.182a3.434 3.434 0 011.438.667c.402.323.711.772.93 1.347.218.577.326 1.318.326 2.225v27.784a8.975 8.975 0 01-3.14 1.884c-1.186.419-2.38.628-3.583.628-.924 0-1.819-.118-2.682-.354a6.554 6.554 0 01-2.289-1.111 5.415 5.415 0 01-1.583-1.95c-.392-.793-.588-1.747-.588-2.864V39.634zm30.322 16.849c-2.25 0-4.3-.37-6.149-1.113a12.598 12.598 0 01-4.748-3.309c-1.316-1.465-2.337-3.28-3.061-5.442-.724-2.163-1.085-4.674-1.085-7.534 0-2.74.374-5.198 1.125-7.378.75-2.18 1.796-4.03 3.14-5.547a13.699 13.699 0 014.76-3.493c1.831-.81 3.837-1.216 6.018-1.216 2.162 0 4.164.406 6.004 1.216a13.68 13.68 0 014.775 3.493c1.342 1.518 2.389 3.367 3.139 5.547.75 2.18 1.125 4.639 1.125 7.378 0 2.86-.362 5.371-1.086 7.534-.723 2.163-1.743 3.977-3.06 5.442a12.598 12.598 0 01-4.75 3.31c-1.848.742-3.897 1.112-6.147 1.112zm5.232-11.25c-.21-.157-.506-.41-.89-.76a30.47 30.47 0 01-1.268-1.228c-.462-.472-.943-.99-1.44-1.557a25.887 25.887 0 01-1.399-1.74 26.202 26.202 0 01-1.125-1.701 47.225 47.225 0 01-1.936-3.48c-.244-.488-.401-.854-.471-1.098-.54 0-.811.314-.811.942 0 .244.075.571.222.981.149.41.354.876.615 1.4.262.523.576 1.081.942 1.674.366.592.768 1.186 1.203 1.779l.367.497a29.968 29.968 0 001.635 2.067c.532.61 1.03 1.125 1.491 1.543.463.42.877.742 1.244.968.365.227.67.34.915.34a.85.85 0 00.432-.13c.148-.088.24-.254.274-.497z"/>
        </svg>
    );
}

export function NextIcon({ size, color = "backgroundInverse" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            height={`${size}px`}
            viewBox="0 0 61 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M9.995 100.542L.864 91.41l40.858-40.859L.845 9.669 9.97.544l50.04 49.983-50.015 50.015z"/>
        </svg>
    );
}

export function PreviousIcon({ size, color = "backgroundInverse" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            height={`${size}px`}
            viewBox="0 0 61 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.907.536l9.131 9.131L19.18 50.526l40.878 40.883-9.125 9.125L.892 50.55 50.907.536z"/>
        </svg>
    );
}

export function CloseIcon({ size, color = "hoverable" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            height={`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M50.53 44.496L94.82.196l5.71 5.71-44.3 44.29 44.3 44.3-5.71 5.7-44.29-44.29-44.297 44.29-5.705-5.7 44.292-44.3L.528 5.906 6.233.196l44.297 44.3z"/>
        </svg>
    );
}

export function PlusIcon({ size, color="onSurface" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            height={typeof size === "string" ? size :`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M57.205 43.941h43.392v13.216H57.205v43.392H43.99V57.157H.597V43.94H43.99V.55h13.215v43.39z"/>
        </svg>
    );
}


export function PencilIcon({ size, color="onSurface" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            height={typeof size === "string" ? size :`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M29.862 98.175L5.34 100.22a4.038 4.038 0 01-4.36-4.36l2.045-24.522a4.021 4.021 0 011.169-2.52l53.377-53.376L69.797 3.216c3.976-3.976 10.422-3.976 14.398 0l13.79 13.79c3.976 3.976 3.976 10.422 0 14.398L85.758 43.63 32.382 97.006a4.023 4.023 0 01-2.52 1.169zM10.35 80.685l-.925 11.09 11.09-.925L10.35 80.685zm50.076-56.677L12.76 71.674 29.527 88.44l47.665-47.666-16.766-16.766zm22.477 11.056l9.371-9.371a2.105 2.105 0 000-2.977l-13.79-13.79a2.105 2.105 0 00-2.976 0l-9.371 9.371 16.766 16.767z"/>
        </svg>
    );
}

export function CheckIcon({ size, color="onSurface" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            height={typeof size === "string" ? size :`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M39.865 67.418L90.15.465l10.323 7.753-59.22 78.847-40.78-40.78 9.128-9.13 30.263 30.263z"/>
        </svg>
    );
}

export function GarbageCanIcon({ size, color="onSurface" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            height={typeof size === "string" ? size :`${size}px`}
            viewBox="0 0 88 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M16.123 13.425v-.72c0-6.888 6.74-12.472 15.053-12.472h25.868c8.314 0 15.054 5.584 15.054 12.471v.721h8.12c1.97 0 3.859.648 5.252 1.802 1.392 1.154 2.174 2.719 2.174 4.35v3.18H.576v-3.18c0-1.631.783-3.196 2.176-4.35 1.392-1.154 3.281-1.802 5.251-1.802h8.12zm48.577 0v-.72c0-3.504-3.428-6.343-7.656-6.343H31.176c-4.227 0-7.655 2.84-7.655 6.342v.721h41.18zM4.65 33.084c-.137-1.227.356-2.445 1.358-3.355 1.002-.91 2.42-1.43 3.907-1.43h68.391c1.487 0 2.905.52 3.907 1.43 1.002.91 1.494 2.128 1.357 3.355l-6.41 57.263c-.627 5.602-6.3 9.886-13.09 9.886H24.15c-6.79 0-12.464-4.284-13.09-9.886L4.65 33.084zM28.543 39.2c0-.744-.356-1.456-.99-1.981-.634-.526-1.495-.821-2.392-.821h-.002c-.897 0-1.757.295-2.392.82-.634.526-.99 1.238-.99 1.982v45.532c0 .743.356 1.456.99 1.982.635.525 1.495.82 2.392.82h.002c.897 0 1.758-.295 2.392-.82.634-.526.99-1.239.99-1.982V39.201zm37.903 0c0-.744-.357-1.456-.99-1.981-.635-.526-1.496-.821-2.392-.821h-.003c-.897 0-1.757.295-2.39.82-.635.526-.991 1.238-.991 1.982v45.532c0 .743.356 1.456.99 1.982.634.525 1.494.82 2.391.82h.003c.896 0 1.757-.295 2.391-.82.634-.526.99-1.239.99-1.982V39.201zm-18.952 0c0-.744-.356-1.456-.99-1.981-.634-.526-1.495-.821-2.391-.821h-.003c-.897 0-1.757.295-2.39.82-.635.526-.992 1.238-.992 1.982v45.532c0 .743.357 1.456.991 1.982.634.525 1.494.82 2.391.82h.003c.896 0 1.757-.295 2.391-.82.634-.526.99-1.239.99-1.982V39.201z"/>
        </svg>
    );
}

export function SearchIcon({ size, color="onSurface" }: IconProps) {
    return (
        <svg 
            className={styles[iconColor[color]]} 
            height={typeof size === "string" ? size :`${size}px`}
            viewBox="0 0 101 101" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M75.486 83.215a46.125 46.125 0 01-28.736 9.996c-25.57 0-46.331-20.76-46.331-46.33C.419 21.31 21.179.548 46.75.548S93.08 21.31 93.08 46.88c0 9.66-2.962 18.635-8.028 26.062l13.314 13.314a7.018 7.018 0 010 9.92 7.018 7.018 0 01-9.92 0l-12.96-12.96zM46.75 14.578c-17.829 0-32.302 14.474-32.302 32.302 0 17.829 14.473 32.303 32.302 32.303 17.828 0 32.302-14.474 32.302-32.303 0-17.828-14.474-32.302-32.302-32.302z"/>
        </svg>
    );
}


 
export function SidebarMenuIcon({ variant, size }: VariantProps) {
    if(variant === "HomeIcon") return HomeIcon({size});
    if(variant === "ClockIcon") return ClockIcon({size});
    if(variant === "StairIcon") return StairIcon({size});
    if(variant === "VinylIcon") return VinylIcon({size});
    if(variant === "ArchiveIcon") return ArchiveIcon({size});
    if(variant === "LogoutIcon") return LogoutIcon({size});
    if(variant === "SearchIcon") return SearchIcon({size});
    else return null;
}

export function RankChangeIcon({ variant, size }: VariantProps) {
    if(variant === "RankUpIcon") return RankUpIcon({size});
    if(variant === "RankDownIcon") return RankDownIcon({size});
    if(variant === "RankUnchangeIcon") return RankUnchangeIcon({size});
    if(variant === "CircleIcon") return CircleIcon({size});
    else return null;
}


