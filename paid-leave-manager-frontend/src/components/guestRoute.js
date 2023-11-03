import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

const GuestRoute = () => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    return isAuthenticated ? <Navigate to="/" replace/> : <Outlet />;
}

export default GuestRoute;