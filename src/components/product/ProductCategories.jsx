import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductService } from '../../services/productService';
import { PuffLoader } from 'react-spinners';
import SEO from '../common/SEO';

const ProductCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await ProductService.getAllCategories();
                const formatted = data.map(cat => ({
                    id: cat.id,
                    title: cat.title,
                    image: cat.background || cat.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
                    description: cat.description || 'Explore our solutions'
                }));
                setCategories(formatted);
            } catch (error) {
                console.error("Failed to load categories", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#f5f5f7]">
                <PuffLoader color="#1d1d1f" size={60} speedMultiplier={0.8} />
            </div>
        );
    }

    return (
        <div className="bg-[#f5f5f7] min-h-screen pt-32 pb-20">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-8">

                {/* Compact header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-3">
                        Our Products
                    </h1>
                    <p className="text-lg text-[#86868b] max-w-xl mx-auto leading-relaxed">
                        Enterprise communication hardware and infrastructure built for every environment.
                    </p>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            onClick={() => navigate(`/product/${category.id}`)}
                            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 group-hover:via-black/30 transition-all duration-500" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-7 flex flex-col justify-end">
                                <div className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-500">
                                    <h3 className="text-2xl font-semibold tracking-tight text-white mb-1">
                                        {category.title}
                                    </h3>
                                    <div className="overflow-hidden max-h-0 group-hover:max-h-24 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                                        <p className="text-white/70 text-sm leading-relaxed mb-3 line-clamp-2">
                                            {category.description}
                                        </p>
                                        <span className="text-sm font-medium text-white">
                                            View Products ›
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default ProductCategories;