import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

function TopProgressBar() {
    const location = useLocation();
    const [width, setWidth] = useState(0);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        // Start bar on every route change
        setVisible(true);
        setWidth(0);

        const t1 = setTimeout(() => setWidth(40), 50);
        const t2 = setTimeout(() => setWidth(75), 400);
        const t3 = setTimeout(() => setWidth(100), 700);
        const t4 = setTimeout(() => setVisible(false), 950);

        return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, [location.pathname]);

    if (!visible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-[9999] h-[2px] pointer-events-none">
            <div
                className="h-full bg-[#1d1d1f] transition-all ease-out"
                style={{
                    width: `${width}%`,
                    transitionDuration: width === 100 ? '150ms' : '500ms',
                    opacity: width === 100 ? 0 : 1,
                }}
            />
        </div>
    );
}

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-white">
            <TopProgressBar />
            <Navbar />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
