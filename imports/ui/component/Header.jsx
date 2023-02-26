import { Meteor } from 'meteor/meteor';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../RoutePath.jsx';
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import Button from '@mui/material/Button';


export const Headerss = () => {
    const { loggedUser, isLoadingLoggedUser } = useLoggedUser();
    const navigate = useNavigate();

    return (
        <header>
            <div>
                <a onClick={() => navigate(RoutePath.HOME)}>

                    Welcome to wallet!

                </a>
            </div>
            <div>
                {!isLoadingLoggedUser && !loggedUser && (
                    <Button
                        color="success"
                        variant="contained"
                        onClick={() => navigate(RoutePath.ACCESS)} >
                        sing up'
                    </Button>
                )}

                {!isLoadingLoggedUser && loggedUser && (
                    <Button
                        color="error"
                        variant="contained"
                        onClick={() => Meteor.logout()} >
                        log out'
                    </Button>
                )}
            </div>
        </header>
    );
};
