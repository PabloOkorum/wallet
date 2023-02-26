import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';
import { Alert } from '@mui/material';

export const Modal = ({ open, title, body, footer, errorMessage }) => (
    <Transition.Root show={open} as={Fragment}>
        <Transition.Child>
            <div>
                {title}
            </div>
            <div>
                {errorMessage && (<Alert severity="error">{errorMessage}</Alert>
                )}
                {body}
            </div>
            <div>{footer}</div>
        </Transition.Child>
    </Transition.Root>


);
