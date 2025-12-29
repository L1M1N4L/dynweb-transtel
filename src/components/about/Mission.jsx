import React from 'react';

export default function Mission() {
    const values = [
        {
            title: "Our Mission",
            content: "To empower businesses with reliable, cutting-edge telecommunication solutions that foster seamless global connectivity."
        },
        {
            title: "Our Vision",
            content: "To be the world’s most trusted partner in communication technology, bridging distances through innovation and excellence."
        },
        {
            title: "Core Values",
            content: "Integrity, Innovation, and Customer-Centricity drive every decision we make and every product we build."
        }
    ];

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1d1d1f] tracking-tight mb-6">Driving Connectivity Forward</h2>
                    <p className="text-xl font-medium text-[#86868b] max-w-3xl mx-auto leading-relaxed">
                        We build the infrastructure that keeps the world talking, ensuring you never miss a moment that matters.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {values.map((item, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <h3 className="text-2xl font-semibold text-[#1d1d1f] mb-4 tracking-tight">{item.title}</h3>
                            <p className="text-[#86868b] text-lg leading-relaxed font-medium">
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
