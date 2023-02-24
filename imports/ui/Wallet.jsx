import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Modal } from './component/Modal.jsx';
import { SelectContact } from './component/SelectContact.jsx';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { Loading } from './component/Loading.jsx';
import { WalletsCollection } from '../api/collections/WalletsCollection';
import { ContactsCollection } from '../api/collections/ContactsCollection';
import { useLoggedUser } from 'meteor/quave:logged-user-react';


export const Wallet = () => {
    const { loggedUser } = useLoggedUser();
    const isLoadingContacts = useSubscribe('myContacts');
    const isLoadingWallets = useSubscribe('myWallets');

    const contacts = useFind(() =>
        ContactsCollection.find(
            { archived: { $ne: true } },
            { sort: { CreatedAt: -1 } }
        )
    );

    const [wallet] = useFind(() => WalletsCollection.find());
    const [open, setOpen] = React.useState(false);
    const [isTransferring, setIsTransferring] = React.useState(false);
    const [amount, setAmount] = React.useState(0);
    const [destinationContacs, setAdestinationContacs] = React.useState({});
    const [errormenssage, setErrormenssage] = React.useState('');

    const addTransaction = () => {
        Meteor.call(
            'transactions.insert',
            {
                isTransferring,
                sourceWalletId: wallet._id,
                destinationContacsId: destinationContacs?.walletId || '',
                amount: Number(amount),
            },
            (errorResponse) => {
                if (errorResponse) {
                    // eslint-disable-next-line no-unused-expressions
                    errorResponse.details?.forEach((error) => {
                        setErrormenssage(error.message);
                    });
                } else {
                    setOpen(false);
                    setAdestinationContacs({});
                    setAmount(0);
                    setErrormenssage('');
                }
            }
        );
    };

    if (isLoadingContacts() || isLoadingWallets()) {
        return <Loading />;
    }


    const email = () => {
        if (Array.isArray(loggedUser?.email)) {
            return loggedUser.email[0].address;
        }
        return loggedUser?.email || '';
    };

    return (
        <>
            <div className="divWallet">
                <form className="fromWallet">
                    <div className="infoWallet">

                        <div className="tituloWallet">
                            Main account
                        </div>
                        <div className="subtituloWallet">
                            EMAIL:
                        </div>

                        <h1 className="idWallet">
                            {email()}
                        </h1>
                        <div className="subtituloWallet">
                            Wallet ID:
                        </div>

                        <h1 className="idWallet">
                            {wallet?._id}
                        </h1>

                        <div className="balanceWallet">
                            ${wallet.balance} ${wallet.currency}
                        </div>

                    </div>


                    <div className="divBotton">
                        <div className="flex-auto flex space-x-4">

                            <div>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsTransferring(false);
                                        setOpen(true);
                                        setErrormenssage('');
                                    }}
                                >
                                    add money

                                </button>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsTransferring(true);
                                        setErrormenssage('');
                                        setOpen(true);
                                    }}
                                >
                                    Transfer money
                                </button>
                            </div>

                        </div>
                    </div>

                </form>
            </div>

            <Modal
                open={open}
                setOpen={setOpen}
                title={
                    isTransferring ? 'Transfer money to other wallet' : 'Add money to your wallet'
                }
                body={
                    <>

                        {isTransferring && (
                            <div>
                                <SelectContact
                                    title="Destination Contact"
                                    setContact={setAdestinationContacs}
                                    contact={destinationContacs}
                                    contacts={contacts}
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor="amount">
                                Amount
                            </label>

                            <input
                                type="number"
                                value={amount}
                                min={0}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                            />
                        </div>
                    </>
                }
                footer={
                    <button
                        type="button"
                        onClick={addTransaction}
                    >
                        {isTransferring ? 'transfer' : 'add'}
                    </button>
                }
                errorMessage={errormenssage}

            />

        </>
    );
};
