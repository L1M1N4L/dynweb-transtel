import React, { useEffect, useState } from 'react';
import { ProductService } from '../../services/productService';
import { Link } from 'react-router-dom';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const allProducts = await ProductService.getAllProducts();
                // Take first 6 products as featured
                setProducts(allProducts.slice(0, 6));
            } catch (error) {
                console.error("Failed to load products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    if (loading) return null; // Or a streamlined loader

    return (
        <section id="product" className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-2 tracking-tight">Our Products</h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Comprehensive communication solutions designed for modern enterprises
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group flex flex-col"
                        >
                            {/* Product Image - Fixed Size */}
                            <div className="w-full h-[400px] mb-4 flex items-center justify-center overflow-hidden bg-white rounded-lg border border-gray-100">
                                {product.image || (product.images && product.images[0]) ? (
                                    <img
                                        src={product.image || product.images[0]}
                                        alt={product.name}
                                        className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-50 flex items-center justify-center">
                                        <div className="w-12 h-12 flex items-center justify-center">
                                            <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Product Info */}
                            <div className="text-center">
                                <h3 className="text-2xl font-semibold text-gray-900 mb-2 tracking-tight">
                                    {product.name}
                                </h3>
                                <p className="text-sm text-gray-600 mb-5 leading-relaxed line-clamp-2 min-h-[40px]">
                                    {product.description}
                                </p>
                                <div className="flex items-center justify-center gap-3">
                                    <Link
                                        to={`/product/${product.category}/${product.id}`}
                                        className="px-6 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        Learn more
                                    </Link>
                                    <button className="px-6 py-2 border-2 border-gray-900 text-gray-900 text-sm font-medium rounded-full hover:bg-gray-900 hover:text-white transition-all duration-200">
                                        Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
