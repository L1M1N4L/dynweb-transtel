import { db } from '../firebase';
import { collection, getDocs, doc, getDoc, query, where, addDoc, setDoc, updateDoc, deleteDoc, orderBy } from 'firebase/firestore';
import { productData } from '../data/productData';

// --- In-Memory Cache ---
let productsCache = null;
let managedCategoriesCache = null;

export const ProductService = {
    // --- Managed Categories (New Collection: 'categories') ---

    // Get all managed categories
    getManagedCategories: async () => {
        if (managedCategoriesCache) return managedCategoriesCache;

        try {
            const q = query(collection(db, "categories"), orderBy("title", "asc"));
            const snapshot = await getDocs(q);
            const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            managedCategoriesCache = data;
            return data;
        } catch (error) {
            console.error("Error fetching managed categories:", error);
            return [];
        }
    },

    // Add a new category
    addCategory: async (categoryData) => {
        managedCategoriesCache = null; // Invalidate cache
        return await addDoc(collection(db, "categories"), categoryData);
    },

    // Update a category (Upsert)
    updateCategory: async (id, categoryData) => {
        managedCategoriesCache = null; // Invalidate cache
        await setDoc(doc(db, "categories", id), categoryData, { merge: true });
    },

    // Delete a category
    deleteCategory: async (id) => {
        managedCategoriesCache = null; // Invalidate cache
        await deleteDoc(doc(db, "categories", id));
    },

    // Fetch all unique categories from products OR managed categories
    getAllCategories: async () => {
        // 1. Get hardcoded defaults from productData
        // These are the "Base" categories that should always exist
        const defaultCategories = Object.keys(productData).map(key => ({
            id: key,
            title: productData[key].title,
            image: productData[key].image, // Placeholder from data
            description: productData[key].description
        }));

        // 2. Get managed categories from Firestore (Custom icons/backgrounds)
        const managed = await ProductService.getManagedCategories();

        // 3. Merge: Managed overrides Default (by ID/Title)
        // We iterate over defaults and replace if a managed one exists with matching Title
        // Then we append any *extra* managed categories that aren't in defaults

        const mergedMap = new Map();

        // Seed with defaults
        defaultCategories.forEach(cat => mergedMap.set(cat.title, cat));

        // Override/Add managed
        managed.forEach(cat => {
            // If managed has an image, it overrides the default placeholder
            mergedMap.set(cat.title, { ...mergedMap.get(cat.title), ...cat });
        });

        // Convert Map back to array
        let finalCategories = Array.from(mergedMap.values());

        // 4. (Optional) If we STILL have nothing (no productData?), derive from products
        if (finalCategories.length === 0) {
            try {
                const products = await ProductService.getAllProducts(); // Uses cache
                const categorySet = new Set(products.map(p => p.category).filter(Boolean));
                return Array.from(categorySet).map(catName => {
                    const representativeProduct = products.find(p => p.category === catName);
                    return {
                        id: catName,
                        title: catName,
                        image: representativeProduct?.image || representativeProduct?.images?.[0] || null
                    };
                });
            } catch (error) {
                console.error("Error fetching derived categories:", error);
                return [];
            }
        }

        return finalCategories;
    },

    // Fetch products by category
    getProductsByCategory: async (categoryId) => {
        // Optimization: Use getAllProducts() cache and filter in memory
        try {
            const allProducts = await ProductService.getAllProducts();
            return allProducts.filter(p => p.category === categoryId);
        } catch (error) {
            console.error("Error fetching products by category:", error);
            return [];
        }
    },

    // Fetch single product detail
    getProductById: async (categoryId, productId) => {
        // Optimization: Check cache first
        if (productsCache) {
            const found = productsCache.find(p => p.id === productId);
            if (found) return found;
        }

        try {
            const docRef = doc(db, "products", productId);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                return { id: docSnap.id, ...docSnap.data() };
            }
        } catch (error) {
            console.error("Error fetching product details", error);
        }
        return null;
    },

    // Upload Image/File to Firebase Storage
    uploadFile: async (file, path = 'products') => {
        const { storage } = await import('../firebase');
        const { ref, uploadBytes, getDownloadURL } = await import('firebase/storage');

        const storageRef = ref(storage, `${path}/${Date.now()}_${file.name}`);
        await uploadBytes(storageRef, file);
        return await getDownloadURL(storageRef);
    },

    // Upload Image (Legacy wrapper)
    uploadImage: async (file) => {
        return ProductService.uploadFile(file, 'products');
    },

    // Add Product to Firestore
    addProduct: async (productData) => {
        productsCache = null; // Invalidate cache
        const docRef = await addDoc(collection(db, "products"), productData);
        return docRef.id;
    },

    // Fetch ALL products for Admin List (and now general use via cache)
    getAllProducts: async () => {
        if (productsCache) return productsCache;

        try {
            const querySnapshot = await getDocs(collection(db, "products"));
            const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            productsCache = data;
            return data;
        } catch (error) {
            console.error("Error fetching all products:", error);
            return [];
        }
    },

    // Update Product
    updateProduct: async (id, productData) => {
        productsCache = null; // Invalidate cache
        const productRef = doc(db, "products", id);
        await updateDoc(productRef, productData);
    },

    // Delete Product
    deleteProduct: async (id) => {
        productsCache = null; // Invalidate cache
        const productRef = doc(db, "products", id);
        await deleteDoc(productRef);
    }
};
