import React from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';

export default function AdminCategoryList({ categories, onEdit, onDelete, onAddNew }) {
    if (!categories || categories.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                <p className="text-gray-500 mb-4">No categories defined yet.</p>
                <button
                    onClick={onAddNew}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                    Create First Category
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900">All Categories</h2>
                <button
                    onClick={onAddNew}
                    className="flex items-center gap-2 px-4 py-2 bg-[#0071e3] text-white rounded-lg hover:bg-[#0077ed] transition-colors font-medium text-sm"
                >
                    <Plus size={16} />
                    Add Category
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map(cat => (
                    <div key={cat.id} className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                        {/* Background Preview */}
                        <div className="h-32 bg-gray-100 relative overflow-hidden">
                            {cat.background ? (
                                <img src={cat.background} alt={cat.title} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-50 text-xs uppercase">No Background</div>
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

                            {/* Icon Overlay */}
                            <div className="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-lg shadow-md p-2 flex items-center justify-center border border-gray-100 z-10">
                                {cat.icon ? (
                                    <img src={cat.icon} alt="" className="w-full h-full object-contain" />
                                ) : (
                                    <span className="text-xs text-gray-400">Icon</span>
                                )}
                            </div>
                        </div>

                        <div className="pt-8 pb-5 px-6">
                            <h3 className="font-bold text-lg text-gray-900 mb-4">{cat.title}</h3>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => onEdit(cat)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors"
                                >
                                    <Pencil size={14} /> Edit
                                </button>
                                <button
                                    onClick={() => onDelete(cat.id)}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                >
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
