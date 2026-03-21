'use client';

import React from 'react';
import { motion } from 'framer-motion';

/* ─── Reusable Section wrapper ─── */
const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({ children, className = "", id }) => (
    <section id={id} className={`min-h-screen flex items-center justify-center px-6 py-24 md:px-12 ${className}`}>
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="w-full max-w-6xl"
        >
            {children}
        </motion.div>
    </section>
);

/* ─── SVG Icon Components ─── */
const ShieldIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M12 2l8 4v6c0 5.25-3.5 10-8 11-4.5-1-8-5.75-8-11V6l8-4z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const LockIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="3" y="11" width="18" height="11" rx="2" strokeLinecap="round"/>
        <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round"/>
    </svg>
);

const RadarIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="12" r="6"/>
        <circle cx="12" cy="12" r="2"/>
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round"/>
    </svg>
);

const NetworkIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <circle cx="12" cy="5" r="3"/>
        <circle cx="5" cy="19" r="3"/>
        <circle cx="19" cy="19" r="3"/>
        <path d="M12 8v4M8.5 16.5L11 12M15.5 16.5L13 12" strokeLinecap="round"/>
    </svg>
);

const BoltIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const TerminalIcon = () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-8 h-8">
        <rect x="2" y="3" width="20" height="18" rx="3" strokeLinecap="round"/>
        <path d="M6 9l4 3-4 3M12 15h6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

/* ─── Feature Card ─── */
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="group bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.07] hover:border-cheetah-gold/20 transition-all duration-300">
        <div className="text-cheetah-gold mb-4">{icon}</div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);

/* ─── Stat Card ─── */
const StatCard: React.FC<{ value: string; label: string; description: string }> = ({ value, label, description }) => (
    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-6 text-center hover:border-cheetah-gold/20 transition-all duration-300">
        <div className="text-4xl md:text-5xl font-bold text-cheetah-gold mb-2 font-mono">{value}</div>
        <div className="text-white font-semibold mb-2">{label}</div>
        <p className="text-gray-500 text-sm">{description}</p>
    </div>
);

/* ─── Running Cheetah silhouette ─── */
const RunningCheetah = () => (
    <svg viewBox="0 0 200 80" fill="currentColor" className="w-full h-full">
        <path d="M180 45c-3-2-8-3-12-2l-15 3c-2 0-4-1-5-3l-8-12c-2-3-5-5-9-5h-8c-2 0-4 1-5 3l-6 10c-1 2-3 3-5 3l-25-2c-3 0-6 1-8 3l-12 12c-2 2-5 3-8 3H35c-3 0-6-2-7-5l-3-8c-1-3-4-5-7-5H8c-2 0-4 2-4 4v6c0 2 2 4 4 4h8l5 10c2 4 6 6 10 6h15c3 0 6-1 8-3l10-10 30 2c4 0 8-2 10-5l4-6 5 8c2 3 5 5 9 5l20-4c5-1 10 0 14 3l8 6c2 1 4 1 6 0 2-2 2-5 0-7l-15-12z"/>
        <ellipse cx="25" cy="38" rx="8" ry="6"/>
        <path d="M20 30l-3-8c-1-2 1-4 3-3l5 6c1 1 0 3-2 3l-3 2z"/>
        <circle cx="60" cy="42" r="3" opacity="0.3"/>
        <circle cx="75" cy="38" r="2.5" opacity="0.3"/>
        <circle cx="90" cy="44" r="3" opacity="0.3"/>
        <circle cx="105" cy="40" r="2" opacity="0.3"/>
        <circle cx="120" cy="42" r="2.5" opacity="0.3"/>
        <circle cx="140" cy="45" r="2" opacity="0.3"/>
    </svg>
);

