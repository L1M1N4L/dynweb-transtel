import React from 'react';
import pabxImage from '../../assets/pabxwhite.jpg';

export default function Hero() {
    return (
        <section id="home" className="pt-20 pb-12 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="w-full relative overflow-hidden rounded-2xl shadow-2xl" style={{ height: '500px' }}>
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
                        <img
                            src={pabxImage}
                            alt="Transtel Communications"
                            className="w-full h-full object-cover opacity-40"
                        />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center px-6 z-10">
                            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
                                Advanced Communication Solutions
                            </h1>
                            <p className="text-xl text-gray-200 max-w-2xl mx-auto">
                                Empowering businesses with cutting-edge telecommunication technology
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
