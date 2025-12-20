import React, { useState } from 'react';
import { db } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { Key, Copy, CheckCircle, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLicenseGenerator() {
    const [loading, setLoading] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');
    const [formData, setFormData] = useState({
        days: 365,
        type: 'PRO',
        clientName: ''
    });

    const generateRandomCode = () => {
        const rand1 = Math.random().toString(36).substring(2, 6).toUpperCase();
        const rand2 = Math.random().toString(36).substring(2, 6).toUpperCase();
        return `TR-${rand1}-${rand2}`;
    };

    const handleGenerate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const code = generateRandomCode();

        try {
            const expiryDate = new Date();
            expiryDate.setDate(expiryDate.getDate() + parseInt(formData.days));

            await setDoc(doc(db, 'activation_codes', code), {
                code: code,
                type: formData.type,
                clientName: formData.clientName,
                expiryDate: expiryDate.toISOString(),
                createdAt: new Date().toISOString(),
                used: false,
                machineId: null
            });

            setGeneratedCode(code);
            toast.success('License Generated Successfully!');
        } catch (error) {
            console.error('Error creating license:', error);
            toast.error('Failed to generate license.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedCode);
        toast.success('Code copied to clipboard!');
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-blue-50 rounded-lg">
                            <Key className="w-6 h-6 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-semibold text-gray-800">Generate New License</h2>
                    </div>

                    <form onSubmit={handleGenerate} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Client Name (Optional)
                            </label>
                            <input
                                type="text"
                                value={formData.clientName}
                                onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                placeholder="e.g. Acme Corp"
                                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Duration (Days)
                                </label>
                                <input
                                    type="number"
                                    value={formData.days}
                                    onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    License Type
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="PRO">PRO</option>
                                    <option value="TRIAL">TRIAL</option>
                                    <option value="ENTERPRISE">ENTERPRISE</option>
                                </select>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-all flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate Code'}
                        </button>
                    </form>
                </div>

                {/* Result Section */}
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-blue-500 rounded-full blur-[100px] opacity-20"></div>

                    {generatedCode ? (
                        <div className="animate-in zoom-in duration-300 relative z-10 w-full">
                            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-400" />
                            </div>
                            <h3 className="text-gray-300 font-medium mb-2">Activation Code Ready</h3>
                            <div
                                onClick={copyToClipboard}
                                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 mb-6 cursor-pointer hover:bg-white/15 transition-all group"
                            >
                                <code className="text-3xl font-mono font-bold tracking-wider text-white">
                                    {generatedCode}
                                </code>
                                <div className="flex items-center justify-center gap-2 mt-2 text-sm text-gray-400 group-hover:text-white">
                                    <Copy className="w-4 h-4" />
                                    Click to Copy
                                </div>
                            </div>
                            <div className="text-sm text-gray-400">
                                This code is valid for {formData.days} days.<br />
                                Send it to the client to activate their software.
                            </div>
                        </div>
                    ) : (
                        <div className="relative z-10 opacity-50">
                            <Key className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                            <p className="text-lg">Ready to Generate</p>
                            <p className="text-sm text-gray-500 mt-2">Fill the form and click generate</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
