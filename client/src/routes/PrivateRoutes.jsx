import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = use(AuthContext);
    const location = useLocation();
    
    if (loading) {
        return (
            <div className="flex place-content-center items-center h-screen gap-2">
                <span className="loading loading-dots loading-xs text-primary"></span>
                <span className="loading loading-dots loading-sm text-primary"></span>
                <span className="loading loading-dots loading-md text-primary"></span>
                <span className="loading loading-dots loading-lg text-primary"></span>
                <span className="loading loading-dots loading-xl text-primary"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate state={location?.pathname} to='/login' />;
    } else {
        return children;
    }
};

export default PrivateRoutes;