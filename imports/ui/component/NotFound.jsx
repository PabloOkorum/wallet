import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../RoutePath.jsx';

export const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div>
            <div>
                Page not found
            </div>
            <button onClick={() => navigate(RoutePath.HOME)} type="button">
                Go Home
            </button>
        </div>
    );
};
