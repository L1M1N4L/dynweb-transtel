import React from 'react';
import { Link } from 'react-router-dom';
import pabxImage from '../../assets/pabxwhite.jpg';

export default function Hero() {
    return (
        <section
            className="relative pt-20 overflow-hidden"
            style={{ background: '#000' }}
        >
            {/* Background image */}
            <div className="absolute inset-0">
                <img
                    src={pabxImage}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ opacity: 0.45 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 md:py-28 text-center">
                <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight mb-3">
                    Smarter Connection.<br />
                    Seamless Communication.
                </h1>
                <p className="text-base md:text-lg text-[#a1a1a6] mb-8 max-w-lg mx-auto">
                    Enterprise PABX, Nurse Call, and Voice infrastructure trusted by businesses and hospitals worldwide.
                </p>
                <div className="flex items-center justify-center gap-6">
                    <Link to="/product" className="text-[#2997ff] hover:underline text-base font-medium">
                        Explore products ›
                    </Link>
                    <Link to="/contact" className="text-[#2997ff] hover:underline text-base font-medium">
                        Contact us ›
                    </Link>
                </div>
            </div>
        </section>
    );
}
