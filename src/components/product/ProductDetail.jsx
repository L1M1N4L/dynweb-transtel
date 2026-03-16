import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { ProductService } from '../../services/productService';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { PuffLoader } from 'react-spinners';
import CategorySidebar from './CategorySidebar';
import SEO from '../common/SEO';

export default function ProductDetail() {
    const { category, productId } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [mainImage, setMainImage] = useState(null);

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
                setMainImage(prodData?.image || prodData?.images?.[0] || null);
            } catch (error) {
                console.error("Failed to fetch data", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [category, productId]);

    if (loading) return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#f5f5f7]">
            <PuffLoader color="#1d1d1f" size={60} speedMultiplier={0.8} />
        </div>
    );

    if (!product) return (
        <div className="py-40 text-center bg-[#f5f5f7] min-h-screen">
            <p className="text-[#86868b] text-lg">Product not found.</p>
            <RouterLink to="/product" className="mt-4 inline-block text-[#0066cc] hover:underline">← Back to Products</RouterLink>
        </div>
    );

    const handleCategoryClick = (catId) => navigate(`/product/${catId}`);
    const galleryImages = product.images || (product.image ? [product.image] : []);
    const categoryTitle = categories.find(c => c.id === category)?.title;

    return (
        <div className="flex min-h-screen bg-[#f5f5f7] font-sans pt-[64px]">
            <CategorySidebar
                categories={categories}
                selectedCategory={category}
                onSelect={handleCategoryClick}
            />

            <div className="flex-grow">
                <div className="max-w-[1100px] w-full mx-auto px-8 py-12 lg:px-12">

                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 mb-10 text-sm text-[#86868b]">
                        <RouterLink to="/" className="hover:text-[#1d1d1f] transition-colors">Home</RouterLink>
                        <span>›</span>
                        <RouterLink to="/product" className="hover:text-[#1d1d1f] transition-colors">Products</RouterLink>
                        <span>›</span>
                        <RouterLink to={`/product/${category}`} className="hover:text-[#1d1d1f] transition-colors">{categoryTitle || category}</RouterLink>
                        <span>›</span>
                        <span className="text-[#1d1d1f] font-medium">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

                        {/* Left: Images */}
                        <div className="space-y-4">
                            {/* Main image */}
                            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-[#e5e5e5] flex items-center justify-center">
                                {mainImage ? (
                                    <img
                                        src={mainImage}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                        referrerPolicy="no-referrer"
                                    />
                                ) : (
                                    <div className="text-center p-8">
                                        <p className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">{product.name}</p>
                                        <p className="text-[#86868b] mt-1 text-sm">No image available</p>
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail strip */}
                            {galleryImages.length > 1 && (
                                <div className="relative group/gallery">
                                    <button
                                        onClick={() => document.getElementById('gallery-scroll').scrollBy({ left: -160, behavior: 'smooth' })}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white border border-[#e5e5e5] rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                                    >
                                        <ChevronLeft size={16} />
                                    </button>
                                    <button
                                        onClick={() => document.getElementById('gallery-scroll').scrollBy({ left: 160, behavior: 'smooth' })}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 h-8 flex items-center justify-center bg-white border border-[#e5e5e5] rounded-full opacity-0 group-hover/gallery:opacity-100 transition-opacity"
                                    >
                                        <ChevronRight size={16} />
                                    </button>
                                    <div
                                        id="gallery-scroll"
                                        className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory"
                                        style={{ scrollbarWidth: 'none' }}
                                    >
                                        {galleryImages.map((img, i) => (
                                            <button
                                                key={i}
                                                onClick={() => setMainImage(img)}
                                                className={`w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border-2 transition-all snap-center ${mainImage === img
                                                        ? 'border-[#1d1d1f]'
                                                        : 'border-[#e5e5e5] hover:border-[#c6c6c8]'
                                                    }`}
                                            >
                                                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Right: Info */}
                        <div className="pt-2">
                            {categoryTitle && (
                                <p className="text-xs font-semibold text-[#86868b] tracking-widest uppercase mb-3">{categoryTitle}</p>
                            )}
                            <h1 className="text-4xl lg:text-5xl font-semibold tracking-tight text-[#1d1d1f] mb-6">
                                {product.name}
                            </h1>
                            <p className="text-lg text-[#86868b] leading-relaxed mb-10">
                                {product.description || "Product description goes here."}
                            </p>

                            {/* Features */}
                            <div className="border-t border-[#e5e5e5] pt-8 mb-10">
                                <h2 className="text-xs font-bold tracking-widest text-[#1d1d1f] uppercase mb-6">Key Features</h2>
                                <ul className="space-y-3">
                                    {(product.features && product.features.length > 0) ? (
                                        product.features.map((feature, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1d1d1f] flex-shrink-0" />
                                                <span className="text-[#86868b] text-sm leading-relaxed">{feature}</span>
                                            </li>
                                        ))
                                    ) : (
                                        ["Enterprise-grade security and reliability", "Seamless integration with existing infrastructure", "24/7 dedicated support capability", "Advanced configuration options"].map((f, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#1d1d1f] flex-shrink-0" />
                                                <span className="text-[#86868b] text-sm leading-relaxed">{f}</span>
                                            </li>
                                        ))
                                    )}
                                </ul>
                            </div>

                            {/* CTAs */}
                            <div className="flex gap-3 flex-wrap">
                                <RouterLink
                                    to="/contact"
                                    className="px-8 py-3.5 bg-[#1d1d1f] text-white rounded-full font-semibold hover:bg-[#333] transition-colors text-sm"
                                >
                                    Contact Sales
                                </RouterLink>
                                {product.specSheetUrl && (
                                    <button
                                        onClick={() => window.open(product.specSheetUrl, '_blank')}
                                        className="px-8 py-3.5 border border-[#d2d2d7] text-[#1d1d1f] rounded-full font-semibold hover:border-[#1d1d1f] transition-colors text-sm"
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
