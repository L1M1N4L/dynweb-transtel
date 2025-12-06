import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';

export default function AdminProductList({ products, onEdit, onDelete }) {
    if (!products || products.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500">No products found in inventory.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            {products.map(product => (
                <div key={product.id} className="bg-white border text-left border-gray-200 rounded-xl p-5 flex flex-col md:flex-row gap-6 hover:shadow-md transition-all duration-200">

                    {/* Images Column */}
                    <div className="w-full md:w-64 flex-shrink-0">
                        <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden mb-2 relative border border-[rgba(0,0,0,0.04)]">
                            {product.image || (product.images && product.images[0]) ? (
                                <img
                                    src={product.image || product.images[0]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400 bg-gray-50 text-xs uppercase tracking-wider font-medium">No Image</div>
                            )}
                            <span className="absolute top-2 left-2 bg-white/90 backdrop-blur text-black text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider font-semibold border border-black/5">
                                {product.category}
                            </span>
                        </div>

                        {/* Children Images (Thumbnails) */}
                        {product.images && product.images.length > 1 && (
                            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
                                {product.images.map((img, i) => (
                                    <div key={i} className="w-12 h-12 flex-shrink-0 rounded-md bg-gray-50 border border-gray-200 overflow-hidden">
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info Column */}
                    <div className="flex-grow flex flex-col">
                        <div className="mb-4">
                            <h3 className="font-bold text-xl text-[#1d1d1f] mb-2">{product.name}</h3>
                            <p className="text-[#86868b] text-sm leading-relaxed line-clamp-3 md:line-clamp-none">
                                {product.description}
                            </p>
                        </div>

                        {/* Features Preview */}
                        {product.features && product.features.length > 0 && (
                            <div className="mb-4 flex flex-wrap gap-2">
                                {product.features.slice(0, 3).map((f, i) => (
                                    <span key={i} className="text-[11px] px-2 py-1 bg-gray-100 text-gray-600 rounded-md">
                                        {f}
                                    </span>
                                ))}
                                {product.features.length > 3 && (
                                    <span className="text-[11px] px-2 py-1 text-gray-400">+ {product.features.length - 3} more</span>
                                )}
                            </div>
                        )}

                        <div className="mt-auto flex items-center gap-3 pt-4 lg:pt-0">
                            <button
                                onClick={() => onEdit(product)}
                                className="flex items-center gap-2 px-4 py-2 text-[#0071e3] bg-[#0071e3]/10 hover:bg-[#0071e3]/20 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Pencil size={16} />
                                Edit Product
                            </button>
                            <button
                                onClick={() => onDelete(product.id)}
                                className="flex items-center gap-2 px-4 py-2 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg text-sm font-medium transition-colors"
                            >
                                <Trash2 size={16} />
                                Delete
                            </button>
                            {product.specSheetUrl && (
                                <a
                                    href={product.specSheetUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="ml-auto text-xs text-gray-400 hover:text-[#0071e3] underline"
                                >
                                    View Spec Sheet
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
