import React from 'react';
import { Package, FolderOpen, FileText, Clock, TrendingUp } from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import StatCard from './StatCard';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

export default function AdminDashboard({ products, categories }) {
    // Calculate statistics
    const totalProducts = products.length;
    const totalCategories = categories.length;
    const productsWithSpecSheets = products.filter(p => p.specSheetUrl).length;

    // Recent products (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentProducts = products.filter(p => {
        const createdAt = p.createdAt?.toDate ? p.createdAt.toDate() : new Date(p.createdAt);
        return createdAt >= sevenDaysAgo;
    });

    // Category distribution
    const categoryDistribution = categories.map(cat => {
        const count = products.filter(p => p.category === cat.title).length;
        return { name: cat.title, count };
    }).filter(c => c.count > 0).sort((a, b) => b.count - a.count);

    // Spec sheet coverage percentage
    const specSheetPercentage = totalProducts > 0
        ? Math.round((productsWithSpecSheets / totalProducts) * 100)
        : 0;

    // Chart.js data for Category Distribution (Bar Chart)
    const barChartData = {
        labels: categoryDistribution.map(c => c.name),
        datasets: [
            {
                label: 'Products',
                data: categoryDistribution.map(c => c.count),
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
                borderRadius: 8,
            }
        ]
    };

    const barChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            }
        }
    };

    // Chart.js data for Spec Sheet Coverage (Doughnut Chart)
    const doughnutChartData = {
        labels: ['With Spec Sheet', 'Without Spec Sheet'],
        datasets: [
            {
                data: [productsWithSpecSheets, totalProducts - productsWithSpecSheets],
                backgroundColor: [
                    'rgba(16, 185, 129, 0.8)',
                    'rgba(229, 231, 235, 0.8)'
                ],
                borderColor: [
                    'rgba(16, 185, 129, 1)',
                    'rgba(229, 231, 235, 1)'
                ],
                borderWidth: 2
            }
        ]
    };

    const doughnutChartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    padding: 20,
                    font: {
                        size: 12
                    }
                }
            }
        },
        cutout: '70%'
    };

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Products"
                    value={totalProducts}
                    icon={Package}
                    color="blue"
                    subtitle="On website"
                />
                <StatCard
                    title="Categories"
                    value={totalCategories}
                    icon={FolderOpen}
                    color="purple"
                    subtitle="Active categories"
                />
                <StatCard
                    title="Spec Sheets"
                    value={productsWithSpecSheets}
                    icon={FileText}
                    color="green"
                    subtitle={`${specSheetPercentage}% coverage`}
                />
                <StatCard
                    title="Recent Products"
                    value={recentProducts.length}
                    icon={Clock}
                    color="orange"
                    subtitle="Last 7 days"
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Category Distribution Bar Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <TrendingUp size={20} className="text-blue-600" />
                        <h3 className="text-lg font-bold text-gray-900">Products by Category</h3>
                    </div>
                    <div style={{ height: '300px' }}>
                        {categoryDistribution.length > 0 ? (
                            <Bar data={barChartData} options={barChartOptions} />
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-500">No products yet</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Spec Sheet Coverage Doughnut Chart */}
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-center gap-2 mb-6">
                        <FileText size={20} className="text-green-600" />
                        <h3 className="text-lg font-bold text-gray-900">Spec Sheet Coverage</h3>
                    </div>
                    <div style={{ height: '300px' }} className="flex items-center justify-center">
                        {totalProducts > 0 ? (
                            <div className="relative w-full h-full">
                                <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
                                {/* Center text */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="text-center">
                                        <div className="text-3xl font-bold text-gray-900">{specSheetPercentage}%</div>
                                        <div className="text-xs text-gray-500 mt-1">Coverage</div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-500">No data available</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-6">
                    <Clock size={20} className="text-orange-600" />
                    <h3 className="text-lg font-bold text-gray-900">Recent Products</h3>
                </div>
                <div className="space-y-3">
                    {recentProducts.length > 0 ? (
                        recentProducts.slice(0, 5).map((product, idx) => {
                            const createdAt = product.createdAt?.toDate ? product.createdAt.toDate() : new Date(product.createdAt);
                            const timeAgo = getTimeAgo(createdAt);

                            return (
                                <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                    <div className="flex items-center gap-3">
                                        {product.image ? (
                                            <img src={product.image} alt={product.name} className="w-12 h-12 rounded-lg object-cover" />
                                        ) : (
                                            <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                                <Package size={20} className="text-gray-400" />
                                            </div>
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900">{product.name}</p>
                                            <p className="text-sm text-gray-500">{product.category}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-gray-500">{timeAgo}</span>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500 text-center py-8">No recent products</p>
                    )}
                </div>
            </div>
        </div>
    );
}

// Helper function to calculate time ago
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}
