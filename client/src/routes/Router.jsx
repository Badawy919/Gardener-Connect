import { createBrowserRouter } from 'react-router';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Error from '../pages/Error';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ForgetPassword from '../pages/Auth/ForgetPassword';
import PrivateRoutes from './PrivateRoutes';
import MyProfile from '../pages/Profile/MyProfile';
import UpdateProfile from '../pages/Profile/UpdateProfile';
import Gardeners from '../pages/Gardeners';
import Tips from '../pages/Tips/Tips';
import TipDetails from '../pages/Tips/TipDetails';
import MyTips from '../pages/Tips/MyTips';
import ShareATip from '../pages/Tips/ShareATip';
import UpdateTip from '../pages/Tips/UpdateTip';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>,
            },
            {
                path: "/gardeners",
                element: <Gardeners></Gardeners>,
            },
            {
                path: "/tips",
                element: <Tips></Tips>
            },
            {
                path: "/add-tip",
                element: <PrivateRoutes><ShareATip></ShareATip></PrivateRoutes>
            },
            {
                path: "/tip-details/:id",
                element: <PrivateRoutes><TipDetails></TipDetails></PrivateRoutes>
            },
            {
                path: "/my-tips",
                element: <PrivateRoutes><MyTips></MyTips></PrivateRoutes>
            },
            {
                path: "/my-tips/:id/update",
                element: <PrivateRoutes><UpdateTip></UpdateTip></PrivateRoutes>
            },
            {
                path: '/login',
                element: <Login></Login>,
            },
            {
                path: '/register',
                element: <Register></Register>,
            },
            {
                path: '/forget-password',
                element: <ForgetPassword></ForgetPassword>
            },
            {
                path: '/my-profile',
                element: <PrivateRoutes><MyProfile></MyProfile></PrivateRoutes>
            },
            {
                path: '/update-profile',
                element: <PrivateRoutes><UpdateProfile></UpdateProfile></PrivateRoutes>
            },
        ]
    },
    {
        path: '/*',
        element: <Error></Error>,
    },
])