import React, { useState, useEffect } from 'react';
import authService from '../Appwrite/auth';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react'; // Assuming you can install lucide-react for modern icons

function Logout() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoading(true);
        setError(null);

        async function loggingOut() {
            try {
                await authService.logoutAccount();
                console.log('Logging Out...');
                window.location.reload();
                navigate('/');
            } catch (err) {
                console.error('Logout Error:', err);
                setError('Failed to log out. Please try again.');
            } finally {
                setLoading(false);
            }
        }

        loggingOut();
    }, [navigate]);

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            {loading ? (
                <div className="flex flex-col items-center space-y-4">
                    <Loader2 className="animate-spin text-blue-600" size={48} />
                    <p className="text-gray-700 text-lg font-semibold">Logging you out...</p>
                </div>
            ) : error ? (
                <div className="flex flex-col items-center space-y-4">
                    <p className="text-red-500 text-lg font-bold">{error}</p>
                    <button
                        onClick={() => navigate('/')}
                        className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                    >
                        Go Home
                    </button>
                </div>
            ) : (
                <p className="text-gray-600">Redirecting...</p>
            )}
        </div>
    );
}

export default Logout;
