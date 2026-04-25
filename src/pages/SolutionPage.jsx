import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { solutionData } from '../data/solutionData';
import SEO from '../components/common/SEO';

export default function SolutionPage() {
    const industries = Object.values(solutionData);

    // Scroll to top on load
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-[#f5f5f7] min-h-screen pt-32 pb-20">
            <SEO
                title="Industry Solutions"
                description="Transtel Communications delivers purpose-built communication architectures for healthcare, hospitality, corporate offices, government, and education. Explore our industry solutions."
                url="/solution"
                keywords="PABX solutions, hospital nurse call system, hotel PABX, government telephony, school campus communication, enterprise voice infrastructure"
            />

            {/* Clean Typography Hero */}
            <section className="text-center px-6 mb-24">
                <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-4">Industries</p>
                <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-[#1d1d1f] mb-6">
                    Infrastructure for <br />
                    <span className="text-[#86868b]">every environment.</span>
                </h1>
                <p className="text-xl text-[#86868b] max-w-2xl mx-auto leading-relaxed">
                    Explore the technical architectures powering the world's most demanding communication deployments.
                </p>
            </section>

            {/* Edge-to-Edge Editorial Layout */}
            <div className="flex flex-col w-full bg-white">
                {industries.map((solution, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <div key={solution.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} w-full min-h-[70vh]`}>

                            {/* Full-Bleed Image Half */}
                            <div className="lg:w-1/2 relative min-h-[400px]">
                                <img
                                    src={solution.heroImage}
                                    alt={solution.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>

                            {/* Deep Typography Half */}
                            <div className="lg:w-1/2 flex items-center justify-center p-12 lg:p-24 bg-white border-b lg:border-b-0 border-[#e5e5e5]">
                                <div className="max-w-xl">
                                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
                                        {solution.title}
                                    </h2>
                                    <p className="text-lg font-medium text-[#0066cc] mb-8">
                                        {solution.subtitle}
                                    </p>

                                    <h3 className="text-xs font-bold text-[#1d1d1f] uppercase tracking-wider mb-4">Architectural Overview</h3>
                                    <p className="text-base text-[#86868b] leading-relaxed mb-10">
                                        {solution.overview}
                                    </p>

                                    <Link
                                        to={`/solution/${solution.id}`}
                                        className="inline-flex items-center space-x-2 text-[#fff] bg-[#1d1d1f] px-6 py-3 rounded-full font-medium hover:bg-[#333] transition-colors"
                                    >
                                        <span>Explore Architecture</span>
                                        <span>›</span>
                                    </Link>
                                </div>
                            </div>

                        </div>
                    );
                })}
            </div>

            {/* Typography-Driven Bottom CTA */}
            <section className="bg-white py-32 text-center border-t border-[#e5e5e5]">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-4">
                        Need a custom topology?
                    </h2>
                    <p className="text-base text-[#86868b] mb-10 max-w-md mx-auto">
                        Speak directly with our networking and voice engineers to map out your exact requirements.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block px-8 py-3 rounded-full text-base font-semibold text-[#1d1d1f] border border-[#1d1d1f] hover:bg-[#1d1d1f] hover:text-white transition-colors"
                    >
                        Contact Engineering
                    </Link>
                </div>
            </section>
        </div>
    );
}
