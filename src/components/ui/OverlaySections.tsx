'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Section: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <section className={`min-h-screen flex items-center justify-center p-8 ${className}`}>
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ amount: 0.5, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full max-w-6xl"
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

// Feature card component for the features grid
const FeatureCard: React.FC<{ icon: string; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors">
        <div className="text-3xl mb-4">{icon}</div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
);

// Stat card component for the metrics section
const StatCard: React.FC<{ value: string; label: string; description: string }> = ({ value, label, description }) => (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 text-center">
        <div className="text-4xl md:text-5xl font-bold text-cheetah-gold mb-2">{value}</div>
        <div className="text-white font-semibold mb-2">{label}</div>
        <p className="text-gray-400 text-sm">{description}</p>
    </div>
);

export const OverlaySections = () => {
    return (
        <main className="relative z-10 w-full">

            {/* Hero - First viewport, text positioned at bottom-left to not overlap cheetah */}
            <section className="h-screen flex flex-col items-start justify-end pb-20 px-8 md:px-16">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1.5 }}
                    className="max-w-2xl"
                >
                    <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white drop-shadow-2xl mb-4">
                        Cheetah
                        <span className="block text-cheetah-gold">Computing</span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6">
                        Lightning-fast infrastructure for the modern enterprise.
                        Built for speed, designed for scale.
                    </p>
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-cheetah-gold text-black font-semibold rounded-lg hover:bg-white transition-colors">
                            Get Started
                        </button>
                        <button className="px-6 py-3 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                            Learn More
                        </button>
                    </div>
                </motion.div>
                <motion.div
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <span className="text-white/50 text-xs tracking-widest font-mono">SCROLL TO EXPLORE</span>
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

            {/* Black background sections start here */}
            <div className="bg-black">

                {/* Why Choose Cheetah - Features Grid (NOW FIRST) */}
                <Section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Why Choose Cheetah
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Enterprise-grade solutions built for developers
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        <FeatureCard
                            icon="⚡"
                            title="Instant Deployment"
                            description="Deploy your applications in seconds with our streamlined CI/CD pipeline integration and one-click deployment options."
                        />
                        <FeatureCard
                            icon="🔒"
                            title="Enterprise Security"
                            description="SOC 2 Type II certified with end-to-end encryption, DDoS protection, and comprehensive audit logging."
                        />
                        <FeatureCard
                            icon="📊"
                            title="Real-time Analytics"
                            description="Monitor performance, track usage, and gain insights with our comprehensive observability platform."
                        />
                        <FeatureCard
                            icon="🌐"
                            title="Global CDN"
                            description="Content delivery optimized across 200+ edge locations for sub-millisecond response times."
                        />
                        <FeatureCard
                            icon="🔄"
                            title="Auto-scaling"
                            description="Automatically scale resources based on demand. Pay only for what you use with granular billing."
                        />
                        <FeatureCard
                            icon="🛠️"
                            title="Developer Tools"
                            description="REST APIs, SDKs for all major languages, CLI tools, and comprehensive documentation."
                        />
                    </div>
                </Section>

                {/* Performance Metrics (NOW SECOND) */}
                <Section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Performance Metrics
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Real-time data from our global infrastructure network
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard
                            value="99.99%"
                            label="Uptime SLA"
                            description="Industry-leading reliability with redundant systems across all regions"
                        />
                        <StatCard
                            value="<10ms"
                            label="Global Latency"
                            description="Edge computing nodes in 50+ locations worldwide"
                        />
                        <StatCard
                            value="10 TB/s"
                            label="Bandwidth"
                            description="Massive throughput capacity for your most demanding workloads"
                        />
                        <StatCard
                            value="2M+"
                            label="API Requests/sec"
                            description="Handle any scale with our auto-scaling infrastructure"
                        />
                    </div>
                </Section>

                {/* Pricing Section */}
                <Section>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Simple, Transparent Pricing
                        </h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">
                            Start free, scale as you grow
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <div className="text-lg font-semibold text-gray-400 mb-2">Starter</div>
                            <div className="text-4xl font-bold text-white mb-4">$0<span className="text-lg text-gray-400">/mo</span></div>
                            <ul className="space-y-3 mb-8 text-gray-300">
                                <li>✓ 100GB bandwidth</li>
                                <li>✓ 1M API requests</li>
                                <li>✓ Community support</li>
                                <li>✓ Basic analytics</li>
                            </ul>
                            <button className="w-full py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors">
                                Get Started
                            </button>
                        </div>
                        <div className="bg-cheetah-gold/10 backdrop-blur-sm border-2 border-cheetah-gold rounded-2xl p-8 relative">
                            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-cheetah-gold text-black text-xs font-bold px-3 py-1 rounded-full">
                                POPULAR
                            </div>
                            <div className="text-lg font-semibold text-cheetah-gold mb-2">Pro</div>
                            <div className="text-4xl font-bold text-white mb-4">$99<span className="text-lg text-gray-400">/mo</span></div>
                            <ul className="space-y-3 mb-8 text-gray-300">
                                <li>✓ 1TB bandwidth</li>
                                <li>✓ 10M API requests</li>
                                <li>✓ Priority support</li>
                                <li>✓ Advanced analytics</li>
                                <li>✓ Custom domains</li>
                            </ul>
                            <button className="w-full py-3 bg-cheetah-gold text-black font-semibold rounded-lg hover:bg-white transition-colors">
                                Start Free Trial
                            </button>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                            <div className="text-lg font-semibold text-gray-400 mb-2">Enterprise</div>
                            <div className="text-4xl font-bold text-white mb-4">Custom</div>
                            <ul className="space-y-3 mb-8 text-gray-300">
                                <li>✓ Unlimited bandwidth</li>
                                <li>✓ Unlimited requests</li>
                                <li>✓ Dedicated support</li>
                                <li>✓ SLA guarantee</li>
                                <li>✓ Custom integrations</li>
                            </ul>
                            <button className="w-full py-3 border border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors">
                                Contact Sales
                            </button>
                        </div>
                    </div>
                </Section>

                {/* CTA Footer */}
                <section className="min-h-[50vh] flex items-center justify-center px-8">
                    <div className="text-center max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Move Fast?
                        </h2>
                        <p className="text-gray-400 mb-8">
                            Join thousands of companies using Cheetah Computing to power their applications.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button className="px-8 py-4 bg-cheetah-gold text-black font-bold uppercase tracking-wider rounded-lg hover:bg-white transition-colors">
                                Start Free Trial
                            </button>
                            <button className="px-8 py-4 border border-white/30 text-white font-semibold rounded-lg hover:bg-white/10 transition-colors">
                                Schedule Demo
                            </button>
                        </div>
                        <p className="text-gray-500 text-sm mt-8">
                            No credit card required • Free tier available • Cancel anytime
                        </p>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/10 py-12 px-8">
                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div>
                            <h4 className="text-white font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Resources</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Community</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400 text-sm">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Licenses</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-gray-400 text-sm">
                            © 2026 Cheetah Computing. All rights reserved.
                        </div>
                        <div className="flex gap-6 text-gray-400">
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
