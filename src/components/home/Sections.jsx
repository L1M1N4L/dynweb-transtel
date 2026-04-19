import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import { ProductService } from '../../services/productService';

/* ── client logos ── */
import penHotels from '../../assets/clients/1.Pen-Hotels-(Black)_bkg removed.png';
import choiceHotels from '../../assets/clients/2560px-Choice_Hotels_Intl_Logo.svg.png';
import accorHotels from '../../assets/clients/AccorHotels_Logo_2016.svg.png';
import goldenTulip from '../../assets/clients/Golden-Tulip-Logo-old.png';
import emc from '../../assets/clients/Logo-emc.webp';
import novotel from '../../assets/clients/Novotel-Logo.png';
import aerowisata from '../../assets/clients/aerowisata_logistics.png';
import astonInn from '../../assets/clients/aston-inn.png';

/* ═══════════════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════════════ */

/* Scroll-triggered reveal — returns ref + whether element has entered viewport */
function useReveal(threshold = 0.15) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(([e]) => {
            if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
        }, { threshold });
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return [ref, visible];
}

/* Count-up animation */
function useCountUp(target, duration = 1400, start = false) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        let t0 = null;
        const step = (ts) => {
            if (!t0) t0 = ts;
            const p = Math.min((ts - t0) / duration, 1);
            setValue(Math.floor((1 - Math.pow(1 - p, 3)) * target));
            if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return value;
}

/* ═══════════════════════════════════════════════════════════
   CSS helper for reveal animations
   ═══════════════════════════════════════════════════════════ */

const reveal = (visible, delay = 0) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(40px)',
    transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
});

/* ═══════════════════════════════════════════════════════════
   1. PRODUCT TILES
   ═══════════════════════════════════════════════════════════ */

const CATEGORIES = [
    { id: '1', title: 'PABX Systems', sub: 'Hybrid & Full IP telephony', tagline: 'Enterprise-grade switching from 4 to 3,000+ extensions.', link: '/product', categoryName: 'PABX', dark: true },
    { id: '2', title: 'Nurse Call', sub: 'Intelligent patient safety', tagline: 'IP-based nurse call with real-time logging and clinical integration.', link: '/product', categoryName: 'Nurse Call', dark: false },
    { id: '3', title: 'Voice Gateway', sub: 'FXO & FXS — 2 to 48 ports', tagline: 'SIP trunking and legacy PSTN bridging.', link: '/product', categoryName: 'Voice Gateway', dark: true },
    { id: '4', title: 'GPON', sub: 'Fiber infrastructure', tagline: 'Gigabit passive optical for FTTR deployments.', link: '/product', categoryName: 'GPON', dark: false },
    { id: '5', title: 'IP Telephone', sub: 'SIP & analog endpoints', tagline: 'HD voice endpoints for every room type.', link: '/product', categoryName: 'Telephone', dark: true }
];

