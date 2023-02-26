import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Passwordless } from 'meteor/quave:accounts-passwordless-react';
import { Meteor } from 'meteor/meteor';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';


export const Access = () => {
    const navigate = useNavigate();
    const loginWithGoogle = () => {
        Meteor.loginWithGoogle({ loginStyle: 'redirect' });
    };

    const onEnterToken = () => {
        navigate('/');
    };

    return (

        <Container
            component="main"
            maxWidth="xs"
        >
            <Typography component="h1" variant="h5">
                <Link variant="body2">

                    <Passwordless
                        color="success"
                        fullWidth
                        autoFocus
                        onEnterToken={onEnterToken}
                    />

                </Link>
            </Typography>
            <Button
                color="success"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={loginWithGoogle}>
                login With google
            </Button>
        </Container>

    );
};
