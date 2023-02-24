import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Passwordless } from 'meteor/quave:accounts-passwordless-react';
import { Meteor } from 'meteor/meteor';


export const Access = () => {
    const navigate = useNavigate();
    const loginWithGoogle = () => {
        Meteor.loginWithGoogle({ loginStyle: 'redirect' });
    };

    const onEnterToken = () => {
        navigate('/');
    };

    return (
        <div>
            <Passwordless
                onEnterToken={onEnterToken}
            />
            <button onClick={loginWithGoogle}>
                login With google
            </button>
        </div>
    );
};