function ProductCards() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        ProductService.getAllProducts()
            .then(data => setProducts(data))
            .catch(err => console.error("Failed to load products for homepage", err));
    }, []);

    const getImageForCategory = (catName) => {
        const prod = products.find(p => p.category === catName && (p.images?.length > 0 || p.image));
        return prod ? (prod.images?.[0] || prod.image) : null;
    };

    return (
        <section className="bg-[#f5f5f7]">
            <div className="max-w-[1680px] mx-auto px-4 sm:px-6 pt-16 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    {CATEGORIES.slice(0, 2).map((cat) => (
                        <Tile key={cat.id} {...cat} image={getImageForCategory(cat.categoryName)} large />
                    ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {CATEGORIES.slice(2, 5).map((cat) => (
                        <Tile key={cat.id} {...cat} image={getImageForCategory(cat.categoryName)} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function Tile({ title, sub, tagline, link, image, dark, large }) {
    const bg = dark ? 'bg-[#1d1d1f]' : 'bg-white';
    const textColor = dark ? 'text-white' : 'text-[#1d1d1f]';
    const subColor = dark ? 'text-[#a1a1a6]' : 'text-[#86868b]';
    const linkColor = dark ? 'text-[#2997ff]' : 'text-[#0066cc]';

    return (
        <Link to={link || "/product"} className="block group">
            <div className={`${bg} rounded-3xl overflow-hidden flex flex-col items-center text-center ${large ? 'min-h-[580px] md:min-h-[680px]' : 'min-h-[480px] md:min-h-[580px]'}`}>
                <div className={`pt-12 pb-2 px-8 ${large ? 'pt-14 md:pt-16' : ''}`}>
                    <p className={`text-xs font-medium ${subColor} mb-2 tracking-wide`}>{sub}</p>
                    <h3 className={`${large ? 'text-4xl md:text-[56px] leading-none' : 'text-3xl md:text-[40px] leading-none'} font-semibold tracking-tight ${textColor} mb-3`}>{title}</h3>
                    <p className={`text-base md:text-lg ${subColor} max-w-md mx-auto mb-4 leading-snug`}>{tagline}</p>
                    <span className={`${linkColor} text-lg font-normal group-hover:underline`}>Learn more ›</span>
                </div>
                <div className="flex-1 w-full flex items-end justify-center px-6 pb-0 mt-4">
                    {image ? (
                        <img src={image} alt={title} className={`w-auto object-contain ${large ? 'max-h-[340px] md:max-h-[420px]' : 'max-h-[260px] md:max-h-[340px]'}`} />
                    ) : (
                        <div className={`w-full ${large ? 'h-[340px]' : 'h-[260px]'} rounded-t-2xl ${dark ? 'bg-[#2d2d2f]' : 'bg-[#e8e8ed]'} flex items-center justify-center`}>
                            <span className={`text-5xl font-bold ${dark ? 'text-[#3a3a3c]' : 'text-[#d1d1d6]'}`}>{title.charAt(0)}</span>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}

/* ═══════════════════════════════════════════════════════════
   2. STATS — dramatic dark section with count-up
   ═══════════════════════════════════════════════════════════ */

const STATS = [
    { value: 25, suffix: '+', label: 'Years in Operation' },
    { value: 130, suffix: 'K+', label: 'Endpoints Deployed' },
    { value: 1000, suffix: '+', label: 'PBX Systems Live' },
    { value: 3000, suffix: '+', label: 'Nurse Call Nodes' },
];

function StatItem({ stat, inView, i }) {
    const raw = useCountUp(stat.value, 1400 + i * 80, inView);
    return (
        <div className="text-center" style={reveal(inView, 0.1 + i * 0.1)}>
            <div className="text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-white mb-2" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {raw.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-sm md:text-base text-[#86868b] font-medium">{stat.label}</div>
        </div>
    );
}

function StatsStrip() {
    const [ref, inView] = useReveal(0.2);

    return (
        <section ref={ref} className="bg-[#1d1d1f]">
            <div className="max-w-6xl mx-auto px-6 py-28 md:py-40">
                <div className="text-center mb-20 md:mb-28" style={reveal(inView)}>
                    <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-4">Performance Metrics</p>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
                        The numbers speak<br />for themselves.
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
                    {STATS.map((s, i) => <StatItem key={i} stat={s} inView={inView} i={i} />)}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════
   3. WHY TRANSTEL — interactive feature blocks
   ═══════════════════════════════════════════════════════════ */

const REASONS = [
    {
        num: '01',
        title: 'Mission-Critical Reliability',
        desc: "Battle-tested across 1,000+ deployments since 1997. Our infrastructure runs 24/7 in hospitals, hotels, and government facilities where downtime isn't an option.",
    },
    {
        num: '02',
        title: 'Full-Stack Integration',
        desc: 'From network design and SIP provisioning to installation and post-deployment support — one partner, one SLA, zero finger-pointing.',
    },
    {
        num: '03',
        title: 'Future-Proof Architecture',
        desc: 'Hybrid TDM/IP platforms that scale from a 4-port SOHO to 3,000+ extension campuses. Migrate at your pace — no forklift upgrades.',
    },
];

function WhyTranstel() {
    const [ref, visible] = useReveal(0.1);

    return (
        <section className="bg-white" ref={ref}>
            <div className="max-w-5xl mx-auto px-6 py-28 md:py-40">
                <div className="text-center mb-20 md:mb-28" style={reveal(visible)}>
                    <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-4">Why Transtel</p>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
                        Built to last.<br />
                        <span className="text-[#86868b]">Designed to scale.</span>
                    </h2>
                </div>

                <div className="space-y-0">
                    {REASONS.map((r, i) => (
                        <div
                            key={r.num}
                            className="group flex flex-col md:flex-row gap-6 md:gap-12 py-10 md:py-14 border-b border-[#e5e5e5] cursor-default"
                            style={reveal(visible, 0.15 + i * 0.1)}
                        >
                            <span className="text-sm font-semibold text-[#0066cc] md:pt-1 shrink-0">{r.num}</span>
                            <div className="flex-1">
                                <h3 className="text-xl md:text-2xl font-semibold text-[#1d1d1f] mb-3 group-hover:text-[#0066cc] transition-colors duration-300">{r.title}</h3>
                                <p className="text-base md:text-lg text-[#86868b] leading-relaxed max-w-2xl">{r.desc}</p>
                            </div>
                            <div className="hidden md:flex items-center shrink-0 opacity-0 group-hover:opacity-100 transform translate-x-[-8px] group-hover:translate-x-0 transition-all duration-300">
                                <svg className="w-6 h-6 text-[#0066cc]" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════
   4. INDUSTRIES — interactive hover list
   ═══════════════════════════════════════════════════════════ */

const INDUSTRY_LIST = [
    { name: 'Hotels & Hospitality', desc: 'Full room communication infrastructure — PMS integration, wake-up calls, guest voicemail, and SIP-DECT mobility across properties.', tag: '40+ hotel chains' },
    { name: 'Hospitals & Clinics', desc: 'IP nurse call with real-time event logging, emergency code blue automation, and seamless HIS/EMR clinical integration.', tag: 'ISO 13485 ready' },
    { name: 'Corporate Offices', desc: 'Unified communications with auto-attendant IVR, conference bridging, CTI integration, and remote worker SIP extensions.', tag: 'Up to 3,000 ext' },
    { name: 'Government & Public', desc: 'Secure, air-gapped deployments for ministries, embassies, and defense — with encrypted SIP trunking and redundant failover.', tag: 'Secure by design' },
];

function Industries() {
    const [ref, visible] = useReveal(0.1);
    const [hoveredIdx, setHoveredIdx] = useState(null);

    return (
        <section className="bg-[#f5f5f7]" ref={ref}>
            <div className="max-w-5xl mx-auto px-6 py-28 md:py-40">
                <div className="text-center mb-20 md:mb-28" style={reveal(visible)}>
                    <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-4">Industries</p>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f]">
                        Trusted across sectors.
                    </h2>
                </div>

                <div className="border-t border-[#d2d2d7]">
                    {INDUSTRY_LIST.map((it, i) => (
                        <div
                            key={it.name}
                            className="group border-b border-[#d2d2d7] cursor-default"
                            style={reveal(visible, 0.1 + i * 0.08)}
                            onMouseEnter={() => setHoveredIdx(i)}
                            onMouseLeave={() => setHoveredIdx(null)}
                        >
                            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-8 py-8 md:py-10">
                                <h3 className={`text-xl md:text-3xl font-semibold tracking-tight md:w-[320px] shrink-0 transition-colors duration-300 ${hoveredIdx === i ? 'text-[#1d1d1f]' : hoveredIdx !== null ? 'text-[#c8c8cc]' : 'text-[#1d1d1f]'}`}>
                                    {it.name}
                                </h3>
                                <p className={`text-base text-[#86868b] leading-relaxed flex-1 transition-all duration-300 ${hoveredIdx === i ? 'md:opacity-100 md:translate-x-0' : 'md:opacity-60'}`}>
                                    {it.desc}
                                </p>
                                <span className={`text-xs font-semibold tracking-widest uppercase px-3 py-1.5 rounded-full shrink-0 transition-all duration-300 ${hoveredIdx === i ? 'bg-[#1d1d1f] text-white' : 'bg-[#e8e8ed] text-[#86868b]'}`}>
                                    {it.tag}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════
   5. CLIENTS — dark section with grid
   ═══════════════════════════════════════════════════════════ */

const CLIENT_LOGOS = [
    { src: choiceHotels, alt: 'Choice Hotels' },
    { src: accorHotels, alt: 'AccorHotels' },
    { src: novotel, alt: 'Novotel' },
    { src: penHotels, alt: 'Pen Hotels' },
    { src: goldenTulip, alt: 'Golden Tulip' },
    { src: emc, alt: 'EMC' },
    { src: aerowisata, alt: 'Aerowisata' },
    { src: astonInn, alt: 'Aston Inn' },
];

function Clients() {
    const [ref, visible] = useReveal(0.15);

    return (
        <section className="bg-[#1d1d1f]" ref={ref}>
            <div className="max-w-6xl mx-auto px-6 pt-28 md:pt-40 pb-20 md:pb-28">
                <div className="text-center mb-16 md:mb-24" style={reveal(visible)}>
                    <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-4">Our Clients</p>
                    <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-4">
                        Working with the best.
                    </h2>
                    <p className="text-base md:text-lg text-[#86868b] max-w-md mx-auto">
                        Trusted by leading hospitality and enterprise brands across Asia-Pacific.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 max-w-4xl mx-auto" style={reveal(visible, 0.2)}>
                    {CLIENT_LOGOS.map((logo, i) => (
                        <div
                            key={logo.alt}
                            className="flex items-center justify-center py-10 md:py-14 border-b border-r border-white/[0.07] [&:nth-child(2n)]:border-r-0 sm:[&:nth-child(2n)]:border-r sm:[&:nth-child(4n)]:border-r-0 [&:nth-child(n+7)]:border-b-0 sm:[&:nth-child(n+5)]:border-b-0"
                        >
                            <img
                                src={logo.src}
                                alt={logo.alt}
                                className="h-7 md:h-9 w-auto object-contain brightness-0 invert opacity-30 hover:opacity-80 transition-opacity duration-400 cursor-default"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ═══════════════════════════════════════════════════════════
   6. CTA — strong closer
   ═══════════════════════════════════════════════════════════ */

function BottomCTA() {
    const [ref, visible] = useReveal(0.2);

    return (
        <section className="bg-white" ref={ref}>
            <div className="max-w-3xl mx-auto px-6 py-28 md:py-40 text-center" style={reveal(visible)}>
                <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-4">Get Started</p>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
                    Ready to modernize your<br />communication stack?
                </h2>
                <p className="text-base md:text-lg text-[#86868b] mb-10 max-w-lg mx-auto">
                    Whether you need a 50-extension office PBX or a 3,000-node hospital network — we architect, deploy, and support the entire lifecycle.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/contact"
                        className="inline-block px-8 py-4 rounded-full text-base font-semibold text-white bg-[#0066cc] hover:bg-[#0055b3] transition-colors"
                    >
                        Request a consultation
                    </Link>
                    <Link
                        to="/product"
                        className="inline-block px-8 py-4 rounded-full text-base font-semibold text-[#0066cc] bg-transparent border border-[#0066cc] hover:bg-[#0066cc]/5 transition-colors"
                    >
                        View all products
                    </Link>
                </div>
            </div>
        </section>
    );
}

/* ── exports ── */
export { ProductCards, WhyTranstel, StatsStrip, Industries, Clients, BottomCTA };