/* ─── Main Overlay ─── */
export const OverlaySections = () => {
    return (
        <main className="relative z-10 w-full">

            {/* ══════ HERO ══════ */}
            <section className="h-screen flex flex-col items-start justify-end pb-24 px-8 md:px-16">
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                    className="max-w-2xl"
                >
                    <div className="inline-block px-3 py-1 mb-6 text-xs font-mono text-cheetah-gold/80 border border-cheetah-gold/20 rounded-full bg-cheetah-gold/5 tracking-wider">
                        NEXT-GEN CYBERSECURITY
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl mb-4 leading-[0.95]">
                        Threat Response
                        <span className="block text-cheetah-gold">at Cheetah Speed</span>
                    </h1>
                    <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg">
                        AI-powered security operations that detect, analyze, and neutralize threats
                        faster than attackers can move.
                    </p>
                    <div className="flex gap-4">
                        <a href="#cta" className="px-6 py-3 bg-cheetah-gold text-black font-semibold rounded-lg hover:bg-white transition-colors">
                            Start Free Audit
                        </a>
                        <a href="#solutions" className="px-6 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                            See How It Works
                        </a>
                    </div>
                </motion.div>

                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5 }}
                >
                    <motion.span
                        className="block text-white/30 text-xs tracking-[0.3em] font-mono"
                        animate={{ y: [0, 6, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        SCROLL
                    </motion.span>
                </motion.div>
            </section>

            {/* ══════ SPEED SECTION ══════ */}
            <section className="h-screen flex items-center justify-center p-8 relative overflow-hidden">
                {/* Cheetah SVG — runs once per scroll-in */}
                <motion.div
                    className="absolute w-48 md:w-64 h-24 md:h-32 text-cheetah-gold/50 pointer-events-none"
                    initial={{ opacity: 0, x: "-10%", y: "80vh" }}
                    whileInView={{ opacity: [0, 0.8, 0.8, 0.8, 0], x: "110%", y: "-60vh" }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 3.5, ease: "easeInOut", times: [0, 0.1, 0.5, 0.9, 1] }}
                >
                    <RunningCheetah />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-center relative z-10"
                >
                    <p className="text-sm md:text-base text-cheetah-gold/70 uppercase tracking-[0.3em] mb-3 font-mono">
                        Mean Time to Detect
                    </p>
                    <h2 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cheetah-gold via-white to-cheetah-gold mb-4 tracking-tight">
                        &lt;200ms
                    </h2>
                    <p className="text-lg text-gray-400 max-w-md mx-auto leading-relaxed">
                        While legacy systems take hours to flag anomalies, our AI identifies and
                        classifies threats in under 200 milliseconds.
                    </p>
                </motion.div>
            </section>

            {/* ══════ BLACK SECTIONS ══════ */}
            <div className="bg-black cheetah-spots">

                {/* Gradient transition from video area */}
                <div className="h-32 bg-gradient-to-b from-transparent to-black -mt-32 relative z-20 pointer-events-none" />

                {/* ── Solutions Grid ── */}
                <Section id="solutions">
                    <div className="text-center mb-14">
                        <p className="text-cheetah-gold/60 text-xs font-mono tracking-[0.3em] uppercase mb-3">Security Suite</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Protection at Every Layer
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            From endpoint to cloud, CheetahSec covers every attack surface with AI-driven defense.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        <FeatureCard
                            icon={<ShieldIcon />}
                            title="Threat Intelligence"
                            description="Real-time threat feeds correlated with your environment. Know about attacks before they reach your perimeter."
                        />
                        <FeatureCard
                            icon={<LockIcon />}
                            title="Zero-Trust Access"
                            description="Continuous authentication and micro-segmentation. Every request verified, every session monitored."
                        />
                        <FeatureCard
                            icon={<RadarIcon />}
                            title="24/7 SOC Monitoring"
                            description="AI-augmented analysts watching your infrastructure around the clock with automated incident response."
                        />
                        <FeatureCard
                            icon={<NetworkIcon />}
                            title="Network Detection"
                            description="Deep packet inspection and behavioral analysis across your entire network topology in real time."
                        />
                        <FeatureCard
                            icon={<BoltIcon />}
                            title="Automated Response"
                            description="SOAR playbooks execute in milliseconds — isolate hosts, block IPs, and contain breaches instantly."
                        />
                        <FeatureCard
                            icon={<TerminalIcon />}
                            title="Pen Testing as a Service"
                            description="Continuous red-team simulations against your infrastructure with detailed remediation guidance."
                        />
                    </div>
                </Section>

                {/* ── Metrics ── */}
                <Section id="metrics">
                    <div className="text-center mb-14">
                        <p className="text-cheetah-gold/60 text-xs font-mono tracking-[0.3em] uppercase mb-3">By The Numbers</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Security That Scales
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Battle-tested across Fortune 500 environments
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        <StatCard
                            value="99.97%"
                            label="Threat Detection Rate"
                            description="AI models trained on billions of threat indicators with near-zero false negatives"
                        />
                        <StatCard
                            value="<200ms"
                            label="Mean Time to Detect"
                            description="From first packet anomaly to classified alert in under 200 milliseconds"
                        />
                        <StatCard
                            value="4.2B+"
                            label="Events Analyzed Daily"
                            description="Processing security telemetry at scale across all customer environments"
                        />
                        <StatCard
                            value="0"
                            label="Breaches on Our Watch"
                            description="Zero successful breaches across all managed detection customers"
                        />
                    </div>
                </Section>

                {/* ── Pricing ── */}
                <Section id="pricing">
                    <div className="text-center mb-14">
                        <p className="text-cheetah-gold/60 text-xs font-mono tracking-[0.3em] uppercase mb-3">Plans</p>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Security for Every Stage
                        </h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">
                            Start with a free security audit. Scale to full managed detection.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
                        {/* Starter */}
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 flex flex-col">
                            <div className="text-base font-semibold text-gray-400 mb-1">Recon</div>
                            <div className="text-4xl font-bold text-white mb-1">Free</div>
                            <p className="text-gray-500 text-sm mb-6">For teams getting started</p>
                            <ul className="space-y-3 mb-8 text-gray-300 text-sm flex-1">
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> Vulnerability scanning</li>
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> 1 environment</li>
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> Weekly threat reports</li>
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> Community support</li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold">
                                Start Free
                            </button>
                        </div>
                        {/* Pro */}
                        <div className="bg-cheetah-gold/[0.06] border-2 border-cheetah-gold/40 rounded-2xl p-8 relative flex flex-col">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cheetah-gold text-black text-xs font-bold px-4 py-1 rounded-full tracking-wider">
                                RECOMMENDED
                            </div>
                            <div className="text-base font-semibold text-cheetah-gold mb-1">Hunter</div>
                            <div className="text-4xl font-bold text-white mb-1">$499<span className="text-base text-gray-500 font-normal">/mo</span></div>
                            <p className="text-gray-500 text-sm mb-6">Active threat hunting</p>
                            <ul className="space-y-3 mb-8 text-gray-300 text-sm flex-1">
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> Real-time threat detection</li>
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> Up to 10 environments</li>
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> Automated incident response</li>
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> SIEM integration</li>
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> 24/7 priority support</li>
                            </ul>
                            <button className="w-full py-3 bg-cheetah-gold text-black font-semibold rounded-lg hover:bg-white transition-colors text-sm">
                                Start 14-Day Trial
                            </button>
                        </div>
                        {/* Enterprise */}
                        <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-8 flex flex-col">
                            <div className="text-base font-semibold text-gray-400 mb-1">Apex Predator</div>
                            <div className="text-4xl font-bold text-white mb-1">Custom</div>
                            <p className="text-gray-500 text-sm mb-6">Full managed SOC</p>
                            <ul className="space-y-3 mb-8 text-gray-300 text-sm flex-1">
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> Managed detection &amp; response</li>
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> Unlimited environments</li>
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> Dedicated security team</li>
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> Custom SOAR playbooks</li>
                                <li className="flex gap-2"><span className="text-cheetah-gold">&#10003;</span> Compliance reporting</li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 text-white rounded-lg hover:bg-white/10 transition-colors text-sm font-semibold">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </Section>

                {/* ── CTA ── */}
                <section id="cta" className="min-h-[60vh] flex items-center justify-center px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.7 }}
                        className="text-center max-w-2xl"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                            Don&apos;t Wait for the Breach
                        </h2>
                        <p className="text-gray-400 mb-10 text-lg">
                            Every second without protection is a second attackers are using to probe your defenses.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-cheetah-gold text-black font-bold uppercase tracking-wider rounded-lg hover:bg-white transition-colors text-sm">
                                Start Free Security Audit
                            </button>
                            <button className="px-8 py-4 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors text-sm">
                                Schedule Demo
                            </button>
                        </div>
                        <p className="text-gray-600 text-xs mt-8 tracking-wide">
                            No credit card required &middot; SOC 2 Type II certified &middot; Cancel anytime
                        </p>
                    </motion.div>
                </section>

                {/* ── Footer ── */}
                <footer className="border-t border-white/[0.06] py-12 px-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Platform</h4>
                            <ul className="space-y-2 text-gray-500 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Threat Detection</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Incident Response</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pen Testing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API Docs</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Company</h4>
                            <ul className="space-y-2 text-gray-500 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Resources</h4>
                            <ul className="space-y-2 text-gray-500 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Threat Intel Feed</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Knowledge Base</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Trust Center</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4 text-sm">Legal</h4>
                            <ul className="space-y-2 text-gray-500 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Security Policy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Compliance</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/[0.06] flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-600 text-sm">
                            &copy; 2026 CheetahSec. All rights reserved.
                        </div>
                        <div className="flex gap-6 text-gray-500 text-sm">
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-white transition-colors">GitHub</a>
                            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </footer>

            </div>
        </main>
    );
};
