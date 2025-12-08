import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { Mail, Phone, Calendar, Trash2, CheckCircle, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

export default function AdminContactList() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, new, responded

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, 'contactSubmissions'), orderBy('createdAt', 'desc'));
            const querySnapshot = await getDocs(q);
            const contactsData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
                createdAt: doc.data().createdAt?.toDate()
            }));
            setContacts(contactsData);
        } catch (error) {
            console.error('Error fetching contacts:', error);
            toast.error('Failed to load contact submissions');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this submission?')) return;

        try {
            await deleteDoc(doc(db, 'contactSubmissions', id));
            setContacts(contacts.filter(c => c.id !== id));
            toast.success('Submission deleted');
        } catch (error) {
            console.error('Error deleting contact:', error);
            toast.error('Failed to delete submission');
        }
    };

    const handleMarkAsResponded = async (id, currentStatus) => {
        try {
            const newStatus = currentStatus === 'responded' ? 'new' : 'responded';
            await updateDoc(doc(db, 'contactSubmissions', id), {
                status: newStatus
            });
            setContacts(contacts.map(c =>
                c.id === id ? { ...c, status: newStatus } : c
            ));
            toast.success(newStatus === 'responded' ? 'Marked as responded' : 'Marked as new');
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        }
    };

    const filteredContacts = contacts.filter(contact => {
        if (filter === 'all') return true;
        return contact.status === filter;
    });

    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Intl.DateTimeFormat('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    const formatPhoneNumber = (countryCode, phone) => {
        if (!phone) return 'N/A';
        // Add + prefix to country code if it doesn't have one
        const formattedCode = countryCode?.startsWith('+') ? countryCode : `+${countryCode}`;
        return `${formattedCode} ${phone}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-semibold text-gray-900">Contact Submissions</h2>
                    <p className="text-gray-600 mt-1">Manage customer inquiries and messages</p>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'all'
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        All ({contacts.length})
                    </button>
                    <button
                        onClick={() => setFilter('new')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'new'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        New ({contacts.filter(c => c.status === 'new').length})
                    </button>
                    <button
                        onClick={() => setFilter('responded')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition ${filter === 'responded'
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                    >
                        Responded ({contacts.filter(c => c.status === 'responded').length})
                    </button>
                </div>
            </div>

            {/* Contact List */}
            {filteredContacts.length === 0 ? (
                <div className="text-center py-16 bg-gray-50 rounded-xl">
                    <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No contact submissions yet</p>
                </div>
            ) : (
                <div className="space-y-4">
                    {filteredContacts.map((contact) => (
                        <div
                            key={contact.id}
                            className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-3 mb-2">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {contact.fullName || `${contact.firstName} ${contact.lastName}`}
                                        </h3>
                                        {contact.status === 'new' ? (
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full flex items-center gap-1">
                                                <Clock className="w-3 h-3" />
                                                New
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full flex items-center gap-1">
                                                <CheckCircle className="w-3 h-3" />
                                                Responded
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <a
                                            href={`mailto:${contact.email}`}
                                            className="flex items-center gap-2 hover:text-blue-600 transition"
                                        >
                                            <Mail className="w-4 h-4" />
                                            {contact.email}
                                        </a>
                                        <a
                                            href={`tel:${contact.phone}`}
                                            className="flex items-center gap-2 hover:text-blue-600 transition"
                                        >
                                            <Phone className="w-4 h-4" />
                                            {formatPhoneNumber(contact.countryCode, contact.phone)}
                                        </a>
                                        <span className="flex items-center gap-2 text-gray-500">
                                            <Calendar className="w-4 h-4" />
                                            {formatDate(contact.createdAt)}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => handleMarkAsResponded(contact.id, contact.status)}
                                        className={`p-2 rounded-lg transition ${contact.status === 'responded'
                                            ? 'bg-green-100 text-green-600 hover:bg-green-200'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                        title={contact.status === 'responded' ? 'Mark as new' : 'Mark as responded'}
                                    >
                                        <CheckCircle className="w-5 h-5" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(contact.id)}
                                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                                        title="Delete submission"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                            <div className="bg-gray-50 rounded-lg p-4">
                                <p className="text-sm font-medium text-gray-700 mb-2">Message:</p>
                                <p className="text-gray-600 whitespace-pre-wrap">{contact.message}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
