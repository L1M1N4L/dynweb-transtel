import React from 'react';
import { LayoutDashboard, PlusCircle, LogOut, LayoutGrid, BarChart3, Mail, Key } from 'lucide-react';
import logoGrey from '../../assets/logo-grey.svg';

export default function AdminSidebar({ activeTab, setActiveTab, onLogout, user }) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
        { id: 'add', label: 'Add Product', icon: PlusCircle },
        { id: 'manage', label: 'Manage Products', icon: LayoutDashboard },
        { id: 'categories', label: 'Categories', icon: LayoutGrid },
        { id: 'contacts', label: 'Contact Submissions', icon: Mail },
        { id: 'licenses', label: 'License Generator', icon: Key },
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

            <div className="mt-auto space-y-3">
                {/* User Profile Section */}
                {user && (
                    <div className="px-3 py-3 bg-[#f5f5f7] rounded-lg">
                        <div className="flex items-center gap-3 mb-3">
                            {user.photoURL ? (
                                <img
                                    src={user.photoURL}
                                    alt={user.displayName || 'User'}
                                    className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                                />
                            ) : (
                                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-sm">
                                    {user.email?.[0]?.toUpperCase() || 'A'}
                                </div>
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-[#1d1d1f] truncate">
                                    Hi, {user.displayName || user.email?.split('@')[0] || 'Admin'}!
                                </p>
                                <p className="text-xs text-[#86868b] truncate">
                                    {user.email}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Logout Button */}
                <div className="border-t border-[rgba(0,0,0,0.08)] pt-3">
                    <button
                        onClick={onLogout}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-[14px] font-medium text-red-600 hover:bg-red-50 transition-all duration-200 w-full text-left"
                    >
                        <LogOut size={18} />
                        Sign Out
                    </button>
                </div>
            </div>
        </aside>
    );
}
