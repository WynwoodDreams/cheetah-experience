'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const IntroOverlay = () => {
    const [isVisible, setIsVisible] = useState(true);

    const handleStart = () => {
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
                    // We can add a fade out for the container itself optionally, 
                    // but the "curtain" effect usually implies the content splits or moves.
                    // Let's do a simple vertical slide up "curtain" or split.
                    // For a "screen opening up", let's try a centralized split or just a slide up.
                    // Simpler and cinematic: Slide Up.
                    exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                >
                    {/* Background Video Loop - Playing normally (not scroll controlled) */}
                    <div className="absolute inset-0 z-0 opacity-40">
                        <video
                            src="/sequence/cheetah_run.mp4"
                            autoPlay
                            loop
                            muted
                            playsInline
                            className="w-full h-full object-cover grayscale"
                        />
                    </div>

                    {/* Intro Content */}
                    <motion.div
                        className="relative z-10 text-center"
                        exit={{ opacity: 0, y: -50, transition: { duration: 0.5 } }}
                    >
                        <h1 className="text-8xl md:text-9xl font-black tracking-tighter uppercase text-white mb-2">
                            Hunt
                        </h1>
                        <p className="text-cheetah-gold tracking-[0.8em] uppercase text-sm font-bold mb-12">
                            The Pursuit Begins
                        </p>

                        <button
                            onClick={handleStart}
                            className="group relative px-8 py-4 bg-transparent border border-white/20 hover:border-cheetah-gold transition-colors duration-300 rounded-none overflow-hidden"
                        >
                            <span className="relative z-10 text-white group-hover:text-cheetah-gold tracking-widest uppercase text-xs font-bold transition-colors">
                                Enter Experience
                            </span>
                            <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500 ease-out" />
                        </button>
                    </motion.div>

                    {/* Curtain Effect Elements (Optional fancy split) */}
                    {/* If we want a "split", we'd need two divs covering the screen that animate apart.
              For now, the container fade/slide is clean, but let's try a "shutter" feel.
          */}

                </motion.div>
            )}
        </AnimatePresence>
    );
};
