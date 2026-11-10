'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* ─── Reusable Section wrapper ─── */
const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
    <section id={id} className={`flex justify-center px-6 py-16 md:px-12 md:py-24 ${className}`}>
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-6xl"
        >
            {children}
        </motion.div>
    </section>
);

/* ─── Section heading block ─── */
const SectionHeading: React.FC<{ eyebrow: string; title: string; description: string }> = ({ eyebrow, title, description }) => (
    <div className="text-center mb-12 md:mb-16">
        <p className="text-cheetah-gold text-xs font-mono tracking-[0.3em] uppercase mb-4">{eyebrow}</p>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 text-balance">
            {title}
        </h2>
        <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto text-pretty">
            {description}
        </p>
    </div>
);

/* ─── SVG Icon Components ─── */
const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round"/>
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round"/>
    </svg>
);

const RadarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round"/>
    </svg>
);

const NetworkIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <circle cx="12" cy="5" r="3"/>
        <circle cx="5" cy="19" r="3"/>
        <circle cx="19" cy="19" r="3"/>
        <path d="M12 8v4M8.5 16.5L11 12M15.5 16.5L13 12" strokeLinecap="round"/>
    </svg>
);

const BoltIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TerminalIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6" aria-hidden="true">
        <rect x="2" y="3" width="20" height="18" rx="3" strokeLinecap="round"/>
        <path d="M6 9l4 3-4 3M12 15h6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CheckIcon = () => (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 mt-0.5 shrink-0 text-cheetah-gold" aria-hidden="true">
        <path d="M4.5 10.5l3.5 3.5 7.5-8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const ArrowIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true">
        <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

/* ─── Shared surfaces ─── */
const CARD_SURFACE = "bg-surface/85 backdrop-blur-md border border-white/[0.08]";
const BTN_PRIMARY = "bg-cheetah-gold text-black font-semibold rounded-lg hover:bg-cheetah-gold-light active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[0_8px_30px_-8px_rgba(217,160,54,0.55)]";
const BTN_SECONDARY = "border border-white/25 bg-white/[0.04] backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/10 hover:border-white/40 active:scale-[0.98] transition-all duration-200 cursor-pointer";

/* ─── Feature Card ─── */
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; index?: number }> = ({ icon, title, description, index = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: (index % 3) * 0.08 }}
        className={`group relative overflow-hidden ${CARD_SURFACE} rounded-2xl p-7 hover:-translate-y-1 hover:border-cheetah-gold/30 hover:shadow-[0_20px_50px_-20px_rgba(217,160,54,0.35)] transition-[translate,border-color,box-shadow] duration-300`}
    >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cheetah-gold/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="w-12 h-12 mb-5 flex items-center justify-center rounded-xl bg-cheetah-gold/10 border border-cheetah-gold/20 text-cheetah-gold group-hover:bg-cheetah-gold group-hover:text-black transition-colors duration-300">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </motion.div>
);

/* ─── Stat Card ─── */
const StatCard: React.FC<{ value: string; label: string; description: string }> = ({ value, label, description }) => (
    <div className="bg-surface p-8 text-center">
        <div className="text-4xl md:text-5xl font-bold text-cheetah-gold mb-3 font-mono tracking-tight">{value}</div>
        <div className="text-white font-semibold mb-2">{label}</div>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);

/* ─── Content ─── */
const features = [
    { icon: <ShieldIcon />, title: "Threat Intelligence", description: "Real-time threat feeds correlated with your environment. Know about attacks before they reach your perimeter." },
    { icon: <LockIcon />, title: "Zero-Trust Access", description: "Continuous authentication and micro-segmentation. Every request verified, every session monitored." },
    { icon: <RadarIcon />, title: "24/7 SOC Monitoring", description: "AI-augmented analysts watching your infrastructure around the clock with automated incident response." },
    { icon: <NetworkIcon />, title: "Network Detection", description: "Deep packet inspection and behavioral analysis across your entire network topology in real time." },
    { icon: <BoltIcon />, title: "Automated Response", description: "SOAR playbooks execute in milliseconds — isolate hosts, block IPs, and contain breaches instantly." },
    { icon: <TerminalIcon />, title: "Pen Testing as a Service", description: "Continuous red-team simulations against your infrastructure with detailed remediation guidance." },
];

const stats = [
    { value: "99.97%", label: "Threat Detection Rate", description: "AI models trained on billions of threat indicators with near-zero false negatives" },
    { value: "<200ms", label: "Mean Time to Detect", description: "From first packet anomaly to classified alert in under 200 milliseconds" },
    { value: "4.2B+", label: "Events Analyzed Daily", description: "Processing security telemetry at scale across all customer environments" },
    { value: "0", label: "Breaches on Our Watch", description: "Zero successful breaches across all managed detection customers" },
];

