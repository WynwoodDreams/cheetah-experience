'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Metrics', href: '#metrics' },
    { label: 'Pricing', href: '#pricing' },
];

export const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled
                    ? 'bg-black/60 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Brand */}
                <a href="#" className="flex items-center gap-3 group">
                    <div className="w-8 h-8 rounded-lg bg-cheetah-gold/20 border border-cheetah-gold/40 flex items-center justify-center group-hover:bg-cheetah-gold/30 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-cheetah-gold">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">
                        Cheetah<span className="text-cheetah-gold">Sec</span>
                    </span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-gray-400 text-sm font-medium hover:text-white transition-colors"
                        >
                            {link.label}
                        </a>
                    ))}
                    <a
                        href="#cta"
                        className="px-5 py-2 bg-cheetah-gold/10 border border-cheetah-gold/40 text-cheetah-gold text-sm font-semibold rounded-lg hover:bg-cheetah-gold hover:text-black transition-all duration-200"
                    >
                        Get Protected
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
                        {mobileOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/80 backdrop-blur-xl border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col gap-4 px-6 py-6">
                            {navLinks.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-gray-300 text-sm font-medium hover:text-white transition-colors"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#cta"
                                className="px-5 py-2.5 bg-cheetah-gold text-black text-sm font-semibold rounded-lg text-center"
                                onClick={() => setMobileOpen(false)}
                            >
                                Get Protected
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};
