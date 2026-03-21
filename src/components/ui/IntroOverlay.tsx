'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const IntroOverlay = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleStart = () => setIsVisible(false);

    return (
        <AnimatePresence>
            {isVisible && (
                <div className="fixed inset-0 z-50 overflow-hidden">
                    {/* ── Left curtain ── */}
                    <motion.div
                        className="absolute top-0 left-0 w-1/2 h-full bg-black z-20"
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    />
                    {/* ── Right curtain ── */}
                    <motion.div
                        className="absolute top-0 right-0 w-1/2 h-full bg-black z-20"
                        exit={{ x: '100%' }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                    />

                    {/* ── Background video ── */}
                    <motion.div
                        className="absolute inset-0 z-10 opacity-30"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <video
                            src="/sequence/cheetah_run.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover grayscale"
                        />
                    </motion.div>

                    {/* ── Scan line effect ── */}
                    <div className="absolute inset-0 z-30 pointer-events-none opacity-[0.03]"
                        style={{
                            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
                        }}
                    />

                    {/* ── Center content ── */}
                    <motion.div
                        className="relative z-30 flex flex-col items-center justify-center h-full"
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-center"
                        >
                            <div className="text-cheetah-gold/60 text-xs font-mono tracking-[0.5em] uppercase mb-6">
                                CheetahSec
                            </div>
                            <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase text-white mb-3">
                                Hunt
                            </h1>
                            <p className="text-white/40 tracking-[0.5em] uppercase text-xs font-mono mb-14">
                                The Pursuit Begins
                            </p>

                            <button
                                onClick={handleStart}
                                className="group relative px-10 py-4 bg-transparent border border-white/15 hover:border-cheetah-gold/60 transition-all duration-500 rounded-lg overflow-hidden"
                            >
                                <span className="relative z-10 text-white/80 group-hover:text-cheetah-gold tracking-[0.2em] uppercase text-xs font-bold transition-colors duration-300">
                                    Enter Experience
                                </span>
                                <div className="absolute inset-0 bg-cheetah-gold/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
