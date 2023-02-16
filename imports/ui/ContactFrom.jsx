import React, { useState } from 'react';
import { Meteor } from "meteor/meteor";
export const ContactFrom = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [imgenUrl, setImgenUrl] = useState("");

    const saveContact = () => {

        Meteor.call('contacts.insert', { name, email, imgenUrl }, (errorResponse) => {
            if (errorResponse) {
                alert(errorResponse.error);
                console.log(errorResponse.error);
            } else {
                setEmail("");
                setName("");
                setImgenUrl("");
            }

        });
    
    }

    return (
        <form>
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
                <button type='button' onClick={saveContact}> Save contacts</button>
            </div>

        </form>
    )
}