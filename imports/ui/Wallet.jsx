import { Meteor } from 'meteor/meteor'
import React from 'react';
import { Modal } from './component/Modal';
import { SelectContact } from './component/SelectContact';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { ContactsCollection } from '../api/ContactsCollection';
import { Loading } from './component/Loading';
import { WalletsCollection } from '../api/WalletCollection';

export const Wallet = () => {

    const isLoadingContacts = useSubscribe('contacts');
    const isLoadingWallets = useSubscribe('wallets');

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
    const [destinationWallet, setAdestinationWallet] = React.useState({});
    const [errormenssage, setErrormenssage] = React.useState("");

    const addTransaction = () => {

        Meteor.call(
            'transactions.insert',
            {
                isTransferring,
                sourceWalletId: wallet._id,
                destinationWalledId: destinationWallet?.walletId || "",
                amount: Number(amount),
            },
            (errorResponse) => {
                if (errorResponse) {
                    setErrormenssage(errorResponse.error);
                } else {
                    setOpen(false);
                    setAdestinationWallet({});
                    setAmount(0);
                    setErrormenssage("");
                }
            }
        )
    }

    if (isLoadingContacts() || isLoadingWallets()) {
        return <Loading />;
    }

    return (
        <>
            <div className="divWallet">
                <form className="fromWallet">
                    <div className="infoWallet">

                        <div className="tituloWallet">
                            Main account
                        </div>

                        <div className="subtituloWallet">
                            Wallet ID:
                        </div>

                        <h1 className="idWallet">
                            {wallet._id}
                        </h1>

                        <div className="balanceWallet">
                            ${wallet.balance} ${wallet.currency}
                        </div>

                    </div>


                    <div className="divBotton">
                        <div className="flex-auto flex space-x-4">

                            <div>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setIsTransferring(false);
                                        setOpen(true);
                                        setErrormenssage("");
                                    }}
                                >
                                    add money

                                </button>

                                <button
                                    type='button'
                                    onClick={() => {
                                        setIsTransferring(true);
                                        setErrormenssage("");
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
                                    setContact={setAdestinationWallet}
                                    contact={destinationWallet}
                                    contacts={contacts}
                                />
                            </div>
                        )}

                        <div>
                            <label htmlFor='amount'>
                                Amount
                            </label>

                            <input
                                type="number"
                                value={amount}
                                min={0}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0.00"
                            >
                            </input>
                        </div>
                    </>
                }
                footer={
                    <button
                        type='button'
                        onClick={addTransaction}
                    >
                        {isTransferring ? "transfer" : "add"}
                    </button>
                }
                errorMessage={errormenssage}

            />

        </>
    )

}