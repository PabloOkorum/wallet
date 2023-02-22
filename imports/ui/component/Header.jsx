import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../RoutePath.jsx';
import { useLoggedUser } from 'meteor/quave:logged-user-react';

export const Headerss = () => {

    const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
    const navigate = useNavigate();

    return (
        <header>
            <div>
                <a onClick={() => navigate(RoutePath.HOME)}>Welcome to wallet!</a>
            </div>
            <div>
                {!isLoadingLoggedUser && !loggedUser && (
                    <button
                        onClick={() => navigate(RoutePath.ACCESS)} >
                        sing up'
                    </button>
                )}

                {!isLoadingLoggedUser && loggedUser && (
                    <button
                        onClick={() => Meteor.logout()} >
                        log out'
                    </button>
                )}
            </div>
        </header>
    );
};
