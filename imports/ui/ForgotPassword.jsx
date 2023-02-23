import React, { useState } from 'react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from './RoutePath.jsx';
import { ErrorAlert } from './component/Error.jsx';

export const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [error, setError] = useState();

    const forgotPassword = (e) => {
        e.preventDefault();
        Accounts.forgotPassword({ email }, (errorResponse) => {
            if (errorResponse) {
                setError(errorResponse.reason);
                console.log(errorResponse.reason);
                return;
            }
            setEmail('');
        });
    };

    return (
        <>
            <h3>Forgot Password</h3>
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
            </div>

            <div>

                <button
                    onClick={forgotPassword}
                    type="submit"
                >
                    send reset link Password
                </button>

                <button
                    onClick={() => navigate(RoutePath.ACCESS)}>
                    Back to Access
                </button>


            </div>
        </>
    );
};
