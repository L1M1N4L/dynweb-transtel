import React from 'react';

export default function CompanyOverview() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-5xl mx-auto px-6">

                {/* Label */}
                <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-4">Who We Are</p>

                {/* Statement */}
                <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] leading-tight mb-16 max-w-3xl">
                    Reliable. Scalable.{' '}
                    <span className="text-[#86868b]">Future-Ready.</span>
                </h2>

                {/* Divider */}
                <div className="w-full h-px bg-[#e5e5e5] mb-16" />

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                    <div>
                        <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2 tracking-tight">International Excellence</h3>
                        <p className="text-base text-[#86868b] leading-relaxed">
                            Transtel is a global communication systems brand specializing in reliable, scalable, and future-ready solutions. Our products serve commercial, institutional, and medical facilities worldwide.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2 tracking-tight">25+ Years of Expertise</h3>
                        <p className="text-base text-[#86868b] leading-relaxed">
                            Founded in 1997, we have spent over two decades delivering professional consulting, system design, and after-sales support to enterprise clients across the globe.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2 tracking-tight">Advanced Healthcare</h3>
                        <p className="text-base text-[#86868b] leading-relaxed">
                            Our Nurse Call Systems enhance patient safety and streamline clinical workflows, seamlessly integrating with existing healthcare infrastructure.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-[#1d1d1f] mb-2 tracking-tight">Driven by Innovation</h3>
                        <p className="text-base text-[#86868b] leading-relaxed">
                            Transtel continuously evolves to deliver integrated communication solutions that create lasting value for every client.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
