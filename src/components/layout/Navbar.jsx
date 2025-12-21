import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoGrey from '../../assets/logo-grey.svg';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-lg border-b border-gray-200 shadow-sm' : 'bg-white'}`}>
            <nav className="max-w-7xl mx-auto px-6 py-5">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src={logoGrey}
                            alt="Transtel Communications"
                            className="h-6 w-auto"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-sm font-medium text-gray-900 hover:text-gray-700 transition-colors relative group">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group">
                            About
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/product" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group">
                            Product
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/solution" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group">
                            Solution
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/support" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group">
                            Support
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/help" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group">
                            Help
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                        <Link to="/contact" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group">
                            Contact Us
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden w-6 h-6 flex flex-col justify-center items-center"
                    >
                        <span className={`w-5 h-0.5 bg-black transition-all ${isMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
                        <span className={`w-5 h-0.5 bg-black mt-1 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                        <span className={`w-5 h-0.5 bg-black mt-1 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4">
                        <div className="flex flex-col gap-4">
                            <Link to="/" className="text-sm text-black">Home</Link>
                            <Link to="/about" className="text-sm text-gray-600">About</Link>
                            <Link to="/product" className="text-sm text-gray-600">Product</Link>
                            <Link to="/solution" className="text-sm text-gray-600">Solution</Link>
                            <Link to="/support" className="text-sm text-gray-600">Support</Link>
                            <Link to="/help" className="text-sm text-gray-600">Help</Link>
                            <Link to="/contact" className="text-sm text-gray-600">Contact Us</Link>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
}
