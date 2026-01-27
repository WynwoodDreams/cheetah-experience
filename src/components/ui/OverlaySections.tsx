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

            {/* Speed Section */}
            <Section>
                <div className="text-center">
                    <h2 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cheetah-gold to-white mb-4">
                        70 MPH
                    </h2>
                    <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
                        Accelerating from 0 to 60 mph in just 3 seconds, the cheetah is a masterpiece of biological engineering.
                    </p>
                </div>
            </Section>

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
