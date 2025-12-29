import React from 'react';

export default function CompanyOverview() {
    return (
        <section className="py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">

                {/* Hero / Main Statement */}
                <div className="mb-32 max-w-4xl">
                    <h2 className="text-sm font-semibold text-blue-600 uppercase tracking-widest mb-6">
                        Who We Are
                    </h2>
                    <p className="text-5xl md:text-7xl font-bold tracking-tight text-[#1d1d1f] leading-[1.05]">
                        Reliable. Scalable. <br />
                        <span className="text-[#86868b]">Future-Ready.</span>
                    </p>
                </div>

                {/* Pure Typography Layout - Apple Style */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-20 lg:gap-x-12">

                    {/* Column 1 */}
                    <div className="lg:col-span-6">
                        <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-4">
                            International Excellence
                        </h3>
                        <p className="text-xl font-medium text-[#86868b] leading-relaxed max-w-lg">
                            Transtel is an international communication systems brand specializing in reliable, scalable, and future-ready solutions. Our products are designed to meet the operational demands of commercial, institutional, and medical facilities worldwide.
                        </p>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block lg:col-span-1"></div>

                    {/* Column 2 */}
                    <div className="lg:col-span-5">
                        <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-4">
                            Indonesia Since 1997
                        </h3>
                        <p className="text-xl font-medium text-[#86868b] leading-relaxed max-w-lg">
                            Represented by <strong className="text-[#1d1d1f]">PT Transindo Infotek</strong>, we have delivered professional consulting, system design, and after-sales support to the national market for decades.
                        </p>
                    </div>

                    {/* Column 3 */}
                    <div className="lg:col-span-6">
                        <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-4">
                            Advanced Healthcare
                        </h3>
                        <p className="text-xl font-medium text-[#86868b] leading-relaxed max-w-lg">
                            Expanding in 2021, our advanced Nurse Call Systems enhance patient safety and streamline clinical workflows, ensuring seamless integration with existing healthcare infrastructure.
                        </p>
                    </div>

                    {/* Spacer */}
                    <div className="hidden lg:block lg:col-span-1"></div>

                    {/* Column 4 */}
                    <div className="lg:col-span-5">
                        <h3 className="text-3xl font-semibold text-[#1d1d1f] mb-4">
                            Driven by Innovation
                        </h3>
                        <p className="text-xl font-medium text-[#86868b] leading-relaxed max-w-lg">
                            With strong local expertise and international standards, Transtel remains committed to delivering dependable, integrated communication solutions that create lasting value.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
