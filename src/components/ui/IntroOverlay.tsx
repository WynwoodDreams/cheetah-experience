'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CURTAIN_EASE = [0.76, 0, 0.24, 1] as const;

export const IntroOverlay = () => {
    const [isVisible, setIsVisible] = useState(true);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const handleStart = () => setIsVisible(false);

    // Keep the page from scrolling behind the intro, and let Enter start it
    useEffect(() => {
        if (!isVisible) return;
        const root = document.documentElement;
        const previousOverflow = root.style.overflow;
        root.style.overflow = 'hidden';
        buttonRef.current?.focus({ preventScroll: true });
        return () => {
            root.style.overflow = previousOverflow;
        };
    }, [isVisible]);

    return (
        <AnimatePresence>
            {isVisible && (
                <div
                    className="fixed inset-0 z-50 overflow-hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-label="CheetahSec intro"
                >
                    {/* ── Left curtain ── */}
                    <motion.div
                        className="absolute top-0 left-0 w-1/2 h-full bg-black z-10"
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.8, ease: CURTAIN_EASE }}
                    />
                    {/* ── Right curtain ── */}
                    <motion.div
                        className="absolute top-0 right-0 w-1/2 h-full bg-black z-10"
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.8, ease: CURTAIN_EASE }}
                    />

                    {/* ── Background video (sits on top of the curtains, dimmed) ── */}
                    <motion.div
                        className="absolute inset-0 z-20 opacity-50"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <video
                            src="/sequence/cheetah_run.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            aria-hidden="true"
                            className="w-full h-full object-cover"
                        />
                    </motion.div>

                    {/* ── Vignette so the title always reads ── */}
                    <motion.div
                        className="absolute inset-0 z-20 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_0%,rgba(0,0,0,0.8)_70%,#000_100%)]"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    />

                    {/* ── Center content ── */}
                    <motion.div
                        className="relative z-30 flex flex-col items-center justify-center h-full px-6"
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="flex items-center justify-center gap-4 text-cheetah-gold/80 text-xs font-mono tracking-[0.5em] uppercase mb-6">
                                <span className="h-px w-10 bg-gradient-to-r from-transparent to-cheetah-gold/60" aria-hidden="true" />
                                <span className="pl-[0.5em]">CheetahSec</span>
                                <span className="h-px w-10 bg-gradient-to-l from-transparent to-cheetah-gold/60" aria-hidden="true" />
                            </div>
                            <h1 className="text-7xl sm:text-8xl md:text-9xl font-black tracking-tighter uppercase text-white mb-4 [text-shadow:0_4px_40px_rgba(0,0,0,0.6)]">
                                Hunt
                            </h1>
                            <p className="text-white/60 tracking-[0.5em] pl-[0.5em] uppercase text-xs font-mono mb-14">
                                The Pursuit Begins
                            </p>

                            <button
                                ref={buttonRef}
                                onClick={handleStart}
                                className="group relative px-10 py-4 bg-black/40 backdrop-blur-sm border border-white/25 hover:border-cheetah-gold/60 transition-all duration-500 rounded-full overflow-hidden cursor-pointer"
                            >
                                <span className="relative z-10 inline-flex items-center gap-3 text-white group-hover:text-cheetah-gold tracking-[0.2em] uppercase text-xs font-bold transition-colors duration-300">
                                    Enter Experience
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                                        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </span>
                                <div className="absolute inset-0 bg-cheetah-gold/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
