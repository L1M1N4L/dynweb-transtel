import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function CategorySidebar({ categories, selectedCategory, onSelect }) {
    return (
        <aside className="w-[260px] bg-white border-r border-[rgba(0,0,0,0.08)] flex flex-col sticky top-[64px] h-[calc(100vh-64px)] overflow-y-auto py-8 px-4 hidden md:flex flex-shrink-0">
            <div className="px-3 mb-4 text-[11px] font-semibold tracking-wider text-[#86868b] uppercase">
                Categories
            </div>

            <nav className="flex flex-col gap-[2px]">
                {categories.map((cat) => {
                    const isSelected = cat.id === selectedCategory;
                    return (
                        <div
                            key={cat.id}
                            onClick={() => onSelect(cat.id)}
                            className={`
                                flex items-center justify-between px-3 py-2.5 rounded-lg text-[15px] cursor-pointer select-none transition-all duration-200 ease-out
                                ${isSelected
                                    ? 'text-[#1d1d1f] bg-[rgba(0,0,0,0.05)] font-semibold'
                                    : 'text-[#86868b] bg-transparent hover:bg-[rgba(0,0,0,0.03)] font-normal'}
                            `}
                        >
                            <span>{cat.title}</span>
                            {isSelected && <ChevronRight size={16} className="opacity-50" />}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}
