import { auth } from '../firebase';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    setPersistence,
    browserLocalPersistence
} from 'firebase/auth';

export const AuthService = {
    login: async (email, password) => {
        // Set persistence to LOCAL so session persists even after browser close
        await setPersistence(auth, browserLocalPersistence);
        return signInWithEmailAndPassword(auth, email, password);
    },

    loginWithGoogle: async () => {
        // Set persistence to LOCAL so session persists even after browser close
        await setPersistence(auth, browserLocalPersistence);
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    },

    logout: () => {
        return signOut(auth);
    },

    subscribeToAuthChanges: (callback) => {
        return onAuthStateChanged(auth, callback);
    },

    getCurrentUser: () => {
        return auth.currentUser;
    },

    // Check if user has admin or technical role in Firestore
    checkAdminRole: async (uid) => {
        const { db } = await import('../firebase');
        const { doc, getDoc } = await import('firebase/firestore');

        try {
            const userDoc = await getDoc(doc(db, 'users', uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                // Both admin and technical roles have access to administrative features
                return userData.role === 'admin' || userData.role === 'technical';
            }
        } catch (error) {
            console.error("Error checking user role:", error);
        }
        return false;
    }
};
