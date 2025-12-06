import React from 'react';
import { LayoutDashboard, PlusCircle, LogOut, LayoutGrid } from 'lucide-react';
import logoGrey from '../../assets/logo-grey.svg';

export default function AdminSidebar({ activeTab, setActiveTab, onLogout }) {
    const menuItems = [
        { id: 'add', label: 'Add Product', icon: PlusCircle },
        { id: 'manage', label: 'Manage Products', icon: LayoutDashboard },
        { id: 'categories', label: 'Categories', icon: LayoutGrid },
    ];

    return (
        <aside className="w-[260px] bg-white border-r border-[rgba(0,0,0,0.08)] flex flex-col sticky top-0 h-screen overflow-y-auto py-8 px-4 hidden md:flex flex-shrink-0">
            <div className="px-3 mb-8">
                <img src={logoGrey} alt="Transtel" className="h-8 mb-3" />
                <div className="text-[10px] font-bold tracking-[0.2em] text-[#86868b] uppercase pl-1">
                    Admin Dashboard
                </div>
            </div>

            <nav className="flex flex-col gap-1 flex-1">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`
                                flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium transition-all duration-200 ease-out w-full text-left
                                ${isActive
                                    ? 'bg-[#f5f5f7] text-[#1d1d1f]'
                                    : 'text-[#86868b] hover:bg-[#fafafc] hover:text-[#1d1d1f]'}
                            `}
                        >
                            <Icon size={18} className={isActive ? 'text-[#0071e3]' : 'text-gray-400'} />
                            {item.label}
                        </button>
                    );
                })}
            </nav>

            <div className="mt-auto border-t border-[rgba(0,0,0,0.08)] pt-4">
                <button
                    onClick={onLogout}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-red-600 hover:bg-red-50 transition-all duration-200 w-full text-left"
                >
                    <LogOut size={18} />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
