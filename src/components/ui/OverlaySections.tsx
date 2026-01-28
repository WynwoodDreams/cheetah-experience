'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <section className={`h-screen flex items-center justify-center p-8 ${className}`}>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    </section>
);

// Running cheetah silhouette SVG component
const RunningCheetah = () => (
    <svg viewBox="0 0 200 80" fill="currentColor" className="w-full h-full">
        {/* Cheetah running silhouette */}
        <path d="M180 45c-3-2-8-3-12-2l-15 3c-2 0-4-1-5-3l-8-12c-2-3-5-5-9-5h-8c-2 0-4 1-5 3l-6 10c-1 2-3 3-5 3l-25-2c-3 0-6 1-8 3l-12 12c-2 2-5 3-8 3H35c-3 0-6-2-7-5l-3-8c-1-3-4-5-7-5H8c-2 0-4 2-4 4v6c0 2 2 4 4 4h8l5 10c2 4 6 6 10 6h15c3 0 6-1 8-3l10-10 30 2c4 0 8-2 10-5l4-6 5 8c2 3 5 5 9 5l20-4c5-1 10 0 14 3l8 6c2 1 4 1 6 0 2-2 2-5 0-7l-15-12z"/>
        {/* Head detail */}
        <ellipse cx="25" cy="38" rx="8" ry="6"/>
        {/* Ear */}
        <path d="M20 30l-3-8c-1-2 1-4 3-3l5 6c1 1 0 3-2 3l-3 2z"/>
        {/* Spots pattern */}
        <circle cx="60" cy="42" r="3" opacity="0.3"/>
        <circle cx="75" cy="38" r="2.5" opacity="0.3"/>
        <circle cx="90" cy="44" r="3" opacity="0.3"/>
        <circle cx="105" cy="40" r="2" opacity="0.3"/>
        <circle cx="120" cy="42" r="2.5" opacity="0.3"/>
        <circle cx="140" cy="45" r="2" opacity="0.3"/>
    </svg>
);

export const OverlaySections = () => {
    return (
        <main className="relative z-10 w-full">

            {/* Hero */}
            <section className="h-screen flex flex-col items-center justify-center text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.5 }}
                >
                    <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase text-white drop-shadow-2xl">
                        Acinonyx
                    </h1>
                    <p className="text-cheetah-gold tracking-[0.5em] mt-4 uppercase text-sm md:text-base font-bold">
                        The Ultimate Sprinter
                    </p>
                </motion.div>
                <motion.div
                    className="absolute bottom-10 animate-bounce"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <span className="text-white/50 text-xs tracking-widest">SCROLL TO HUNT</span>
                </motion.div>
            </section>

            {/* Speed Section - Why Speed Matters */}
            <section className="h-screen flex items-center justify-center p-8 relative overflow-hidden">
                {/* Running cheetah animation - travels from bottom to top */}
                <motion.div
                    className="absolute w-48 md:w-64 h-24 md:h-32 text-cheetah-gold/60 pointer-events-none"
                    initial={{ opacity: 0, x: "-10%", y: "100vh" }}
                    whileInView={{ opacity: [0, 1, 1, 1, 0.8], x: "110%", y: "-100vh" }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{
                        duration: 4,
                        ease: "easeInOut",
                        times: [0, 0.1, 0.5, 0.9, 1]
                    }}
                >
                    <RunningCheetah />
                </motion.div>

                {/* Second cheetah - slightly delayed, different path */}
                <motion.div
                    className="absolute w-40 md:w-56 h-20 md:h-28 text-cheetah-gold/40 pointer-events-none"
                    initial={{ opacity: 0, x: "20%", y: "120vh" }}
                    whileInView={{ opacity: [0, 0.8, 0.8, 0.8, 0.6], x: "90%", y: "-80vh" }}
                    viewport={{ once: false, amount: 0.1 }}
                    transition={{
                        duration: 4.5,
                        ease: "easeInOut",
                        delay: 0.3,
                        times: [0, 0.1, 0.5, 0.9, 1]
                    }}
                >
                    <RunningCheetah />
                </motion.div>

                {/* Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ amount: 0.3, margin: "-50px" }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="text-center relative z-10">
                        <p className="text-sm md:text-base text-cheetah-gold/80 uppercase tracking-[0.3em] mb-2">
                            Why Speed Matters
                        </p>
                        <h2 className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cheetah-gold to-white mb-4">
                            70 MPH
                        </h2>
                        <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
                            Accelerating from 0 to 60 mph in just 3 seconds, the cheetah is a masterpiece of biological engineering.
                        </p>
                    </div>
                </motion.div>
            </section>

            {/* Anatomy Section */}
            <Section className="items-end md:items-center">
                <div className="md:w-1/2 md:ml-auto text-right">
                    <h3 className="text-4xl text-cheetah-gold font-black mb-2 uppercase">Aerodynamic Frame</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Semi-retractable claws act like sprinting spikes. An enlarged heart pumps oxygen rapidly to fuel the chase.
                    </p>
                </div>
            </Section>

            {/* Habitat Section */}
            <Section className="items-start md:items-center">
                <div className="md:w-1/2 md:mr-auto text-left">
                    <h3 className="text-4xl text-cheetah-gold font-black mb-2 uppercase">Savannah Ghost</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Camouflaged against the tall grass, they stalk silently before unleashing their explosive power.
                    </p>
                </div>
            </Section>

            {/* Footer */}
            <section className="h-[50vh] flex items-center justify-center bg-black/80 backdrop-blur-sm">
                <div className="text-center">
                    <h2 className="text-2xl text-white font-bold mb-4">Protect the Speed</h2>
                    <button className="px-8 py-3 bg-cheetah-gold text-black font-bold uppercase tracking-wider rounded-full hover:bg-white transition-colors">
                        Learn Conservation
                    </button>
                </div>
            </section>

        </main>
    );
};
