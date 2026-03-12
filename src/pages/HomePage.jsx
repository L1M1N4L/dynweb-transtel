import React from 'react';
import Hero from '../components/home/Hero';
import { ProductCards, WhyTranstel, StatsStrip, Industries, BottomCTA } from '../components/home/Sections';
import SEO from '../components/common/SEO';

export default function HomePage() {
    return (
        <>
            <SEO
                title="Enterprise Communication Solutions"
                description="Transtel Communications — PABX, Nurse Call, and Voice solutions for modern enterprises."
            />
            <Hero />
            <ProductCards />
            <StatsStrip />
            <WhyTranstel />
            <Industries />
            <BottomCTA />
        </>
    );
}
