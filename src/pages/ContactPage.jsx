import React from 'react';

export default function ContactPage() {
    return (
        <div className="pt-32 pb-16 px-6 max-w-7xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
                <p className="text-xl text-gray-600">
                    Get in touch with our team for any inquiries.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {/* Contact Info */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-semibold mb-4">Office Info</h2>
                    <p className="flex items-start">
                        <span className="font-semibold w-24">Phone:</span>
                        <span className="text-gray-600">+1 (561) 747-4466</span>
                    </p>
                    <p className="flex items-start">
                        <span className="font-semibold w-24">Address:</span>
                        <span className="text-gray-600">1562 Park Ln S<br />Jupiter, FL 33458<br />United States</span>
                    </p>
                </div>

                {/* Placeholder Form */}
                <div className="bg-gray-50 p-8 rounded-xl">
                    <h2 className="text-2xl font-semibold mb-6">Send a Message</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input type="text" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Your name" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input type="email" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="your@email.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                            <textarea className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-32" placeholder="How can we help?"></textarea>
                        </div>
                        <button className="w-full bg-blue-600 text-white font-medium py-3 rounded-lg hover:bg-blue-700 transition">
                            Send Message
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
