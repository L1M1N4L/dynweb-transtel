import React from 'react';
import AboutHero from '../components/about/AboutHero';
import Timeline from '../components/about/Timeline';
import SEO from '../components/common/SEO';

export default function AboutPage() {
    return (
        <div className="pt-0">
            <SEO
                title="About Us"
                description="Learn about Transtel Communications' history, mission, and dedication to enterprise communication excellence."
            />
            <AboutHero />
            <Timeline />
        </div>
    );
}
