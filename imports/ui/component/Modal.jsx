import React, { Fragment } from 'react';
import { Dialog, Transition } from "@headlessui/react";

export const Modal = ({ open, setOpen, title, body, footer, errorMessage }) => {

    return (
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


    )
}