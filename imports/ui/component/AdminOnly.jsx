import React, { useEffect, useState } from 'react';
import { Loading } from './Loading.jsx';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from '../RoutePath.jsx';
import { Meteor } from 'meteor/meteor';


export const AdminOnly = ({ children }) => {
    const location = useLocation();
    const [isAdmin, setIsAdmin] = useState();

    useEffect(() => {
        Meteor.call('role.isAdmin', (error, isAdminReturn) => {
            if (error) {
                setIsAdmin(false);
                return;
            }
            setIsAdmin(isAdminReturn);
        });
    }, []);

    if (isAdmin == null) {
        return <Loading />;
    }

    if (!isAdmin) {
        return (
            <Navigate to={RoutePath.HOME} state={{ from: location }} replace />
        );
    }

    return children;
};
