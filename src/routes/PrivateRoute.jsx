import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const location = useLocation();
    const {user, loading} = useAuth();

    if(loading){
        return <span className="loading loading-spinner loading-xl"></span>
    }

    if(!user){
        return <Navigate state={{form : location.pathname}} to="/login"></Navigate>
    }
    return children
};

export default PrivateRoute;