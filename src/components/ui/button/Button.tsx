import styles from "@/styles/button.module.css"
import { ReactNode } from "react";

type ButtonType = {
    children: ReactNode,
    value?: number | string,
    padding?: string,
    gap?: number,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    variant?: "primary" | "secondary" | "onBackground" | "onSurface" | "transparent",
    type?: "submit" | "button"
}

const variantType: Record<string, string> = {
    primary: "primaryButton",
    secondary: "secondaryButton",
    onBackground: "onBackgroundButton",
    onSurface: "onSurfaceButton",
    transparent: "transparentButton"
}

function toPadding(padding: string | undefined): string | undefined {
    if (!padding) return undefined;

    const array = padding.split(" ");
    const pxArray = array.map( item => `${item}px` );
    const resultString = pxArray.join(" ");

    return resultString;
}

export function RecButton ({ children, value, padding, gap, onClick, variant = "primary", type } : ButtonType) {

    return (
        <button 
            className={`${styles.RecButton} ${styles[variantType[variant]]}`}
            value={value}
            onClick={onClick}
            type={type}
            style={{
                padding: toPadding(padding),
                gap: `${gap}px`
            }}
        >
            { children }
        </button>
    );
}

export function RoundButton ({ children, value, padding, gap, onClick, variant = "primary", type } : ButtonType) {

    return (
        <button 
            className={`${styles.RoundButton} ${styles[variantType[variant]]}`}
            value={value}
            onClick={onClick}
            type={type}
            style={{
                padding: toPadding(padding),
                gap: gap
            }}
        >
            { children }
        </button>
    );
}