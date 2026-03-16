import React, { useEffect, useState } from 'react';
import { useParams, Link as RouterLink, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { ProductService } from '../../services/productService';
import { PuffLoader } from 'react-spinners';

import CategorySidebar from './CategorySidebar';

export default function ProductList() {
    // Current category from URL
    const { category } = useParams();
    const navigate = useNavigate();

    // Data state
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Load data
    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            try {
                // Fetch all categories for the sidebar
                const cats = await ProductService.getAllCategories();
                setCategories(cats);

                if (category) {
                    const prods = await ProductService.getProductsByCategory(category);
                    setProducts(prods);
                }
            } catch (error) {
                console.error("Failed to load product data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [category]);

    // Handle Category Click
    const handleCategoryClick = (catId) => {
        navigate(`/product/${catId}`);
    };

    if (loading) return (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#f5f5f7]">
            <PuffLoader color="#1d1d1f" size={60} speedMultiplier={0.8} />
        </div>
    );

    if (loading) return <div className="py-32 text-center text-gray-500">Loading products...</div>;

    // Find current category title
    const currentCategoryTitle = categories.find(c => c.id === category)?.title || category;

    return (
        <div className="flex min-h-screen bg-[#f5f5f7] font-sans pt-[64px]">
            {/* Sidebar */}
            <CategorySidebar
                categories={categories}
                selectedCategory={category}
                onSelect={handleCategoryClick}
            />

            {/* Main Content */}
            <main className="flex-grow flex flex-col">
                <div className="max-w-[1400px] w-full mx-auto p-12 lg:px-16">
                    {/* Breadcrumbs */}
                    <nav className="flex items-center gap-2 mb-10 text-sm text-[#86868b]">
                        <BreadcrumbLink text="Home" to="/" />
                        <span className="select-none">›</span>
                        <BreadcrumbLink text="Products" to="/product" />
                        <span className="select-none">›</span>
                        <span className="text-[#1d1d1f] font-medium">
                            {currentCategoryTitle}
                        </span>
                    </nav>

                    {/* Header */}
                    <header className="mb-12 border-b border-[#e5e5e5] pb-10">
                        <h1 className="font-semibold text-5xl tracking-tight mb-3 text-[#1d1d1f]">
                            {currentCategoryTitle}
                        </h1>
                        <p className="text-[#86868b] text-lg leading-relaxed m-0">
                            Explore our curated collection of {currentCategoryTitle?.toLowerCase()} products.
                        </p>
                    </header>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {products.length > 0 ? (
                            products.map((product) => (
                                <ProductCard key={product.id || product.uniqueKey} product={product} categoryId={category} />
                            ))
                        ) : (
                            <div className="col-span-full py-32 text-center bg-white rounded-2xl border border-[rgba(0,0,0,0.08)]">
                                <h3 className="text-[#86868b] font-medium text-xl m-0">
                                    No products found in this category.
                                </h3>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

// Breadcrumb link component
function BreadcrumbLink({ text, to }) {
    return (
        <RouterLink
            to={to}
            className="cursor-pointer transition-colors duration-200 text-[#86868b] hover:text-[#1d1d1f]"
        >
            {text}
        </RouterLink>
    );
}

function ProductCard({ product, categoryId }) {
    return (
        <RouterLink to={`/product/${categoryId}/${product.id}`} className="group block rounded-2xl overflow-hidden bg-white border border-[#e5e5e5] hover:border-[#c6c6c8] transition-colors duration-300 cursor-pointer h-full flex flex-col">
            <div className="overflow-hidden bg-[#f5f5f7] aspect-[1.5] relative">
                <img
                    src={product.image || "https://i.imgur.com/Cjq8e8g.png"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-semibold text-[18px] tracking-tight mb-1.5 leading-tight text-[#1d1d1f]">
                    {product.name}
                </h3>
                <p className="text-[#86868b] leading-relaxed text-sm m-0 line-clamp-3 mb-4">
                    {product.description}
                </p>
                <span className="mt-auto text-sm font-medium text-[#0066cc] group-hover:underline">
                    Learn more ›
                </span>
            </div>
        </RouterLink>
    );
}
