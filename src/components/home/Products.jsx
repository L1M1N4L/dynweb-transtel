import React, { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';
import { ProductService } from '../../services/productService';
import { Link } from 'react-router-dom';

export default function Products() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const allCategories = await ProductService.getAllCategories();
                setCategories(allCategories);
            } catch (error) {
                console.error("Failed to load categories", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-white">
            <PuffLoader color="#2563eb" size={60} speedMultiplier={0.8} />
        </div>
    );

    return (
        <section id="product" className="py-24 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-semibold text-[#1d1d1f] mb-3 tracking-tight">Our Products</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive communication solutions designed for modern enterprises
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100"
                        >
                            {/* Category Image */}
                            <div className="w-full h-64 overflow-hidden bg-gray-50 flex items-center justify-center relative">
                                {category.image ? (
                                    <img
                                        src={category.image}
                                        alt={category.title}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                        <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </div>
                                )}
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>

                            {/* Category Info */}
                            <div className="p-8 flex flex-col flex-grow text-center">
                                <h3 className="text-2xl font-bold text-[#1d1d1f] mb-3 tracking-tight group-hover:text-blue-600 transition-colors">
                                    {category.title}
                                </h3>
                                <p className="text-gray-500 mb-6 leading-relaxed line-clamp-3 text-sm flex-grow">
                                    {category.description}
                                </p>
                                <div>
                                    <Link
                                        to={`/product/${category.id}`}
                                        className="inline-flex items-center justify-center px-6 py-2.5 bg-[#f5f5f7] text-[#1d1d1f] text-sm font-semibold rounded-full hover:bg-[#1d1d1f] hover:text-white transition-all duration-300"
                                    >
                                        Explore {category.title}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
