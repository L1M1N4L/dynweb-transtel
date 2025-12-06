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
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Driving Connectivity Forward</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We build the infrastructure that keeps the world talking, ensuring you never miss a moment that matters.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {values.map((item, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-gray-100 flex flex-col items-center text-center group">
                            <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-black transition-colors">{item.title}</h3>
                            <p className="text-gray-600 leading-relaxed group-hover:text-gray-800 transition-colors">
                                {item.content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
