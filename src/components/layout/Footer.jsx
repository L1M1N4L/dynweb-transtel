import React from 'react';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                                <span className="w-0 group-hover:w-1 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                About Us
                            </a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                                <span className="w-0 group-hover:w-1 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                Careers
                            </a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Products</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                                <span className="w-0 group-hover:w-1 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                PABX
                            </a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                                <span className="w-0 group-hover:w-1 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                Telephone
                            </a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                                <span className="w-0 group-hover:w-1 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                Nurse Call
                            </a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Support</h3>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                                <span className="w-0 group-hover:w-1 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                Downloads
                            </a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                                <span className="w-0 group-hover:w-1 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                Privacy Policy
                            </a></li>
                            <li><a href="#" className="hover:text-white transition-colors duration-200 flex items-center group">
                                <span className="w-0 group-hover:w-1 h-0.5 bg-white mr-0 group-hover:mr-2 transition-all duration-200"></span>
                                Sitemap
                            </a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-lg mb-6 text-white">Contact</h3>
                        <div className="space-y-4 text-sm text-gray-400">
                            <p className="flex items-start">
                                <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                                +62 (0) 2154356600
                            </p>
                            <p className="flex items-start">
                                <svg className="w-5 h-5 mr-2 mt-0.5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Jl. Taman Palem Mutiara No.29 Blok A16,<br className="ml-7" />RT.7/RW.14, East Cengkareng, Cengkareng,<br className="ml-7" />West Jakarta City, Jakarta 11730
                            </p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-500">
                    <p>Copyright © 2024 Transtel Communications. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