const plans = [
    {
        name: "Recon", price: "Free", suffix: "", tagline: "For teams getting started", cta: "Start Free", featured: false,
        perks: ["Vulnerability scanning", "1 environment", "Weekly threat reports", "Community support"],
    },
    {
        name: "Hunter", price: "$499", suffix: "/mo", tagline: "Active threat hunting", cta: "Start 14-Day Trial", featured: true,
        perks: ["Real-time threat detection", "Up to 10 environments", "Automated incident response", "SIEM integration", "24/7 priority support"],
    },
    {
        name: "Apex Predator", price: "Custom", suffix: "", tagline: "Full managed SOC", cta: "Contact Sales", featured: false,
        perks: ["Managed detection & response", "Unlimited environments", "Dedicated security team", "Custom SOAR playbooks", "Compliance reporting"],
    },
];

const footerColumns = [
    { title: "Platform", links: ["Threat Detection", "Incident Response", "Pen Testing", "API Docs"] },
    { title: "Company", links: ["About", "Blog", "Careers", "Press"] },
    { title: "Resources", links: ["Threat Intel Feed", "Knowledge Base", "Status", "Trust Center"] },
    { title: "Legal", links: ["Privacy", "Terms", "Security Policy", "Compliance"] },
];

/* ─── Main Overlay ─── */
export const OverlaySections = () => {
    return (
        <main className="relative z-10 w-full">

            {/* ══════ HERO ══════ */}
            <section className="relative min-h-[100svh] flex flex-col items-start justify-end pb-28 pt-28 px-6 md:px-16">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="max-w-2xl"
                >
                    <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 mb-6 text-xs font-mono text-cheetah-gold border border-cheetah-gold/30 rounded-full bg-black/50 backdrop-blur-md tracking-wider">
                        <span className="status-dot" aria-hidden="true" />
                        NEXT-GEN CYBERSECURITY
                    </div>
                    <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl mb-5 leading-[0.95]">
                        Threat Response
                        <span className="block text-cheetah-gold">at Cheetah Speed</span>
                    </h1>
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed mb-8 max-w-lg text-pretty">
                        AI-powered security operations that detect, analyze, and neutralize threats
                        faster than attackers can move.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <a href="#cta" className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 ${BTN_PRIMARY}`}>
                            Start Free Audit
                            <ArrowIcon />
                        </a>
                        <a href="#solutions" className={`inline-flex items-center justify-center px-6 py-3.5 ${BTN_SECONDARY}`}>
                            See How It Works
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <motion.span
                        className="block text-white/50 text-[10px] tracking-[0.3em] pl-[0.3em] font-mono"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        SCROLL
                    </motion.span>
                    <div aria-hidden="true" className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
                </motion.div>
            </section>

            {/* ══════ SPEED SECTION ══════ */}
            <section className="relative min-h-[100svh] flex items-center justify-center px-6 py-24 overflow-hidden">
                {/* Soft dark pool so the numerals stay readable over the video */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_50%_at_center,rgba(2,4,10,0.9)_0%,rgba(2,4,10,0.65)_50%,transparent_100%)]" />

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center relative z-10"
                >
                    <p className="text-sm md:text-base text-cheetah-gold uppercase tracking-[0.3em] pl-[0.3em] mb-4 font-mono">
                        Mean Time to Detect
                    </p>
                    <h2 className="text-gold-gradient text-7xl sm:text-8xl md:text-[10rem] font-black leading-none mb-6 tracking-tighter">
                        &lt;200ms
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 max-w-md mx-auto leading-relaxed text-pretty">
                        While legacy systems take hours to flag anomalies, our AI identifies and
                        classifies threats in under 200 milliseconds.
                    </p>
                </motion.div>

                {/* Blend the video into the black sections below */}
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-black pointer-events-none" />
            </section>

            {/* ══════ BLACK SECTIONS ══════ */}
            <div className="bg-black cheetah-spots">

                {/* ── Solutions Grid ── */}
                <Section id="solutions">
                    <SectionHeading
                        eyebrow="Security Suite"
                        title="Protection at Every Layer"
                        description="From endpoint to cloud, CheetahSec covers every attack surface with AI-driven defense."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {features.map((feature, i) => (
                            <FeatureCard key={feature.title} index={i} {...feature} />
                        ))}
                    </div>
                </Section>

                {/* ── Metrics ── */}
                <Section id="metrics">
                    <SectionHeading
                        eyebrow="By The Numbers"
                        title="Security That Scales"
                        description="Battle-tested across Fortune 500 environments"
                    />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08]">
                        {stats.map(stat => (
                            <StatCard key={stat.label} {...stat} />
                        ))}
                    </div>
                </Section>

                {/* ── Pricing ── */}
                <Section id="pricing">
                    <SectionHeading
                        eyebrow="Plans"
                        title="Security for Every Stage"
                        description="Start with a free security audit. Scale to full managed detection."
                    />
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:items-center max-w-5xl mx-auto">
                        {plans.map(plan => (
                            <div
                                key={plan.name}
                                className={
                                    plan.featured
                                        ? "relative flex flex-col rounded-2xl p-8 md:py-10 bg-gradient-to-b from-[#1c1608] to-surface border border-cheetah-gold/50 shadow-[0_30px_80px_-30px_rgba(217,160,54,0.5)]"
                                        : `relative flex flex-col rounded-2xl p-8 ${CARD_SURFACE} hover:border-white/20 transition-colors duration-300`
                                }
                            >
                                {plan.featured && (
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cheetah-gold text-black text-xs font-bold px-4 py-1 rounded-full tracking-wider">
                                        RECOMMENDED
                                    </div>
                                )}
                                <div className={`text-sm font-mono uppercase tracking-[0.2em] mb-4 ${plan.featured ? "text-cheetah-gold" : "text-gray-400"}`}>{plan.name}</div>
                                <div className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
                                    {plan.price}
                                    {plan.suffix && <span className="text-base text-gray-400 font-normal tracking-normal">{plan.suffix}</span>}
                                </div>
                                <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-white/[0.08]">{plan.tagline}</p>
                                <ul className="space-y-3 mb-8 text-gray-200 text-sm flex-1">
                                    {plan.perks.map(perk => (
                                        <li key={perk} className="flex gap-2.5"><CheckIcon /> {perk}</li>
                                    ))}
                                </ul>
                                <button className={`w-full py-3 text-sm ${plan.featured ? BTN_PRIMARY : BTN_SECONDARY}`}>
                                    {plan.cta}
                                </button>
                            </div>
                        ))}
                    </div>
                </Section>

                {/* ── CTA ── */}
                <section id="cta" className="flex justify-center px-6 py-16 md:px-12 md:py-24">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7 }}
                        className="relative overflow-hidden w-full max-w-5xl text-center rounded-3xl border border-cheetah-gold/25 bg-surface px-6 py-16 md:px-16 md:py-20"
                    >
                        <div aria-hidden="true" className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_70%_90%_at_50%_0%,rgba(217,160,54,0.22)_0%,transparent_70%)]" />
                        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cheetah-gold to-transparent" />
                        <div className="relative max-w-2xl mx-auto">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 text-balance">
                                Don&apos;t Wait for the Breach
                            </h2>
                            <p className="text-gray-300 mb-10 text-lg text-pretty">
                                Every second without protection is a second attackers are using to probe your defenses.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button className={`px-8 py-4 uppercase tracking-wider text-sm !font-bold ${BTN_PRIMARY}`}>
                                    Start Free Security Audit
                                </button>
                                <button className={`px-8 py-4 text-sm ${BTN_SECONDARY}`}>
                                    Schedule Demo
                                </button>
                            </div>
                            <p className="text-gray-400 text-xs mt-8 tracking-wide">
                                No credit card required &middot; SOC 2 Type II certified &middot; Cancel anytime
                            </p>
                        </div>
                    </motion.div>
                </section>

                {/* ── Footer ── */}
                <footer className="border-t border-white/[0.08] bg-black/70 py-14 px-6 md:px-12">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        {footerColumns.map(column => (
                            <div key={column.title}>
                                <h4 className="text-white font-semibold mb-4 text-sm">{column.title}</h4>
                                <ul className="space-y-2.5 text-gray-400 text-sm">
                                    {column.links.map(link => (
                                        <li key={link}><a href="#" className="hover:text-cheetah-gold transition-colors">{link}</a></li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/[0.08] flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-500 text-sm">
                            &copy; 2026 CheetahSec. All rights reserved.
                        </div>
                        <div className="flex gap-6 text-gray-400 text-sm">
                            <a href="#" className="hover:text-cheetah-gold transition-colors">Twitter</a>
                            <a href="#" className="hover:text-cheetah-gold transition-colors">GitHub</a>
                            <a href="#" className="hover:text-cheetah-gold transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </footer>

            </div>
        </main>
    );
};
