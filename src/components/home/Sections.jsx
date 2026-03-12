import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

/* ── count-up hook ── */
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

/* ── products section ── */
function ProductCards() {
    return (
        <section className="bg-[#f5f5f7]">
            <div className="max-w-6xl mx-auto px-6 py-20">
                <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-3">Products</p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-12">
                    Everything you need.<br />
                    <span className="text-[#86868b]">All in one ecosystem.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <Card
                        title="PABX Systems"
                        sub="Hybrid & Full IP"
                        desc="From compact offices to large-scale hospitality and healthcare. IPX-50, IPX-100, IPX-800, VP-500, VP-3000."
                        link="/product/PABX"
                    />
                    <Card
                        title="Nurse Call"
                        sub="Patient Safety"
                        desc="Smart nurse call infrastructure with call logging, door access history, and seamless clinical integration."
                        link="/product/Nurse Call"
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <Card
                        title="Voice Gateway"
                        sub="FXO & FXS — 2 to 48 ports"
                        desc="Portable VoIP adapters and scalable multi-port gateways for enterprise and hospitality."
                        link="/product/Voice Gateway"
                        small
                    />
                    <Card
                        title="GPON"
                        sub="Fiber infrastructure"
                        desc="OLT, ONU, and ONT solutions for modern fiber-to-the-room deployments."
                        link="/product/GPON"
                        small
                    />
                    <Card
                        title="IP Telephone"
                        sub="Analog & IP"
                        desc="Full range of desk phones, lobby phones, and bathroom phones designed for every room type."
                        link="/product/Telephone"
                        small
                    />
                </div>
            </div>
        </section>
    );
}

function Card({ title, sub, desc, link, small }) {
    return (
        <Link to={link} className="block group">
            <div className={`bg-white rounded-2xl ${small ? 'p-8' : 'p-10'} h-full transition-shadow duration-200 hover:shadow-md`}>
                <p className="text-xs font-semibold text-[#86868b] uppercase tracking-wide mb-2">{sub}</p>
                <h3 className={`${small ? 'text-xl' : 'text-2xl md:text-3xl'} font-semibold tracking-tight text-[#1d1d1f] mb-3`}>{title}</h3>
                <p className="text-sm text-[#86868b] leading-relaxed mb-4">{desc}</p>
                <span className="text-[#0066cc] text-sm font-medium group-hover:underline">Learn more ›</span>
            </div>
        </Link>
    );
}

/* ── why transtel ── */
function WhyTranstel() {
    return (
        <section className="bg-white">
            <div className="max-w-5xl mx-auto px-6 py-20">
                <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-3">Why Transtel</p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-14">
                    Built to last.<br />
                    <span className="text-[#86868b]">Designed to scale.</span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div>
                        <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">25+ Years Proven</h3>
                        <p className="text-sm text-[#86868b] leading-relaxed">
                            Since 1997 we've installed over 130,000 telephones and 1,000+ PABX systems across the Asia-Pacific region.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">End-to-End Support</h3>
                        <p className="text-sm text-[#86868b] leading-relaxed">
                            From system design and consulting to installation and after-sales — a single partner for the entire lifecycle.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">Scalable Architecture</h3>
                        <p className="text-sm text-[#86868b] leading-relaxed">
                            Our hybrid and IP platforms grow with you — from a 4-line SOHO setup to 3,000+ extension enterprise deployments.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ── stats strip ── */
const STATS = [
    { value: 25, suffix: '+', label: 'Years' },
    { value: 130, suffix: 'K+', label: 'Telephones' },
    { value: 1000, suffix: '+', label: 'PABX' },
    { value: 3000, suffix: '+', label: 'Nurse Call Beds' },
];

function StatItem({ stat, inView, i }) {
    const raw = useCountUp(stat.value, 1400 + i * 80, inView);
    return (
        <div className="text-center">
            <div className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f]" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {raw.toLocaleString()}{stat.suffix}
            </div>
            <div className="text-xs text-[#86868b] font-medium mt-1">{stat.label}</div>
        </div>
    );
}

function StatsStrip() {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } }, { threshold: 0.3 });
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, []);

    return (
        <div ref={ref} className="border-t border-b border-[#e5e5e5] bg-white">
            <div className="max-w-5xl mx-auto px-6 py-14 grid grid-cols-2 md:grid-cols-4 gap-8">
                {STATS.map((s, i) => <StatItem key={i} stat={s} inView={inView} i={i} />)}
            </div>
        </div>
    );
}

/* ── industries ── */
function Industries() {
    const items = [
        { name: 'Hotels & Hospitality', desc: 'Full room communication, PMS integration, and guest services.' },
        { name: 'Hospitals & Clinics', desc: 'Nurse call, emergency alerts, and clinical workflow management.' },
        { name: 'Corporate Offices', desc: 'Scalable PABX, voicemail, and conference bridge solutions.' },
        { name: 'Government & Public', desc: 'Secure, reliable systems for ministries, embassies, and institutions.' },
    ];
    return (
        <section className="bg-[#f5f5f7]">
            <div className="max-w-5xl mx-auto px-6 py-20">
                <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-3">Industries</p>
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-12">
                    Trusted across sectors.
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-8">
                    {items.map((it) => (
                        <div key={it.name} className="border-b border-[#d2d2d7] pb-6">
                            <h3 className="text-base font-semibold text-[#1d1d1f] mb-1">{it.name}</h3>
                            <p className="text-sm text-[#86868b] leading-relaxed">{it.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── CTA ── */
function BottomCTA() {
    return (
        <section className="bg-white">
            <div className="max-w-3xl mx-auto px-6 py-20 text-center">
                <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
                    Ready to upgrade your communication?
                </h2>
                <p className="text-base text-[#86868b] mb-8 max-w-md mx-auto">
                    Talk to our team about the right solution for your business or facility.
                </p>
                <Link
                    to="/contact"
                    className="inline-block px-7 py-3 rounded-full text-sm font-semibold text-white bg-[#1d1d1f] hover:bg-[#333] transition-colors"
                >
                    Get in touch
                </Link>
            </div>
        </section>
    );
}

/* ── exports ── */
export { ProductCards, WhyTranstel, StatsStrip, Industries, BottomCTA };
