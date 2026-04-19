import React from 'react';
import { Link } from 'react-router-dom';
import pabxImage from '../../assets/pabxwhite.jpg';

export default function Hero() {
    return (
        <section
            className="relative min-h-[60vh] flex items-center justify-center overflow-hidden"
            style={{ background: '#000' }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={pabxImage}
                    alt="Background PABX System"
                    className="w-full h-full object-cover opacity-40 mix-blend-lighten"
                />
                {/* Gradient overlay to ensure text remains readable */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-transparent" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full">
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white leading-tight mb-4">
                    Smarter Connection.<br />
                    Seamless Communication.
                </h1>
                <p className="text-lg md:text-xl text-gray-300 md:text-gray-200 mb-8 max-w-2xl mx-auto drop-shadow-md">
                    Enterprise PABX, Nurse Call, and Voice infrastructure trusted by businesses and hospitals worldwide.
                </p>
                <div className="flex items-center justify-center gap-6">
                    <Link 
                        to="/product" 
                        className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors shadow-lg"
                    >
                        Explore products
                    </Link>
                    <Link 
                        to="/contact" 
                        className="text-white hover:text-gray-300 transition-colors text-base font-medium drop-shadow-lg flex items-center"
                    >
                        Contact us <span className="ml-1 text-xl leading-none">›</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
