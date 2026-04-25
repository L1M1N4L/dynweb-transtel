import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { solutionData } from '../data/solutionData';
import { productData } from '../data/productData';
import SEO from '../components/common/SEO';

export default function SolutionDetail() {
    const { industry } = useParams();
    const data = solutionData[industry];

    // Scroll to top on load since this is a deep dive page
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [industry]);

    if (!data) {
        return (
            <div className="pt-40 min-h-screen text-center bg-[#f5f5f7]">
                <h1 className="text-3xl font-semibold tracking-tight text-[#1d1d1f]">Architecture Not Found</h1>
                <Link to="/solution" className="text-[#0066cc] hover:underline mt-4 inline-block font-medium">Return to Solutions</Link>
            </div>
        );
    }

    return (
        <div className="bg-white min-h-screen pb-24">
            <SEO
                title={`${data.title} Solutions`}
                description={data.overview}
                url={`/solution/${data.id}`}
                keywords={`${data.title.toLowerCase()} communication, ${data.title.toLowerCase()} PABX, Transtel ${data.title.toLowerCase()} solution, ${data.subtitle.toLowerCase()}`}
            />

            {/* Immersive Edge-to-Edge Hero Header */}
            <div className="relative w-full h-[70vh] min-h-[500px] bg-black">
                <img
                    src={data.heroImage}
                    alt={data.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 lg:px-24 pb-20">
                    <div className="max-w-4xl">
                        <p className="text-sm md:text-base font-semibold text-white tracking-widest uppercase mb-4 opacity-80">Architecture Deep Dive</p>
                        <h1 className="text-5xl md:text-7xl font-semibold tracking-tight text-white mb-6">
                            {data.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-[#a1a1a6] font-medium max-w-2xl">
                            {data.subtitle}
                        </p>
                    </div>
                </div>
            </div>

            {/* Technical Overview Summary */}
            <section className="bg-white py-32 border-b border-[#e5e5e5]">
                <div className="max-w-5xl mx-auto px-6 text-center">
                    <h2 className="text-xs font-bold tracking-widest text-[#1d1d1f] uppercase mb-8">Executive Overview</h2>
                    <p className="text-2xl md:text-4xl tracking-tight text-[#1d1d1f] leading-snug font-medium">
                        {data.overview}
                    </p>
                </div>
            </section>

            {/* Deep Technical Highlights (Editorial Edge-to-Edge) */}
            <section className="flex flex-col w-full bg-white">
                {data.architecturalHighlights.map((highlight, index) => {
                    const isEven = index % 2 === 0;

                    return (
                        <div key={index} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} w-full min-h-[60vh]`}>

                            {/* Full-Bleed Image Half */}
                            <div className="lg:w-1/2 relative min-h-[400px]">
                                <img
                                    src={highlight.image}
                                    alt={highlight.title}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>

                            {/* Deep Typography Half */}
                            <div className="lg:w-1/2 flex flex-col justify-center p-12 lg:p-24 bg-[#f5f5f7]">
                                <div className="max-w-xl">
                                    <span className="text-sm font-bold text-[#86868b] mb-6 block pb-4 border-b border-[#d2d2d7]">Fig 0{index + 1}</span>
                                    <h3 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#1d1d1f] mb-6 leading-tight">
                                        {highlight.title}
                                    </h3>
                                    <p className="text-lg text-[#86868b] leading-relaxed">
                                        {highlight.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </section>

            {/* Infrastructure Integration (Products) */}
            <section className="bg-white py-32 border-t border-[#e5e5e5]">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-6">
                            Core Infrastructure Deployed
                        </h2>
                        <p className="text-[#86868b] text-xl max-w-3xl mx-auto">
                            The critical Transtel hardware and software platforms that make this architecture possible.
                        </p>
                    </div>

                    {/* Product Links - Clean minimal aesthetic */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {data.recommendedProducts.map(prodKey => {
                            const prodInfo = productData[prodKey];
                            if (!prodInfo) return null;
                            return (
                                <Link to={`/product/${encodeURIComponent(prodKey)}`} key={prodKey} className="group flex flex-col">
                                    <div className="w-full aspect-video bg-[#f5f5f7] mb-8 overflow-hidden relative">
                                        <img src={prodInfo.image} alt={prodInfo.title} className="absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-transform duration-700 group-hover:scale-105" />
                                    </div>
                                    <h3 className="text-2xl font-semibold mb-3 text-[#1d1d1f] group-hover:text-[#0066cc] transition-colors">{prodInfo.title}</h3>
                                    <p className="text-base text-[#86868b] leading-relaxed mb-6">
                                        {prodInfo.description}
                                    </p>
                                    <div className="mt-auto text-[#0066cc] text-sm font-medium uppercase tracking-wider">
                                        View Specs <span className="ml-2 group-hover:translate-x-2 inline-block transition-transform">→</span>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="bg-[#f5f5f7] py-32 text-center px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-6">
                        Consult with an Architect
                    </h2>
                    <p className="text-xl text-[#86868b] mb-12">
                        Speak directly with a Transtel engineer to design a custom topology for your {data.title.toLowerCase()} deployment.
                    </p>
                    <Link
                        to="/contact"
                        className="inline-block px-10 py-4 text-lg font-semibold text-white bg-[#1d1d1f] hover:bg-[#333] transition-colors"
                    >
                        Contact Engineering
                    </Link>
                </div>
            </section>
        </div>
    );
}
