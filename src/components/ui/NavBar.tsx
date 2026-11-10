'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollProgress } from '@/components/core/ScrollProvider';

const navLinks = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'Metrics', href: '#metrics' },
    { label: 'Pricing', href: '#pricing' },
];

export const NavBar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeHref, setActiveHref] = useState<string | null>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const { subscribe, getProgress } = useScrollProgress();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 80);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Reading-progress bar: written straight to the DOM so scrolling never re-renders
    useEffect(() => {
        const apply = (progress: number) => {
            if (progressBarRef.current) {
                progressBarRef.current.style.transform = `scaleX(${progress})`;
            }
        };
        apply(getProgress());
        return subscribe(apply);
    }, [subscribe, getProgress]);

    // Highlight the link for the section currently in view
    useEffect(() => {
        if (typeof IntersectionObserver === 'undefined') return;
        const sections = navLinks
            .map(link => document.querySelector(link.href))
            .filter((el): el is Element => el !== null);
        if (sections.length === 0) return;

        const visible = new Set<string>();
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    const href = `#${entry.target.id}`;
                    if (entry.isIntersecting) visible.add(href);
                    else visible.delete(href);
                });
                const current = navLinks.find(link => visible.has(link.href));
                setActiveHref(current ? current.href : null);
            },
            { rootMargin: '-45% 0px -50% 0px' }
        );
        sections.forEach(section => observer.observe(section));
        return () => observer.disconnect();
    }, []);

    // Escape closes the mobile menu
    useEffect(() => {
        if (!mobileOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setMobileOpen(false);
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [mobileOpen]);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            aria-label="Primary"
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                scrolled || mobileOpen
                    ? 'bg-black/70 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
                    : 'bg-transparent border-b border-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
                {/* Brand */}
                <a href="#" className="flex items-center gap-3 group" aria-label="CheetahSec home">
                    <div className="w-8 h-8 rounded-lg bg-cheetah-gold/20 border border-cheetah-gold/40 flex items-center justify-center group-hover:bg-cheetah-gold/30 transition-colors">
                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-cheetah-gold" aria-hidden="true">
                            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <span className="text-white font-bold text-lg tracking-tight">
                        Cheetah<span className="text-cheetah-gold">Sec</span>
                    </span>
                </a>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => {
                        const isActive = activeHref === link.href;
                        return (
                            <a
                                key={link.href}
                                href={link.href}
                                aria-current={isActive ? 'true' : undefined}
                                className={`relative py-1 text-sm font-medium transition-colors ${
                                    isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                                }`}
                            >
                                {link.label}
                                <span
                                    aria-hidden="true"
                                    className={`absolute left-0 right-0 -bottom-0.5 h-px bg-cheetah-gold origin-left transition-transform duration-300 ${
                                        isActive ? 'scale-x-100' : 'scale-x-0'
                                    }`}
                                />
                            </a>
                        );
                    })}
                    <a
                        href="#cta"
                        className="px-5 py-2 bg-cheetah-gold text-black text-sm font-semibold rounded-lg hover:bg-cheetah-gold-light transition-colors duration-200"
                    >
                        Get Protected
                    </a>
                </div>

                {/* Mobile toggle */}
                <button
                    className="md:hidden text-white p-2 -mr-2 cursor-pointer"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                    aria-expanded={mobileOpen}
                    aria-controls="mobile-menu"
                >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true">
                        {mobileOpen ? (
                            <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round"/>
                        ) : (
                            <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round"/>
                        )}
                    </svg>
                </button>
            </div>

            {/* Scroll progress */}
            <div
                ref={progressBarRef}
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-gradient-to-r from-cheetah-gold/40 via-cheetah-gold to-cheetah-gold-light"
            />

            {/* Mobile menu */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        id="mobile-menu"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden border-t border-white/10 overflow-hidden"
                    >
                        <div className="flex flex-col gap-1 px-6 py-5">
                            {navLinks.map(link => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`py-3 text-base font-medium transition-colors ${
                                        activeHref === link.href ? 'text-cheetah-gold' : 'text-gray-200 hover:text-white'
                                    }`}
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.label}
                                </a>
                            ))}
                            <a
                                href="#cta"
                                className="mt-3 px-5 py-3 bg-cheetah-gold text-black text-sm font-semibold rounded-lg text-center"
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
