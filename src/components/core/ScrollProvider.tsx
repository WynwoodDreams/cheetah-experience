'use client';

import React, { createContext, useContext, useEffect, useRef, useCallback } from 'react';

interface ScrollContextType {
    /** Get current progress (0-1) without triggering re-renders */
    getProgress: () => number;
    /** Get current scrollY without triggering re-renders */
    getScrollY: () => number;
    /** Subscribe to scroll updates — returns unsubscribe function */
    subscribe: (callback: (progress: number, scrollY: number) => void) => () => void;
}

const ScrollContext = createContext<ScrollContextType>({
    getProgress: () => 0,
    getScrollY: () => 0,
    subscribe: () => () => {},
});

export const useScrollProgress = () => useContext(ScrollContext);

export const ScrollProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const progressRef = useRef(0);
    const scrollYRef = useRef(0);
    const subscribersRef = useRef<Set<(progress: number, scrollY: number) => void>>(new Set());

    const getProgress = useCallback(() => progressRef.current, []);
    const getScrollY = useCallback(() => scrollYRef.current, []);
    const subscribe = useCallback((cb: (progress: number, scrollY: number) => void) => {
        subscribersRef.current.add(cb);
        return () => { subscribersRef.current.delete(cb); };
    }, []);

    useEffect(() => {
        let ticking = false;

        const update = () => {
            const currentScrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const normalized = maxScroll > 0 ? currentScrollY / maxScroll : 0;
            const clamped = Math.min(Math.max(normalized, 0), 1);

            progressRef.current = clamped;
            scrollYRef.current = currentScrollY;

            subscribersRef.current.forEach(cb => cb(clamped, currentScrollY));
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleScroll);
        update(); // initial

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    const value = useRef({ getProgress, getScrollY, subscribe }).current;

    return (
        <ScrollContext.Provider value={value}>
            {children}
        </ScrollContext.Provider>
    );
};
