import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from './RoutePath.jsx';
import { ErrorAlert } from './component/Error.jsx';

export const Access = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isSignUp, setIsSignUp] = useState(true);

    const showError = (errorResponse) => {
        setError(errorResponse);
        setTimeout(() => {
            setError('');
        }, 3000);
    };

    const singUp = (e) => {
        e.preventDefault();
        Accounts.createUser({ email, password }, (errorResponse) => {
            if (errorResponse) {
                showError(errorResponse);
                // setError(errorResponse);
                return;
            }
            navigate(RoutePath.HOME);
        });
    };


    const singIn = (e) => {
        e.preventDefault();
        Meteor.loginWithPassword(email, password, (errorResponse) => {
            if (errorResponse) {
                setError(errorResponse);
                // eslint-disable-next-line no-console
                console.log('Error  singing in the user');

                return;
            }
            navigate(RoutePath.HOME);
        });
    };

    return (
        <>
            <h3>{isSignUp ? 'Sing up' : 'Sing In'}</h3>
            {error && <ErrorAlert message={error.reason || 'Unknown error'} />}
            <div>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>

            <div>
                {
                    isSignUp &&
                    <button
                        onClick={singUp}
                        type="submit"
                    >
                        sing Up
                    </button>
                }
                {
                    !isSignUp &&
                    <button
                        onClick={singIn}
                        type="submit"
                    >
                        sing In
                    </button>
                }

                <button
                    onClick={() => navigate(RoutePath.HOME)}>
                    Back to home
                </button>

                <div>
                    <a
                        onClick={() => setIsSignUp(!isSignUp)} >
                        {isSignUp ? 'If you already have an account, click here ' : ' If you do not have an account, click here'}
                    </a>
                </div>
                <button
                    onClick={() => navigate(RoutePath.FORGOT_PASSWORD)}>
                    Forgot password
                </button>

            </div>
        </>
    );
};
