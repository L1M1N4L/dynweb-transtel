import { Navigate } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import { useEffect, useState } from 'react';
import { PuffLoader } from 'react-spinners';

export default function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const user = AuthService.getCurrentUser();

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
        };

        checkAuth();
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
