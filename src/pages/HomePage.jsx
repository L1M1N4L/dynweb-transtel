import React from 'react';
import Hero from '../components/home/Hero';
import Stats from '../components/home/Stats';
import Products from '../components/home/Products';
import SEO from '../components/common/SEO';

export default function HomePage() {
    return (
        <>
            <SEO
                title="Enterprise Communication Solutions"
                description="Transtel Communications offers top-tier PABX, Nurse Call Systems, and Voice Logging solutions for modern enterprises."
            />
            <Hero />
            <Stats />
            <Products />
        </>
    );
}
