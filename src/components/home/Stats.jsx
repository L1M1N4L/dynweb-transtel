import React, { useEffect, useRef, useState } from 'react';

function useCountUp(target, duration = 1800, start = false) {
    const [value, setValue] = useState(0);
    useEffect(() => {
        if (!start) return;
        let startTime = null;
        const num = typeof target === 'string' ? parseInt(target.replace(/\D/g, ''), 10) : target;
        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setValue(Math.floor(ease * num));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [start, target, duration]);
    return value;
}

const STATS = [
    { value: 25, suffix: '+', label: 'Years of Experience' },
    { value: 130, suffix: 'K+', label: 'Telephones Installed' },
    { value: 1000, suffix: '+', label: 'PABX Deployed' },
    { value: 3000, suffix: '+', label: 'Nurse Call Beds' },
];

function StatItem({ stat, inView, index }) {
    const raw = useCountUp(stat.value, 1400 + index * 100, inView);
    const display = raw.toLocaleString();
    return (
        <div className="text-center">
            <div className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-1" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {display}{stat.suffix}
            </div>
            <div className="text-sm text-[#86868b] font-medium">{stat.label}</div>
        </div>
    );
}

export default function Stats() {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); observer.disconnect(); } },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section ref={ref} className="py-20 px-6 border-t border-[#e5e5e5]">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-6">
                    {STATS.map((stat, i) => (
                        <StatItem key={i} stat={stat} inView={inView} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
