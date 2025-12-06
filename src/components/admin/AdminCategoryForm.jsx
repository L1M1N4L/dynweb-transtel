import React, { useState } from 'react';
import { ProductService } from '../../services/productService';

export default function AdminCategoryForm({ onSaved, onCancel, editData = null }) {
    const [title, setTitle] = useState(editData?.title || '');
    const [icon, setIcon] = useState(null); // File
    const [existingIcon, setExistingIcon] = useState(editData?.icon || ''); // URL
    const [background, setBackground] = useState(null); // File
    const [existingBackground, setExistingBackground] = useState(editData?.background || ''); // URL
    const [uploading, setUploading] = useState(false);

    // Manual URL overrides (for when Storage is failing/paid)
    const [manualIcon, setManualIcon] = useState('');
    const [manualBackground, setManualBackground] = useState('');

    const handleManualIconChange = (e) => {
        setManualIcon(e.target.value);
    };

    const handleManualBackgroundChange = (e) => {
        setManualBackground(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        try {
            // Icon Logic: File Upload -> Manual URL -> Existing
            let iconUrl = existingIcon;
            if (icon) {
                try {
                    iconUrl = await ProductService.uploadFile(icon, 'category-icons');
                } catch (err) {
                    console.error("Icon upload failed, trying to save without it or use manual:", err);
                    if (manualIcon) iconUrl = manualIcon;
                }
            } else if (manualIcon) {
                iconUrl = manualIcon;
            }

            // Background Logic: File Upload -> Manual URL -> Existing
            let bgUrl = existingBackground;
            if (background) {
                try {
                    bgUrl = await ProductService.uploadFile(background, 'category-backgrounds');
                } catch (err) {
                    console.error("Background upload failed:", err);
                    if (manualBackground) bgUrl = manualBackground;
                }
            } else if (manualBackground) {
                bgUrl = manualBackground;
            }

            const categoryData = {
                title,
                icon: iconUrl,
                background: bgUrl,
                updatedAt: new Date()
            };

            if (editData?.id) {
                await ProductService.updateCategory(editData.id, categoryData);
            } else {
                categoryData.createdAt = new Date();
                await ProductService.addCategory(categoryData);
            }

            onSaved();
        } catch (error) {
            console.error("Error saving category:", error);
            alert("Failed to save category. See console.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 max-w-2xl">
            <h3 className="text-lg font-bold text-gray-900 mb-6">{editData ? 'Edit Category' : 'Create New Category'}</h3>

            <div className="space-y-6">
                {/* Title */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="e.g. VoIP Solutions"
                        required
                    />
                </div>

                {/* Icon Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon (Small)</label>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-4">
                            {(existingIcon || manualIcon) && !icon && (
                                <div className="w-16 h-16 bg-gray-50 rounded-lg p-2 border border-gray-200 flex items-center justify-center">
                                    <img src={manualIcon || existingIcon} alt="Icon" className="max-w-full max-h-full" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setIcon(e.target.files[0])}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Or paste Icon URL (supports Google Drive links)"
                            value={manualIcon}
                            onChange={handleManualIconChange}
                            className="block w-full text-xs px-3 py-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                        />
                    </div>
                </div>

                {/* Background Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Background (Large)</label>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-start gap-4">
                            {(existingBackground || manualBackground) && !background && (
                                <div className="w-32 h-20 bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                                    <img src={manualBackground || existingBackground} alt="Background" className="w-full h-full object-cover" />
                                </div>
                            )}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setBackground(e.target.files[0])}
                                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                            />
                        </div>
                        <input
                            type="text"
                            placeholder="Or paste Background URL (supports Google Drive links)"
                            value={manualBackground}
                            onChange={handleManualBackgroundChange}
                            className="block w-full text-xs px-3 py-2 border border-gray-200 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-600"
                        />
                    </div>
                </div>
            </div>

            <div className="mt-8 flex gap-3">
                <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                    {uploading ? 'Saving...' : 'Save Category'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}
