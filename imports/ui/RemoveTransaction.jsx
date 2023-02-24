import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from './RoutePath.jsx';
import { ErrorAlert } from './component/Error.jsx';
import { Meteor } from 'meteor/meteor';


export const RemoveTransaction = () => {
    const navigate = useNavigate();
    const [transactionId, setTransactionId] = useState('');
    const [error, setError] = useState();

    const removeTransaction = (e) => {
        e.preventDefault();
        Meteor.call('transactions.remove', transactionId, (errorResponse) => {
            if (errorResponse) {
                setError(errorResponse.reason);
                // eslint-disable-next-line no-console
                console.log(errorResponse.reason);
                return;
            }
            setTransactionId('');
            setError(null);
        });
    };

    return (
        <>
            <h3>Remove Transaction</h3>
            {error && <ErrorAlert message={error.reason || 'Unknown error'} />}
            <div>
                <div>
                    <label htmlFor="transactionId">
                    transaction Id
                    </label>
                    <input
                        id="transactionId"
                        value={transactionId}
                        onChange={(e) => setTransactionId(e.target.value)}
                    />
                </div>
            </div>

            <div>

                <button
                    onClick={removeTransaction}
                    type="submit"
                >
                    Remove
                </button>

                <button
                    onClick={() => navigate(RoutePath.HOME)}>
                    Back to home
                </button>


            </div>
        </>
    );
};
