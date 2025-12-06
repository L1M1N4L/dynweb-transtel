import React from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

export default function AdminLivePreview({
    name,
    description,
    images,
    existingImages,
    features,
    specSheet,
    existingSpecSheet,
    manualSpecSheet
}) {
    // Helper to properly handle File objects vs URL strings
    const getPreviewUrl = (item) => {
        if (!item) return '';
        if (typeof item === 'string') return item;
        if (item instanceof File) return URL.createObjectURL(item);
        return '';
    };

    // Helper to get preview URL
    const getMainImage = () => {
        if (existingImages && existingImages.length > 0) return existingImages[0];
        if (images && images.length > 0) return getPreviewUrl(images[0]);
        // Default placeholder if no image
        return "https://placehold.co/600x400/f1f5f9/cbd5e1?text=No+Image";
    };

    const getAllImages = () => {
        const exist = existingImages || [];
        const newer = images ? images.map(img => getPreviewUrl(img)) : [];
        return [...exist, ...newer];
    };

    const mainImage = getMainImage();
    const allImages = getAllImages();

    // Replicate ProductDetail Layout (simplified for preview card)
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
            <div className="bg-gray-100 p-4 border-b text-xs text-gray-500 uppercase tracking-widest font-semibold text-center">
                Live Preview
            </div>

            <div className="p-6">
                {/* Image Section */}
                <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#f5f5f7] border border-[rgba(0,0,0,0.08)] mb-4">
                    <img src={mainImage} alt="Preview" className="w-full h-full object-cover" />
                </div>

                {/* Thumbnails */}
                {allImages.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-thin">
                        {allImages.map((img, i) => (
                            <div key={i} className="w-16 h-16 flex-shrink-0 rounded-lg bg-[#f5f5f7] border overflow-hidden">
                                <img src={img} alt={`Thumb ${i}`} className="w-full h-full object-cover" />
                            </div>
                        ))}
                    </div>
                )}

                {/* Content Section */}
                <div>
                    <h2 className="text-2xl font-bold mb-3 text-[#1d1d1f] tracking-tight">{name || "Product Name"}</h2>
                    <div className="prose prose-sm text-[#86868b] leading-relaxed mb-6">
                        <p>{description || "Product description will appear here..."}</p>
                    </div>

                    <div className="border-t border-gray-100 pt-4 mt-4">
                        <h3 className="text-[#1d1d1f] font-semibold text-sm mb-2">Key Features</h3>
                        <ul className="space-y-2 list-disc pl-4 text-sm text-[#86868b]">
                            {(features && features.length > 0) ? (
                                features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))
                            ) : (
                                <li className="italic text-gray-400">No features added yet</li>
                            )}
                        </ul>
                    </div>

                    <div className="mt-6 flex flex-col gap-2">
                        <button className="w-full py-2 bg-[#0071e3] text-white rounded-full text-sm font-medium hover:bg-[#0077ed] transition-colors">
                            Contact Sales
                        </button>
                        {(specSheet || existingSpecSheet || manualSpecSheet) && (
                            <button className="w-full py-2 border border-gray-300 text-[#1d1d1f] rounded-full text-sm font-medium hover:border-gray-800 transition-colors">
                                Download Spec Sheet
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
