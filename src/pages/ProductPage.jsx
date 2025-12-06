import React from 'react';
import { Outlet } from 'react-router-dom';

export default function ProductPage() {
    return (
        <div className="bg-white min-h-screen">
            <Outlet />
        </div>
    );
}
