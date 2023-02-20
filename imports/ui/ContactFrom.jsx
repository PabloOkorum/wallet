import React, { useState } from 'react';
import { Meteor } from "meteor/meteor";
import { ErrorAlert } from './component/Error';
import { SuccesAlert } from './component/SuccesAlert.jsx';
export const ContactFrom = () => {

    //funciones
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imgenUrl, setImgenUrl] = useState("");
    const [walletId, setWalletId] = useState("");
    const [error, setError] = React.useState("");
    const [success, setSuccess] = React.useState("");

    const showError = ({ message }) => {
        setError(message);
        setTimeout(() => {
            setError("");
        }, 3000)
    }

    const saveSuccess = ({ message }) => {

        setSuccess(message);
        setEmail("");
        setName("");
        setImgenUrl("");
        setWalletId("");
        setTimeout(() => {
            setSuccess("");
        }, 3000)

    }

    const saveContact = () => {

        Meteor.call('contacts.insert', { name, email, imgenUrl, walletId }, (errorResponse) => {
            if (errorResponse) {

                showError({ message: errorResponse.error });


            } else {

                saveSuccess({ message: "Contact succes" });

            }

        });

    }

    return (
        <form>
            {error && <ErrorAlert message={error} />}
            {success && <SuccesAlert message={success} />}

            <div>
                <label htmlFor='name'  >
                    name
                </label>
                <input id='name'
                    onChange={(e) => setName(e.target.value)}
                    type="text" value={name} />
            </div>

            <div>
                <label htmlFor='email'>
                    email
                </label>
                <input id='email'
                    onChange={(e) => setEmail(e.target.value)}
                    type="email" value={email} />
            </div>

            <div>
                <label htmlFor='imgenUrl'>
                    imgenUrl
                </label>
                <input id='imgenUrl'
                    onChange={(e) => setImgenUrl(e.target.value)}
                    type="text" value={imgenUrl} />
            </div>

            <div>
                <label htmlFor='walletId'>
                    wallet Id
                </label>
                <input id='walletId'
                    onChange={(e) => setWalletId(e.target.value)}
                    type="text" value={walletId} />
            </div>

            <div>
                <button type='button' onClick={saveContact}> Save contacts</button>
            </div>

        </form>
    )
}