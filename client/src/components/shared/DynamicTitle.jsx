import { use, useEffect } from 'react';
import { useLocation, useParams } from 'react-router';
import { DataContext } from '../../context/DataContext';
import { AuthContext } from '../../context/AuthContext';

const DynamicTitle = () => {
    const { id } = useParams();
    // console.log('id', id);
    const location = useLocation();
    // console.log('location', location);
    const { tips } = use(DataContext)
    // console.log('companies', companies);
    const { user } = use(AuthContext);
    // console.log('user', user.displayName);

    useEffect(() => {
        const currentPath = location.pathname;
        let title = 'Gardener Connect';
        if (currentPath === '/') {
            title = 'Home | Gardener Connect';
        } else if (currentPath === '/register') {
            title = 'Register | Gardener Connect';
        } else if (currentPath === '/login') {
            title = 'Login | Gardener Connect';
        } else if (currentPath === '/forget-password') {
            title = 'Forgot Password | Gardener Connect';
        } else if (currentPath === '/gardeners') {
            title = 'Gardeners | Gardener Connect';
        } else if (currentPath === '/tips') {
            title = 'Tips | Gardener Connect';
        } else if (currentPath === `/tip-details/${id}`) {
            const tip = tips.find(tip => tip._id === id);
            if (tip) {
                title = `${tip.title} | Gardener Connect`;
            }
        } else if (currentPath === '/add-tip') {
            title = 'Share a Tip | Gardener Connect';
        } else if (currentPath === '/my-tips') {
            title = 'My Tips | Gardener Connect';
        } else if (currentPath === `/my-tips/${id}/update`) {
            const tip = tips.find(tip => tip._id === id);
            if (tip) {
                title = `Update Tip: ${tip.title} | Gardener Connect`;
            }
        } else if(currentPath === '/my-profile' || currentPath === '/update-profile') {
            title = `${user?.displayName} | Gardener Connect`;
        } else {
            title = 'Page Not Found | Gardener Connect';
        } 
        document.title = title;
    }, [location.pathname, id, tips, user]);

    return null;
};

export default DynamicTitle;