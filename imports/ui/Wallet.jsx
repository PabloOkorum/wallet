import { Meteor } from 'meteor/meteor';
import React from 'react';
import { Modal } from './component/Modal.jsx';
import { SelectContact } from './component/SelectContact.jsx';
import { useSubscribe, useFind } from 'meteor/react-meteor-data';
import { Loading } from './component/Loading.jsx';
import { WalletsCollection } from '../api/collections/WalletsCollection';
import { ContactsCollection } from '../api/collections/ContactsCollection';
import { useLoggedUser } from 'meteor/quave:logged-user-react';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Box, ButtonGroup, TextField } from '@mui/material';


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
        <Container
            component="main"
            maxWidth="xs"
        >
            <Box
                sx={{
                    p: 2,
                    border: '1px dashed grey',
                }}
            >

                <div className="divWallet">
                    <form className="fromWallet">
                        <div className="infoWallet">

                            <h1>
                                Main account
                            </h1>
                            <dr />
                            <dr />
                            <div className="subtituloWallet">
                                <h2>
                                    EMAIL:
                                </h2>

                                <h3 className="idWallet">
                                    {email()}
                                </h3>
                            </div>
                            <div className="subtituloWallet">
                                <h2>
                                    Wallet ID:
                                </h2>

                                <h3 className="idWallet">
                                    {wallet?._id}
                                </h3>
                            </div>

                            <div className="balanceWallet">
                                <h2>
                                    ${wallet.balance}
                                    ${wallet.currency}
                                </h2>
                            </div>

                        </div>
                        <br />

                        <div className="divBotton">
                            <div className="flex-auto flex space-x-4">

                                <ButtonGroup
                                    variant="text"
                                    aria-label="text button group"
                                >

                                    <Button
                                        color="success"
                                        onClick={() => {
                                            setIsTransferring(false);
                                            setOpen(true);
                                            setErrormenssage('');
                                        }}
                                    >
                                        add money

                                    </Button>

                                    <Button
                                        color="success"
                                        onClick={() => {
                                            setIsTransferring(true);
                                            setErrormenssage('');
                                            setOpen(true);
                                        }}
                                    >
                                        Transfer money
                                    </Button>
                                </ButtonGroup>

                            </div>
                        </div>

                    </form>
                </div >

                <Modal
                    open={open}
                    setOpen={setOpen}
                    title={
                        <h1>
                            <React.Fragment>
                                {isTransferring ? 'Transfer money to other wallet' : 'Add money to your wallet'}
                            </React.Fragment>
                        </h1>
                    }
                    body={
                        <>
                            <br />
                            {isTransferring && (
                                <div>
                                    <h3>Destination Contact</h3>
                                    <SelectContact
                                        title=""
                                        setContact={setAdestinationContacs}
                                        contact={destinationContacs}
                                        contacts={contacts}
                                    />
                                </div>
                            )}

                            <div>

                                <TextField
                                    sx={{ mr: 5 }}
                                    label="Amount"
                                    variant="standard"
                                    type="number"
                                    value={amount}
                                    min={0}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                />
                            </div>
                            <br />
                        </>
                    }
                    footer={
                        <Button
                            variant="contained"
                            color="success"
                            size="small"
                            type="button"
                            onClick={addTransaction}
                        >
                            {isTransferring ? 'transfer' : 'add'}
                        </Button>
                    }
                    errorMessage={errormenssage}

                />
            </Box>
        </Container >
    );
};
