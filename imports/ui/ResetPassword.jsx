import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from './RoutePath.jsx';
import { ErrorAlert } from './component/Error.jsx';

export const ResetPassword = () => {
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const { token } = useParams();

    const resetPassword = (e) => {
        e.preventDefault();
        Accounts.resetPassword(token, password, (errorResponse) => {
            if (errorResponse) {
                setError(errorResponse.reason);
                // eslint-disable-next-line no-console
                console.log(errorResponse.reason);
                return;
            }
            setPassword('');
            setError(null);
            navigate(RoutePath.ACCESS);
        });
    };

    return (
        <>
            <h3>Reset your Password</h3>
            {error && <ErrorAlert message={error.reason || 'Unknown error'} />}
            <div>
                <div>
                    <label htmlFor="password">
                        password
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

                <button
                    onClick={resetPassword}
                    type="submit"
                >
                    submit
                </button>

                <button
                    onClick={() => navigate(RoutePath.HOME)}>
                    Back to home
                </button>


            </div>
        </>
    );
};
