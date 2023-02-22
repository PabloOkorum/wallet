import React, { useState } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from './RoutePath.jsx';
import { ErrorAlert } from './component/Error.jsx';

export const SingUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState();
    const singUp = (e) => {
        e.preventDefault();
        Accounts.createUser({ email, password }, (errorResponse) => {
            if (errorResponse) {
                setError(errorResponse);
                return;
            }
            navigate(RoutePath.HOME);
        });
    };

    return (
        <>
        {error && <ErrorAlert message={error.reason || 'Unknown error'}/>}
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
                <button
                 onClick={singUp}
                 type="submit"
                 >
                    submit
                </button>
                <button onClick={() => navigate(RoutePath.HOME)}>
                    Back to home
                </button>
            </div>
        </>
    );
};
