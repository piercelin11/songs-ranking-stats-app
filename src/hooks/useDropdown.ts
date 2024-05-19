"use client"
import { useState } from "react";

export default function useDropdown(): {
    isOpen: boolean;
    toggleDropdown: () => void;
} {

    const [isOpen, setDropdown] = useState(false);

    function toggleDropdown() {
        setDropdown( prevValue => !prevValue);
    }

    return {
        isOpen,
        toggleDropdown
    };
}