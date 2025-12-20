import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { doc, setDoc, collection, query, orderBy, getDocs } from 'firebase/firestore';
import { Key, Copy, CheckCircle, Loader2, Sparkles, User, Calendar, Shield, Clock, Search, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminLicenseGenerator() {
    const [loading, setLoading] = useState(false);
    const [generatedCode, setGeneratedCode] = useState('');
    const [licenses, setLicenses] = useState([]);
    const [loadingList, setLoadingList] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    const [formData, setFormData] = useState({
        days: 365,
        type: 'PRO',
        clientName: ''
    });

    useEffect(() => {
        fetchLicenses();
    }, []);

    const fetchLicenses = async () => {
        setLoadingList(true);
        try {
            const q = query(collection(db, 'activation_codes'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const list = [];
            querySnapshot.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            setLicenses(list);
        } catch (error) {
            console.error("Error fetching licenses:", error);
            toast.error("Could not load license history");
        } finally {
            setLoadingList(false);
        }
    };

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
            fetchLicenses(); // Refresh list
        } catch (error) {
            console.error('Error creating license:', error);
            toast.error('Failed to generate license.');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Code copied!');
    };

    const handleReset = () => {
        setGeneratedCode('');
        setFormData(prev => ({ ...prev, clientName: '' }));
    };

    const filteredLicenses = licenses.filter(l =>
        l.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (l.clientName && l.clientName.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            {/* Generator Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md">
                <div className="border-b border-gray-100 p-8 bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center shadow-lg shadow-gray-900/20">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">License Generator</h2>
                            <p className="text-sm text-gray-500">Create new activation keys for clients</p>
                        </div>
                    </div>
                </div>

                <div className="p-8">
                    {!generatedCode ? (
                        <form onSubmit={handleGenerate} className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
                            <div className="lg:col-span-4">
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <User className="w-3 h-3" /> Client Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.clientName}
                                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                                    placeholder="e.g. Acme Corp"
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                />
                            </div>
                            <div className="lg:col-span-3">
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Calendar className="w-3 h-3" /> Duration (Days)
                                </label>
                                <input
                                    type="number"
                                    value={formData.days}
                                    onChange={(e) => setFormData({ ...formData, days: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium"
                                />
                            </div>
                            <div className="lg:col-span-3">
                                <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                                    <Shield className="w-3 h-3" /> Type
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all font-medium cursor-pointer"
                                >
                                    <option value="PRO">PRO</option>
                                    <option value="TRIAL">TRIAL</option>
                                    <option value="ENTERPRISE">ENTERPRISE</option>
                                </select>
                            </div>
                            <div className="lg:col-span-2">
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2"
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Generate'}
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="flex flex-col md:flex-row items-center gap-8 animate-in fade-in zoom-in duration-300">
                            <div className="flex-1 w-full">
                                <h3 className="text-lg font-bold text-gray-900 mb-1">Success!</h3>
                                <p className="text-gray-500 text-sm">License key generated successfully.</p>
                            </div>
                            <div
                                onClick={() => copyToClipboard(generatedCode)}
                                className="flex-1 w-full bg-green-50 border border-green-100 rounded-xl p-4 flex items-center justify-between cursor-pointer hover:bg-green-100 transition-colors group"
                            >
                                <code className="text-2xl font-mono font-bold text-green-700 tracking-wider">
                                    {generatedCode}
                                </code>
                                <Copy className="w-5 h-5 text-green-500 group-hover:text-green-700" />
                            </div>
                            <div>
                                <button
                                    onClick={handleReset}
                                    className="text-gray-500 hover:text-gray-900 font-medium text-sm px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-2"
                                >
                                    <RefreshCw className="w-4 h-4" /> Create Another
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* List Section */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Key className="w-5 h-5 text-gray-400" /> License History
                    </h3>
                    <div className="relative">
                        <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                            type="text"
                            placeholder="Search licenses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-white border border-gray-200 rounded-full pl-9 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 shadow-sm"
                        />
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/80 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500">
                                    <th className="px-8 py-4 font-semibold">License Code</th>
                                    <th className="px-6 py-4 font-semibold">Client</th>
                                    <th className="px-6 py-4 font-semibold">Details</th>
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                    <th className="px-6 py-4 font-semibold">Created</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {loadingList ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-12 text-center text-gray-500">
                                            <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                                            Loading history...
                                        </td>
                                    </tr>
                                ) : filteredLicenses.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-8 py-12 text-center text-gray-500">
                                            No licenses found. Generate one above!
                                        </td>
                                    </tr>
                                ) : (
                                    filteredLicenses.map((lic) => (
                                        <tr key={lic.id} className="hover:bg-gray-50/50 transition-colors group">
                                            <td className="px-8 py-4">
                                                <code className="font-mono font-bold text-gray-700 bg-gray-100 px-2 py-1 rounded-md text-sm">
                                                    {lic.code}
                                                </code>
                                            </td>
                                            <td className="px-6 py-4">
                                                {lic.clientName ? (
                                                    <span className="font-medium text-gray-900">{lic.clientName}</span>
                                                ) : (
                                                    <span className="text-gray-400 italic">Unknown</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="text-xs font-bold text-gray-500 uppercase">{lic.type}</span>
                                                    <span className="text-xs text-gray-400">Exp: {new Date(lic.expiryDate).toLocaleDateString()}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                {lic.used ? (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700 border border-green-100">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                        Unused
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-500">
                                                {new Date(lic.createdAt).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => copyToClipboard(lic.code)}
                                                    className="p-2 hover:bg-gray-200 rounded-lg text-gray-400 hover:text-gray-600 transition-colors"
                                                    title="Copy Code"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}
