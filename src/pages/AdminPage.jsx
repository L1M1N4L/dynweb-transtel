import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthService } from '../services/authService';
import { ProductService } from '../services/productService';
import { productData } from '../data/productData'; // For categories
import { PuffLoader } from 'react-spinners';
import { convertGoogleDrivePdfLink } from '../utils/urlHelper';
import toast, { Toaster } from 'react-hot-toast';

import AdminProductForm from '../components/admin/AdminProductForm';
import AdminProductList from '../components/admin/AdminProductList';
import AdminLivePreview from '../components/admin/AdminLivePreview';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminCategoryList from '../components/admin/AdminCategoryList';
import AdminCategoryForm from '../components/admin/AdminCategoryForm';
import AdminDashboard from '../components/admin/AdminDashboard';
import AdminContactList from '../components/admin/AdminContactList';
import AdminLicenseGenerator from '../components/admin/AdminLicenseGenerator';

export default function AdminPage() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sidebar State: 'dashboard', 'add', 'manage', 'categories'
    const [activeTab, setActiveTab] = useState('dashboard');
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    // Category Management State
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'form'
    const [editingCategory, setEditingCategory] = useState(null);

    // Form State Object
    const initialFormState = {
        editId: null,
        name: '',
        description: '',
        category: '',
        images: [],
        existingImages: [],
        specSheet: null,
        existingSpecSheet: '',
        features: [],
        newFeature: ''
    };
    const [formData, setFormData] = useState(initialFormState);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    // Auth Check
    useEffect(() => {
        const unsubscribe = AuthService.subscribeToAuthChanges(async (currentUser) => {
            if (!currentUser) {
                navigate('/login');
            } else {
                // Verify Authorized Role (Admin or Technical)
                const isAuthorized = await AuthService.checkAdminRole(currentUser.uid);
                if (isAuthorized) {
                    setUser(currentUser);
                    fetchProducts();
                    fetchCategories();
                } else {
                    alert("Access Denied: You do not have the required privileges.");
                    await AuthService.logout();
                    navigate('/login');
                }
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, [navigate]);

    const fetchProducts = async () => {
        const data = await ProductService.getAllProducts();
        setProducts(data);
    };

    const fetchCategories = async () => {
        const managed = await ProductService.getManagedCategories();

        // Default categories to ensure they are always available options
        const defaultCats = [
            "PABX",
            "Telephone",
            "Nurse Call",
            "Voice Logger",
            "Voice Gateway",
            "GPON"
        ];

        // Merge managed (objects) with defaults (strings)
        // If a managed category has the same title as a default, prefer the managed one (it has info)
        const merged = [...managed];
        defaultCats.forEach(defTitle => {
            if (!merged.find(m => m.title === defTitle)) {
                merged.push({ title: defTitle, id: defTitle, isDefault: true });
            }
        });

        setCategories(merged);
    };

    // --- Category Handlers ---
    const handleCategoryEdit = (category) => {
        setEditingCategory(category);
        setViewMode('form');
    };

    const handleCategoryDelete = async (id) => {
        if (window.confirm("Are you sure? This will not delete products, but they will be uncategorized.")) {
            await ProductService.deleteCategory(id);
            fetchCategories();
        }
    };

    const handleCategorySaved = () => {
        setViewMode('list');
        setEditingCategory(null);
        fetchCategories();
    };

    const handleAddNewCategory = () => {
        setEditingCategory(null);
        setViewMode('form');
    };

    const resetForm = () => {
        setFormData(initialFormState);
        setMessage('');
        const fileInput = document.getElementById('file-input');
        if (fileInput) fileInput.value = '';
        const specInput = document.getElementById('spec-input');
        if (specInput) specInput.value = '';
    };

    const handleEdit = (product) => {
        setActiveTab('add');
        setFormData({
            editId: product.id,
            name: product.name,
            description: product.description,
            category: product.category,
            images: [],
            existingImages: product.images || [],
            specSheet: null,
            existingSpecSheet: product.specSheetUrl || '',
            features: product.features || [],
            newFeature: ''
        });
        window.scrollTo(0, 0);
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await ProductService.deleteProduct(id);
                toast.success('Product deleted successfully!');
                fetchProducts();
            } catch (error) {
                console.error('Delete failed:', error);
                toast.error('Failed to delete product.');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);
        setMessage('');

        const { editId, name, description, category, images, existingImages, features, specSheet, existingSpecSheet, manualSpecSheet } = formData;

        try {
            // 1. Upload New Images (if any)
            let newImageUrls = [];
            if (images.length > 0) {
                // Separate 'File' objects from 'String' (manual URLs)
                const filesToUpload = images.filter(img => img instanceof File); // or check typeof img !== 'string'
                const manualUrls = images.filter(img => typeof img === 'string');

                let uploadedUrls = [];
                try {
                    uploadedUrls = await Promise.all(
                        filesToUpload.map(img => ProductService.uploadImage(img))
                    );
                } catch (uploadErr) {
                    console.error("Image upload failed (CORS/Billing):", uploadErr);
                    // Warn the user explicitly that the file was skipped
                    alert("Warning: Image file upload failed (likely CORS or Billing). The product will be saved with your Manual Links only.");
                }

                newImageUrls = [...uploadedUrls, ...manualUrls];
            }

            // Combine with existing images if editing
            const finalImages = [...existingImages, ...newImageUrls];

            // 1b. Upload Spec Sheet (if present)
            // Prioritize: 1. New File Upload (handled below), 2. New Manual URL, 3. Existing URL
            let specSheetUrl = manualSpecSheet ? convertGoogleDrivePdfLink(manualSpecSheet) : existingSpecSheet;
            if (specSheet) {
                try {
                    specSheetUrl = await ProductService.uploadFile(specSheet, 'spec-sheets');
                } catch (specError) {
                    console.error("Spec sheet upload failed (billing/permission):", specError);
                    alert("Warning: Spec sheet could not be uploaded (likely billing limits). The product will be saved without it.");
                    specSheetUrl = ''; // Fail gracefully
                }
            }

            // 2. Create Product Object
            const productData = {
                name,
                description,
                category,
                images: finalImages,
                image: finalImages[0] || '', // Main image
                features,
                specSheetUrl,
                updatedAt: new Date()
            };

            if (!editId) {
                productData.createdAt = new Date();
            }

            // 3. Save to Firestore
            if (editId) {
                await ProductService.updateProduct(editId, productData);
                toast.success('Product updated successfully!');
            } else {
                await ProductService.addProduct(productData);
                toast.success('Product created successfully!');
            }

            resetForm();
            fetchProducts();
        } catch (error) {
            console.error('Operation failed:', error);
            toast.error('Failed to save product. Check console.');
        } finally {
            setUploading(false);
        }
    };

    const handleLogout = async () => {
        await AuthService.logout();
        navigate('/login');
    };

    const handleTabChange = (tab) => {
        if (tab === 'add' && activeTab !== 'add') {
            resetForm();
        }
        setActiveTab(tab);
    }

    if (loading) return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-50">
            <PuffLoader color="#2563eb" size={60} speedMultiplier={0.8} />
            <span className="mt-4 text-gray-500 text-sm font-medium">Loading Admin Panel...</span>
        </div>
    );
    if (!user) return null;

    // Use managed categories for dropdown, fall back to simple list
    // If managed categories exist, map them to titles.
    // If NOT, use existing methods or fallback.
    const categoryOptions = categories.length > 0
        ? categories.map(c => c.title)
        : Object.keys(productData);

    return (
        <div className="flex min-h-screen bg-[#f5f5f7] font-sans">
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 3000,
                    style: {
                        background: '#fff',
                        color: '#1f2937',
                        border: '1px solid #e5e7eb',
                        padding: '16px',
                        borderRadius: '12px',
                        fontSize: '14px',
                    },
                    success: {
                        iconTheme: {
                            primary: '#10b981',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />

            {/* Sidebar */}
            <AdminSidebar
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                onLogout={handleLogout}
                user={user}
            />

            {/* Main Content */}
            <main className="flex-grow flex flex-col">
                <div className="max-w-[1400px] w-full mx-auto p-8 lg:p-12">
                    <header className="mb-10">
                        <h1 className="text-3xl font-bold text-[#1d1d1f] tracking-tight">
                            {activeTab === 'dashboard' && 'Dashboard'}
                            {activeTab === 'add' && (formData.editId ? 'Edit Product' : 'Add New Product')}
                            {activeTab === 'manage' && 'Manage Products'}
                            {activeTab === 'categories' && 'Manage Categories'}
                            {activeTab === 'categories' && 'Manage Categories'}
                            {activeTab === 'contacts' && 'Contact Submissions'}
                            {activeTab === 'licenses' && 'License Generator'}
                        </h1>
                        <p className="text-[#86868b] mt-2">
                            {activeTab === 'dashboard' && 'Overview of your product catalog and analytics.'}
                            {activeTab === 'add' && 'Fill in the details below to add or update a product in your catalog.'}
                            {activeTab === 'manage' && 'View, edit, or delete existing products from your catalog.'}
                            {activeTab === 'categories' && 'Create and customize product categories with icons and backgrounds.'}
                            {activeTab === 'contacts' && 'View and manage customer inquiries from the contact form.'}
                            {activeTab === 'licenses' && 'Generate and manage activation codes for the Billing System.'}
                        </p>
                    </header>

                    {message && (
                        <div className={`p-4 rounded-lg mb-8 flex items-center gap-2 border ${message.includes('success') ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'}`}>
                            {message.includes('success') && <span>✓</span>}
                            {message}
                        </div>
                    )}

                    {activeTab === 'dashboard' && (
                        <AdminDashboard products={products} categories={categories} />
                    )}

                    {activeTab === 'add' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                            {/* Left: Form */}
                            <AdminProductForm
                                onSubmit={handleSubmit}
                                uploading={uploading}
                                formData={formData}
                                setFormData={setFormData}
                                categories={categoryOptions}
                                resetForm={resetForm}
                            />

                            {/* Right: Live Preview */}
                            <div>
                                <AdminLivePreview
                                    name={formData.name}
                                    description={formData.description}
                                    images={formData.images}
                                    existingImages={formData.existingImages}
                                    features={formData.features}
                                    specSheet={formData.specSheet}
                                    existingSpecSheet={formData.existingSpecSheet}
                                    manualSpecSheet={formData.manualSpecSheet}
                                />
                            </div>
                        </div>
                    )}

                    {activeTab === 'manage' && (
                        <AdminProductList
                            products={products}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    )}

                    {activeTab === 'categories' && (
                        <div>
                            {viewMode === 'list' ? (
                                <AdminCategoryList
                                    categories={categories}
                                    onEdit={handleCategoryEdit}
                                    onDelete={handleCategoryDelete}
                                    onAddNew={handleAddNewCategory}
                                />
                            ) : (
                                <div className="flex justify-center">
                                    <AdminCategoryForm
                                        onSaved={handleCategorySaved}
                                        onCancel={() => setViewMode('list')}
                                        editData={editingCategory}
                                    />
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'contacts' && (
                        <AdminContactList />
                    )}

                    {activeTab === 'licenses' && (
                        <AdminLicenseGenerator />
                    )}
                </div>
            </main>
        </div>
    );
}
