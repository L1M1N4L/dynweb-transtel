import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductService } from '../../services/productService';
import { PuffLoader } from 'react-spinners';

const ProductCategories = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await ProductService.getAllCategories();

                // Transform data if necessary to match display requirements
                const formatted = data.map(cat => ({
                    id: cat.id,
                    title: cat.title,
                    // Use 'background' from category object, fallback to 'image' (derived), then to default
                    image: cat.background || cat.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80',
                    icon: cat.icon, // Can be null
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
                <PuffLoader color="#2563eb" size={60} speedMultiplier={0.8} />
            </div>
        );
    }

    return (
        <section className="py-16 bg-[#f5f5f7]">
            <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
                <h2 className="text-3xl md:text-4xl font-bold text-[#1d1d1f] mb-12 text-center tracking-tight">
                    Enterprise Solutions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            onClick={() => navigate(`/product/${category.id}`)}
                            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-500"
                        >
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <img
                                    src={category.image}
                                    alt={category.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/60 transition-colors duration-500" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {/* Icon (if available) - Hidden on hover to save space? Or keep it? User didn't specify, keeping plain. */}

                                    <h3 className="text-2xl font-bold mb-2">{category.title}</h3>

                                    <div className="overflow-hidden max-h-0 group-hover:max-h-40 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100">
                                        <p className="text-gray-200 mb-4 line-clamp-2 text-sm">
                                            {category.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm font-semibold text-blue-400 group-hover:text-blue-300">
                                            View Products <ArrowRight size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCategories;