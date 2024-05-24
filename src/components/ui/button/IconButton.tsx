import styles from "@/styles/button.module.css"
import { ReactNode } from "react";

type ButtonType = {
    children: ReactNode,
    value?: number | string,
    size?: number | "100%",
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
    variant?: "primary" | "secondary" | "onBackground" | "onSurface";
    type?: "submit" | "button"
}

const variantType: Record<string, string> = {
    primary: "primaryButton",
    secondary: "secondaryButton",
    onBackground: "onBackgroundButton",
    onSurface: "onSurfaceButton",
    transparent: "transparentButton"
}


export function IconButtonRound ({ children, value, size, onClick, variant = "primary", type } : ButtonType) {

    return (
        <button 
            className={`${styles.iconButtonRound} ${styles[variantType[variant]]}`}
            value={value}
            onClick={onClick}
            style={{
                width: size === "100%" ? "100%" : `${size}px`,
                height: size === "100%" ? "auto" : `${size}px`,
                aspectRatio: size === "100%" ? "1 / 1" : "unset",
            }}
            type={type}
        >
            { children }
        </button>
    );
}

export function IconButtonRec ({ children, value, size, onClick, variant = "primary", type } : ButtonType) {

    return (
        <button 
            className={`${styles.iconButtonRec} ${styles[variantType[variant]]}`}
            value={value}
            onClick={onClick}
            style={{
                width: size === "100%" ? "100%" : `${size}px`,
                height: size === "100%" ? "auto" : `${size}px`,
                aspectRatio: size === "100%" ? "1 / 1" : "unset",
            }}
            type={type}
        >
            { children }
        </button>
    );
}