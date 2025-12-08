import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';

/**
 * Save contact form submission to Firebase
 * @param {Object} contactData - Contact form data
 * @returns {Promise<string>} Document ID
 */
export const saveContactSubmission = async (contactData) => {
    try {
        const docRef = await addDoc(collection(db, 'contactSubmissions'), {
            ...contactData,
            createdAt: serverTimestamp(),
            status: 'new'
        });
        return docRef.id;
    } catch (error) {
        console.error('Error saving contact submission:', error);
        throw error;
    }
};

/**
 * Get all contact submissions (for admin use)
 * @returns {Promise<Array>} Array of contact submissions
 */
export const getContactSubmissions = async () => {
    try {
        const querySnapshot = await getDocs(
            query(collection(db, 'contactSubmissions'), orderBy('createdAt', 'desc'))
        );
        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Error getting contact submissions:', error);
        throw error;
    }
};
