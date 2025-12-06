import React from 'react';

export default function Timeline() {
    const milestones = [
        { year: '2005', title: 'Founded', description: 'Transtel established.' },
        { year: '2010', title: 'Expansion', description: 'Nationwide coverage.' },
        { year: '2015', title: 'Innovation', description: 'VoIP solutions.' },
        { year: '2020', title: 'Global', description: 'International clients.' },
        { year: '2024', title: 'Future', description: 'Leading tech.' },
    ];

    return (
        <section className="py-20 px-6 bg-white min-h-[50vh] flex items-center justify-center">
            <div className="max-w-[1400px] w-full">
                <div className="text-center mb-20">
                    <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">Our Journey</h1>
                    <p className="text-gray-500">Key milestones</p>
                </div>

                {/* DESKTOP LAYOUT (Horizontal) - Hidden on mobile/tablet */}
                <div className="hidden lg:flex relative flex-wrap justify-center items-start gap-10">
                    {/* Connecting Line */}
                    <div className="absolute top-[7px] left-0 right-0 h-[2px] bg-[#e0e0e0] z-0"></div>

                    {milestones.map((item, index) => (
                        <div
                            key={index}
                            className="flex-shrink-0 w-[220px] text-center relative opacity-0 animate-fade-in group"
                            style={{ animationDelay: `${(index + 1) * 0.1}s`, animationFillMode: 'forwards' }}
                        >
                            <div className="mb-5 flex justify-center">
                                {/* Dot */}
                                <div className="w-4 h-4 bg-black rounded-full relative z-10 transition-all duration-300 shadow-[0_0_0_8px_#fff] group-hover:scale-140 group-hover:bg-gray-800"></div>
                            </div>

                            <div className="text-sm font-bold text-gray-400 mb-3 tracking-widest uppercase">{item.year}</div>
                            <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                        </div>
                    ))}
                </div>

                {/* MOBILE/TABLET LAYOUT (Vertical Alternating) - Hidden on Desktop */}
                <div className="block lg:hidden relative px-4">
                    {/* Central Line */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-[2px] bg-[#e0e0e0] -ml-[1px] z-0"></div>

                    {milestones.map((item, index) => {
                        const isLeft = index % 2 === 0;
                        return (
                            <div
                                key={index}
                                className="grid grid-cols-[1fr_auto_1fr] gap-4 mb-16 relative opacity-0 animate-fade-in items-start"
                                style={{ animationDelay: `${(index + 1) * 0.1}s`, animationFillMode: 'forwards' }}
                            >
                                {/* LEFT SIDE Content or Empty */}
                                {isLeft ? (
                                    <div className="text-right pt-0">
                                        <div className="text-sm font-bold text-gray-400 mb-2 tracking-widest uppercase">{item.year}</div>
                                        <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                ) : (
                                    <div></div>
                                )}

                                {/* CENTER DOT */}
                                <div className="relative z-10 pt-1 flex justify-center">
                                    <div className="w-4 h-4 bg-black rounded-full shadow-[0_0_0_8px_#fff] transition-all duration-300"></div>
                                </div>

                                {/* RIGHT SIDE Content or Empty */}
                                {!isLeft ? (
                                    <div className="text-left pt-0">
                                        <div className="text-sm font-bold text-gray-400 mb-2 tracking-widest uppercase">{item.year}</div>
                                        <h3 className="text-xl font-bold text-black mb-2">{item.title}</h3>
                                        <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                                    </div>
                                ) : (
                                    <div></div>
                                )}
                            </div>
                        );
                    })}
                </div>

            </div>

            <style>{`
                @keyframes fadeIn {
                    to { opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease forwards;
                }
            `}</style>
        </section>
    );
}