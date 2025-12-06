import React from 'react';
import AboutHero from '../components/about/AboutHero';
import Timeline from '../components/about/Timeline';

export default function AboutPage() {
    return (
        <div className="pt-0">
            <AboutHero />
            <Timeline />
        </div>
    );
}
