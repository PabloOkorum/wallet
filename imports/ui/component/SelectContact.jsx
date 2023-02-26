import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export const SelectContact = ({ title, setContact, contact, contacts }) => (
    <Listbox value={contact} onChange={setContact}>
        {({ open }) => (
            <>
                <Listbox.Label className="block text-sm font-medium text-gray-700">
                    {title}
                </Listbox.Label>
                <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm">
                        <span className="flex items-center">
                            {contact?.imageUrl && (<img
                                src={contact.imageUrl}
                                alt=""
                                className="h-6 w-6 flex-shrink-0 rounded-full"
                            />)}

                            <span className="ml-3 block truncate">
                                {contact?.name || 'Select a contact'}
                            </span>

                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2" />
                    </Listbox.Button>

                    <Transition
                        show={open}
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {!contacts.length && (

                                <Listbox.Option
                                    className={
                                        classNames(
                                            'text-gray-900',
                                            'relative cursor-default select-none py-2 pl-3 pr-9'
                                        )
                                    }
                                    disabled
                                >
                                    <div className="flex items-center">

                                        <span
                                            className={classNames(
                                                'font-normal', 'ml-3 block truncate')}
                                        >
                                            no contact found
                                        </span>
                                    </div>
                                </Listbox.Option>
                            )}

                            {contacts.map((contact) => (
                                <Listbox.Option
                                    key={contact._id}
                                    className={({ active }) =>
                                        classNames(
                                            active ? 'text-white bg-indigo-600' : 'text-gray-900',
                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                        )
                                    }
                                    value={contact}
                                >
                                    {({ selected }) => (
                                        <>
                                            <div className="flex items-center">
                                                {contact.imageUrl && (<img
                                                    src={contact.imageUrl}
                                                    alt=""
                                                    className="h-6 w-6 flex-shrink-0 rounded-full"
                                                />)}
                                                <span
                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                >
                                                    {contact.name}
                                                </span>
                                            </div>

                                        </>
                                    )}
                                </Listbox.Option>
                            ))}

                        </Listbox.Options>
                    </Transition>
                </div>
            </>
        )}
    </Listbox>
);
