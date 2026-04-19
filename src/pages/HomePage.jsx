import React, { useState, useEffect } from 'react';
import Hero from '../components/home/Hero';
import { ProductCards, WhyTranstel, StatsStrip, Industries, Clients, BottomCTA } from '../components/home/Sections';
import SEO from '../components/common/SEO';
import { ProductService } from '../services/productService';
import { PuffLoader } from 'react-spinners';

/* Preload an array of image URLs into browser cache */
function preloadImages(urls) {
    return Promise.all(
        urls.map(src => new Promise((resolve) => {
            if (!src) return resolve();
            const img = new Image();
            img.onload = resolve;
            img.onerror = resolve; // don't block on broken images
            img.src = src;
        }))
    );
}

export default function HomePage() {
    const [ready, setReady] = useState(false);

    useEffect(() => {
        const prepare = async () => {
            try {
                const products = await ProductService.getAllProducts();

                // Collect the first image from each category that has products
                const categoryNames = ['PABX', 'Nurse Call', 'Voice Gateway', 'GPON', 'Telephone'];
                const imageUrls = categoryNames.map(cat => {
                    const prod = products.find(p => p.category === cat && (p.images?.length > 0 || p.image));
                    return prod ? (prod.images?.[0] || prod.image) : null;
                }).filter(Boolean);

                await preloadImages(imageUrls);
            } catch (e) {
                console.error('Homepage preload failed:', e);
            }
            setReady(true);
        };

        prepare();
    }, []);

    if (!ready) {
        return (
            <div className="fixed inset-0 z-50 bg-white flex items-center justify-center">
                <PuffLoader color="#1d1d1f" size={60} speedMultiplier={0.8} />
            </div>
        );
    }

    return (
        <div className="animate-fadeIn">
            <SEO
                title="Enterprise Communication Solutions"
                description="Transtel Communications — PABX, Nurse Call, and Voice solutions for modern enterprises."
            />
            <Hero />
            <ProductCards />
            <StatsStrip />
            <WhyTranstel />
            <Industries />
            <Clients />
            <BottomCTA />
        </div>
    );
}
