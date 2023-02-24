import React from 'react';
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import { Loading } from './Loading.jsx';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '../RoutePath.jsx';


export const LoggedUserOnly = ({ children }) => {
    const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
    const location = useLocation();

    if (isLoadingLoggedUser) {
        return <Loading />;
    }

    if (!loggedUser) {
        return (
            <Navigate to={RoutePath.ACCESS} state={{ from: location }} replace />
        );
    }

    return children;
};
