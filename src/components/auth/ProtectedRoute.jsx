import { Navigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';

export default function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Subscribe to auth state changes instead of checking once
        const unsubscribe = AuthService.subscribeToAuthChanges(async (user) => {
            try {
                if (!user) {
                    setIsAuthorized(false);
                    setLoading(false);
                    return;
                }

                const isAdmin = await AuthService.checkAdminRole(user.uid);
                setIsAuthorized(isAdmin);
            } catch (error) {
                console.error('Auth check failed:', error);
                setIsAuthorized(false);
            } finally {
                setLoading(false);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    if (loading) {
        return (
            <div className="fixed inset-0 z-50 flex justify-center items-center bg-white">
                <PuffLoader color="#2563eb" size={60} speedMultiplier={0.8} />
            </div>
        );
    }

    if (!isAuthorized) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
