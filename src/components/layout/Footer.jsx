import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <footer className="bg-[#f5f5f7] text-[#86868b]">
            {/* Top links */}
            <div className="max-w-5xl mx-auto px-6 pt-14 pb-6">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">

                    <div>
                        <h4 className="text-xs font-semibold text-[#1d1d1f] tracking-wide uppercase mb-4">Products</h4>
                        <ul className="space-y-2.5">
                            <li><Link to="/product" className="hover:text-[#1d1d1f] transition-colors">PABX</Link></li>
                            <li><Link to="/product" className="hover:text-[#1d1d1f] transition-colors">Nurse Call</Link></li>
                            <li><Link to="/product" className="hover:text-[#1d1d1f] transition-colors">Telephone</Link></li>
                            <li><Link to="/product" className="hover:text-[#1d1d1f] transition-colors">Voice Gateway</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-[#1d1d1f] tracking-wide uppercase mb-4">Company</h4>
                        <ul className="space-y-2.5">
                            <li><Link to="/about" className="hover:text-[#1d1d1f] transition-colors">About</Link></li>
                            <li><Link to="/contact" className="hover:text-[#1d1d1f] transition-colors">Contact</Link></li>
                            <li><Link to="/support" className="hover:text-[#1d1d1f] transition-colors">Support</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-xs font-semibold text-[#1d1d1f] tracking-wide uppercase mb-4">Get in Touch</h4>
                        <ul className="space-y-2.5 text-sm">
                            <li>
                                <a href="tel:+15617474466" className="hover:text-[#1d1d1f] transition-colors">+1 (561) 747-4466</a>
                            </li>
                            <li>
                                <span>1562 Park Ln S, Jupiter, FL 33458</span>
                            </li>
                            <li>
                                <a href="mailto:info@transtelcommunications.co" className="hover:text-[#1d1d1f] transition-colors">info@transtelcommunications.co</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-[#d2d2d7]">
                <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                    <p>Copyright © 2025 Transtel Communications. All rights reserved.</p>
                    <div className="flex items-center gap-5">
                        <a href="#" className="hover:text-[#1d1d1f] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#1d1d1f] transition-colors">Terms of Use</a>
                        {/* Social Icons */}
                        <a href="https://www.youtube.com/@TranstelGlobal" target="_blank" rel="noopener noreferrer" aria-label="YouTube" className="hover:text-[#1d1d1f] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/TranstelGlobal" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-[#1d1d1f] transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
