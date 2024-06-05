import { useState, useLayoutEffect, useRef } from "react";

export default function useBannerAnimation() {
    const coverRef = useRef(null);

    const [size, setSize] = useState(100);
    const [opacity, setOpacity] = useState(0.35);
    const [stickyOpacity, setStickyOpacity] = useState(0);

    const onScroll = () => {
        if (coverRef.current) {
            const ref: HTMLDivElement = coverRef.current;
            const topPos =  ref.getBoundingClientRect().top;

            if (Math.abs(topPos) < 400) {
                setSize(100 + Math.abs(topPos) / 20);
                setOpacity(0.35 + Math.abs(topPos) / 500);
                
                if (Math.abs(topPos) > 250)
                    setStickyOpacity((Math.abs(topPos) - 250) / 100);
                if (Math.abs(topPos) < 250)
                    setStickyOpacity(0);
            }
        }
    }
    
    useLayoutEffect(() => {
        
        window.addEventListener("scroll", onScroll)
        return () => window.removeEventListener("scroll", onScroll)

    }, []);

    return (
        {
            ref: coverRef,
            coverSize: size,
            overlayOpacity: opacity,
            stickyOpacity: stickyOpacity
        }
    );
}