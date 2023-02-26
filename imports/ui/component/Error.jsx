import { Alert } from '@mui/material';
import React from 'react';

export const ErrorAlert = ({ message }) => (<Alert severity="error">{message}</Alert>);
