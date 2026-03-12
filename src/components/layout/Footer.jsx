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
                <div className="max-w-5xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
                    <p>Copyright © 2024 Transtel Communications. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-[#1d1d1f] transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-[#1d1d1f] transition-colors">Terms of Use</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
