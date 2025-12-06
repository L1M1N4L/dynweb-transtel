import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { ProductService } from '../../services/productService';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import CategorySidebar from './CategorySidebar';

export default function ProductDetail() {
    const { category, productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [prodData, catsData] = await Promise.all([
                    ProductService.getProductById(category, productId),
                    ProductService.getAllCategories()
                ]);
                setProduct(prodData);
                setCategories(catsData);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [category, productId]);

    if (loading) return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-white">
            <PuffLoader color="#2563eb" size={60} speedMultiplier={0.8} />
        </div>
    );
    if (!product) return <div className="py-20 text-center">Product not found</div>;

    // Handle Category Click for sidebar
    const handleCategoryClick = (catId) => {
        navigate(`/product/${catId}`);
    };

    return (
        <div className="flex min-h-screen bg-white font-sans pt-[64px]">
            {/* Sidebar (Reused) */}
            <CategorySidebar
                categories={categories}
                selectedCategory={category}
                onSelect={handleCategoryClick}
            />

            <div className="flex-grow flex flex-col">
                <div className="max-w-[1200px] w-full mx-auto px-6 py-12 lg:px-12">
                    {/* Breadcrumbs matching new style */}
                    <nav className="flex items-center gap-2 mb-10 text-sm text-[#86868b]">
                        <RouterLink to="/" className="hover:text-black">Home</RouterLink>
                        <span className="select-none">›</span>
                        <RouterLink to="/product" className="hover:text-black">Products</RouterLink>
                        <span className="select-none">›</span>
                        <RouterLink to={`/product/${category}`} className="hover:text-black">{categories.find(c => c.id === category)?.title || category}</RouterLink>
                        <span className="select-none">›</span>
                        <span className="text-[#1d1d1f] font-medium">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                        {/* Left: Images */}
                        <div className="space-y-6">
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#f5f5f7] border border-[rgba(0,0,0,0.08)] flex items-center justify-center">
                                {product.image ? (
                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center p-8">
                                        <h2 className="text-3xl font-bold mb-2 text-[#1d1d1f]">{product.name}</h2>
                                        <p className="text-gray-500">Image Preview</p>
                                    </div>
                                )}
                            </div>
                            {/* Scrolling Image Gallery - Manual Horizontal Scroll */}
                            <div className="w-full relative group/gallery">
                                {/* Left Arrow */}
                                <button
                                    onClick={() => {
                                        document.getElementById('gallery-scroll').scrollBy({ left: -200, behavior: 'smooth' });
                                    }}
                                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-800 opacity-0 group-hover/gallery:opacity-100 transition-opacity disabled:opacity-0"
                                >
                                    <ChevronLeft size={20} />
                                </button>

                                {/* Right Arrow */}
                                <button
                                    onClick={() => {
                                        document.getElementById('gallery-scroll').scrollBy({ left: 200, behavior: 'smooth' });
                                    }}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-full shadow-md text-gray-800 opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                                >
                                    <ChevronRight size={20} />
                                </button>

                                <div
                                    id="gallery-scroll"
                                    className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                                >
                                    {[...(product.images || [product.image || "https://i.imgur.com/Cjq8e8g.png"]), ...(product.images || [product.image || "https://i.imgur.com/Cjq8e8g.png"])].map((img, i) => (
                                        <div
                                            key={i}
                                            className="w-32 h-32 flex-shrink-0 rounded-xl bg-[#f5f5f7] border border-[rgba(0,0,0,0.08)] cursor-pointer hover:border-black transition-all duration-300 overflow-hidden snap-center"
                                        >
                                            <img src={img} alt={`Product view ${i}`} className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right: Info */}
                        <div className="pt-4">
                            <h1 className="text-4xl lg:text-5xl font-bold mb-6 text-[#1d1d1f] tracking-tight">{product.name}</h1>
                            <div className="prose prose-lg text-[#86868b] leading-relaxed">
                                <p className="mb-8 text-xl font-light">{product.description || "Product description goes here."}</p>

                                <div className="border-t border-gray-100 pt-8 mt-8">
                                    <h3 className="text-[#1d1d1f] font-semibold text-lg mb-4">Key Features</h3>
                                    <ul className="space-y-3 list-disc pl-5">
                                        {(product.features && product.features.length > 0) ? (
                                            product.features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))
                                        ) : (
                                            <>
                                                <li>Enterprise-grade security and reliability</li>
                                                <li>Seamless integration with existing infrastructure</li>
                                                <li>24/7 dedicated support capability</li>
                                                <li>Advanced configuration options</li>
                                            </>
                                        )}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10 flex gap-4">
                                <button className="px-8 py-3 bg-[#0071e3] text-white rounded-full font-medium hover:bg-[#0077ed] transition-colors">
                                    Contact Sales
                                </button>
                                {product.specSheetUrl && (
                                    <button
                                        onClick={() => window.open(product.specSheetUrl, '_blank')}
                                        className="px-8 py-3 border border-gray-300 text-[#1d1d1f] rounded-full font-medium hover:border-gray-800 transition-colors"
                                    >
                                        Download Spec Sheet
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
