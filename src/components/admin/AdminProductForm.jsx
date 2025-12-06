import React, { useState } from 'react';
import { X, UploadCloud, FileText, Check } from 'lucide-react';
import { convertGoogleDriveLink } from '../../utils/urlHelper';

export default function AdminProductForm({
    onSubmit,
    uploading,
    formData,
    setFormData,
    categories,
    resetForm
}) {
    // Destructure values directly from props
    // We default to empty strings/arrays to prevent uncontrolled/controlled warnings
    const {
        name = '',
        description = '',
        category = '',
        features = [],
        newFeature = '',
        images = [], // These are the NEW images to upload (Files or URL strings)
        existingImages = [], // These are the URLs of images already saved in DB
        specSheet = null,
        existingSpecSheet = '',
        manualImageUrl = '',
        manualSpecSheet = '' // New field for PDF link
    } = formData;

    const [dragging, setDragging] = useState(false);

    // Helper to update parent state directly
    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    // --- Handlers ---

    // Special handler for manual URLs to support Google Drive
    const handleManualUrlAdd = () => {
        if (!manualImageUrl) return;
        const converted = convertGoogleDriveLink(manualImageUrl);

        // Add to images (mix of Files and Strings)
        handleChange('images', [...images, converted]);

        // Clear the input field in parent state
        handleChange('manualImageUrl', '');
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const newFiles = Array.from(e.target.files);
            handleChange('images', [...images, ...newFiles]);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            const newFiles = Array.from(e.dataTransfer.files).filter(file => file.type.startsWith('image/'));
            handleChange('images', [...images, ...newFiles]);
        }
    };

    const handleDragOver = (e) => { e.preventDefault(); setDragging(true); };
    const handleDragLeave = (e) => { e.preventDefault(); setDragging(false); };

    const removeNewImage = (index) => {
        const updated = [...images];
        updated.splice(index, 1);
        handleChange('images', updated);
    };

    const handleSpecSheetChange = (e) => {
        if (e.target.files[0]) {
            handleChange('specSheet', e.target.files[0]);
        }
    };

    const addFeature = () => {
        if (newFeature && newFeature.trim()) {
            handleChange('features', [...features, newFeature.trim()]);
            handleChange('newFeature', '');
        }
    };

    const removeFeature = (index) => {
        handleChange('features', features.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index) => {
        handleChange('existingImages', existingImages.filter((_, i) => i !== index));
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            {/* Budget Warning */}
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-md mb-6">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className="ml-3">
                        <p className="text-sm text-amber-700">
                            <span className="font-bold">Notice:</span> File uploads are currently restricted due to budget constraints.
                            Please use the <strong>"Paste URL"</strong> options for images and PDFs instead.
                        </p>
                    </div>
                </div>
            </div>

            {/* Category Selection */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                    value={category}
                    onChange={(e) => handleChange('category', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    required
                >
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => {
                        // Handle both String (legacy/simple) and Object (managed) categories
                        const catTitle = typeof cat === 'object' ? cat.title : cat;
                        const catValue = typeof cat === 'object' ? cat.title : cat; // Storing title as value for simplicity in product ref
                        return (
                            <option key={index} value={catValue}>{catTitle}</option>
                        );
                    })}
                </select>
            </div>

            {/* Product Name */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    placeholder="e.g. Enterprise VOIP Station"
                    required
                />
            </div>

            {/* Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    rows={4}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition-shadow"
                    placeholder="Product details..."
                    required
                />
            </div>

            {/* Key Features */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Key Features</label>
                <div className="flex gap-2 mb-2">
                    <input
                        type="text"
                        value={newFeature}
                        onChange={(e) => handleChange('newFeature', e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Add a feature (e.g. 24/7 Support)"
                    />
                    <button
                        type="button"
                        onClick={addFeature}
                        className="px-4 py-2 bg-gray-100 text-gray-700 border border-gray-200 rounded-md hover:bg-gray-200 font-medium transition-colors"
                    >
                        Add
                    </button>
                </div>
                <ul className="space-y-2 mt-3">
                    {features.map((feat, idx) => (
                        <li key={idx} className="flex justify-between items-center bg-gray-50 px-3 py-2 rounded border border-gray-100 text-sm">
                            <span className="text-gray-700">{feat}</span>
                            <button
                                type="button"
                                onClick={() => removeFeature(idx)}
                                className="text-red-500 hover:text-red-700 text-xs font-semibold uppercase tracking-wide"
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Spec Sheet Upload */}
            <div className="p-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <label className="block text-sm font-medium text-gray-700 mb-2">Spec Sheet (PDF)</label>
                {existingSpecSheet && (
                    <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 p-2 rounded mb-3 border border-green-100">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span>PDF Available</span>
                        <a href={existingSpecSheet} target="_blank" rel="noreferrer" className="underline font-medium ml-1">View</a>
                    </div>
                )}
                <div className="space-y-3">
                    <input
                        id="spec-input"
                        type="file"
                        accept=".pdf"
                        onChange={handleSpecSheetChange}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                    />

                    <div>
                        <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            Or Paste PDF URL
                        </label>
                        <input
                            type="text"
                            value={manualSpecSheet}
                            onChange={(e) => handleChange('manualSpecSheet', e.target.value)}
                            placeholder="https://example.com/spec-sheet.pdf"
                            className="block w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            {/* Image Upload & Management */}
            <div className="p-5 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                <label className="block text-sm font-bold text-gray-900 mb-3">Product Images</label>

                {/* Existing Images Management */}
                {existingImages.length > 0 && (
                    <div className="mb-4">
                        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">Current Images ({existingImages.length})</p>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                            {existingImages.map((url, i) => (
                                <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-white shadow-sm border border-gray-200">
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                    <button
                                        type="button"
                                        onClick={() => removeExistingImage(i)}
                                        className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Drag & Drop Zone */}
                <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    className={`
                        border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer mb-4
                        ${dragging ? 'border-blue-500 bg-blue-50 scale-[1.02]' : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'}
                    `}
                >
                    <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="file-input"
                    />
                    <label htmlFor="file-input" className="cursor-pointer block">
                        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <UploadCloud size={24} />
                        </div>
                        <p className="text-gray-900 font-medium mb-1">Click to upload or drag and drop</p>
                        <p className="text-sm text-gray-500">SVG, PNG, JPG or GIF (max 5MB)</p>
                    </label>
                </div>

                {/* Manual URL Input (Fallback) */}
                <div className="mb-6">
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Or Paste Image URL (supports Google Drive links)
                    </label>
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={manualImageUrl}
                            onChange={(e) => handleChange('manualImageUrl', e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleManualUrlAdd())}
                            placeholder="https://drive.google.com/..."
                            className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                            type="button"
                            onClick={handleManualUrlAdd}
                            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200"
                        >
                            Add URL
                        </button>
                    </div>
                </div>

                {/* New Images Preview */}
                {images.length > 0 && (
                    <div className="mt-4">
                        <p className="text-xs text-gray-500 mb-2 font-medium uppercase tracking-wide">New Images ({images.length})</p>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-4">
                            {images.map((fileOrUrl, i) => (
                                <div key={i} className="relative group aspect-square rounded-lg overflow-hidden bg-white shadow-sm border border-gray-200 flex items-center justify-center">
                                    {typeof fileOrUrl === 'string' ? (
                                        <img src={fileOrUrl} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="text-xs text-gray-400 p-2 text-center break-words">
                                            {fileOrUrl.name}
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => removeNewImage(i)}
                                        className="absolute top-1 right-1 bg-white text-red-500 rounded-full p-1 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X size={12} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex gap-3 pt-4">
                <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {uploading ? 'Saving Product...' : 'Save Product'}
                </button>
                <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
