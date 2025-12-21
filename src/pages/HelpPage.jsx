import React from 'react';
import { HelpCircle, Book, MessageCircle, Search, FileText } from 'lucide-react';

export default function HelpPage() {
    return (
        <div className="pt-32 pb-16 px-6 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Help Center</h1>
                <p className="text-lg text-gray-600">
                    Find answers to common questions and get support
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                        <Book className="w-6 h-6 text-blue-600 mr-3" />
                        <h2 className="text-xl font-semibold text-gray-900">Documentation</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Browse our comprehensive documentation and guides.
                    </p>
                    <a href="/support" className="text-blue-600 hover:text-blue-700 font-medium">
                        View Documentation →
                    </a>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                        <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
                        <h2 className="text-xl font-semibold text-gray-900">Contact Support</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Get in touch with our support team for assistance.
                    </p>
                    <a href="/contact" className="text-blue-600 hover:text-blue-700 font-medium">
                        Contact Us →
                    </a>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                        <Search className="w-6 h-6 text-blue-600 mr-3" />
                        <h2 className="text-xl font-semibold text-gray-900">Search Issues</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Search for solutions to common problems.
                    </p>
                    <a href="/support" className="text-blue-600 hover:text-blue-700 font-medium">
                        Search →
                    </a>
                </div>

                <div className="p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                        <FileText className="w-6 h-6 text-blue-600 mr-3" />
                        <h2 className="text-xl font-semibold text-gray-900">FAQs</h2>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Find answers to frequently asked questions.
                    </p>
                    <a href="/support" className="text-blue-600 hover:text-blue-700 font-medium">
                        View FAQs →
                    </a>
                </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-8 text-center">
                <HelpCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Still need help?</h3>
                <p className="text-gray-600 mb-6">
                    Our support team is here to assist you. Reach out and we'll get back to you as soon as possible.
                </p>
                <a
                    href="/contact"
                    className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-full hover:bg-blue-700 transition-colors"
                >
                    Get Support
                </a>
            </div>
        </div>
    );
}

