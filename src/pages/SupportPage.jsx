import React from 'react';
import SEO from '../components/common/SEO';

export default function SupportPage() {
    return (
        <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto text-center">
            <SEO
                title="Support Center"
                description="Transtel Communications support center. Get technical assistance for PABX systems, Nurse Call, Voice Loggers, Voice Gateways, GPON, and IP Telephones."
                url="/support"
                keywords="Transtel support, PABX technical support, nurse call support, voice gateway help"
            />
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Support Center</h1>
            <p className="text-xl text-gray-600 mb-12">
                We are here to help you 24/7.
            </p>
            {/* Placeholder content */}
            <div className="p-12 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50">
                <p className="text-gray-500">Support resources coming soon.</p>
            </div>
        </div>
    );
}
