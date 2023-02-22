import React, { Fragment } from 'react';
import { Transition } from '@headlessui/react';

export const Modal = ({ open, title, body, footer, errorMessage }) => (
        <Transition.Root show={open} as={Fragment}>
            <Transition.Child>
                <div>
                    {title}
                </div>
                <div>
                    {errorMessage && (errorMessage)}
                    {body}
                </div>
                <div>{footer}</div>
            </Transition.Child>
        </Transition.Root>


    );
