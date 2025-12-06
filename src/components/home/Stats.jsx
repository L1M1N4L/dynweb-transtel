import React, { useState } from 'react';

export default function Stats() {
    const [stats] = useState(() => {
        // 5 - 25 years
        const years = Math.floor(Math.random() * 21) + 5;
        // 100 - 4600 customers
        const customers = (Math.floor(Math.random() * 4500) + 100).toLocaleString();
        // 10 - 209 products
        const productsCount = Math.floor(Math.random() * 200) + 10;
        // 100 - 5100 systems
        const systems = (Math.floor(Math.random() * 5000) + 100).toLocaleString();

        return [
            { value: years, label: 'years in business' },
            { value: customers, label: 'customers' },
            { value: productsCount, label: 'products' },
            { value: systems, label: 'systems installed' }
        ];
    });

    return (
        <section id="about" className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-wrap items-center justify-center gap-12 lg:gap-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-5xl font-semibold mb-1 text-gray-900">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-600">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
