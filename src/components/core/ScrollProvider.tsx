'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useWindowScroll, useWindowSize } from 'react-use';

interface ScrollContextType {
    progress: number;
    scrollY: number;
}

const ScrollContext = createContext<ScrollContextType>({ progress: 0, scrollY: 0 });

export const useScrollProgress = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [progress, setProgress] = useState(0);
    const [scrollY, setScrollY] = useState(0);

    // We can't strictly depend on react-use for high-freq scroll updates if we want to
    // optimize the render loop, but for the React context part, it's fine.
    // Ideally, the Canvas component will bind its own raf loop or scroll listener 
    // to avoid React re-render overhead for the *drawing*, but this context is useful
    // for UI reactions (fade ins, etc).

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const innerHeight = window.innerHeight;
            const scrollHeight = document.documentElement.scrollHeight;

            const maxScroll = scrollHeight - innerHeight;
            const normalized = maxScroll > 0 ? currentScrollY / maxScroll : 0;

            setScrollY(currentScrollY);
            setProgress(Math.min(Math.max(normalized, 0), 1));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);

        // Initial call
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    return (
        <ScrollContext.Provider value={{ progress, scrollY }}>
            {children}
        </ScrollContext.Provider>
    );
};
