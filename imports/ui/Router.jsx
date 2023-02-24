import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './component/NotFound.jsx';
import { Access } from './Access.jsx';
import { RoutePath } from './RoutePath.jsx';

import { LoggedUserOnly } from './component/LoggedUserOnly';
import { AnonymusOnly } from './component/AnonymusOnly';
import { AdminOnly } from './component/AdminOnly.jsx';
import { RemoveTransaction } from './RemoveTransaction.jsx';


export const Router = () => (

    <Routes>
        <Route
            path={RoutePath.HOME}
            element={
                <LoggedUserOnly>
                    <Home />
                </LoggedUserOnly>
            } />
        <Route
            path={RoutePath.ACCESS}
            element={
                <AnonymusOnly>
                    <Access />
                </AnonymusOnly>
            } />
        <Route path="*" element={<NotFound />} />
        <Route
            path={RoutePath.REMOVE_TRANSACTION}
            element={
                <AdminOnly>
                    <RemoveTransaction />
                </AdminOnly>
            } />

    </Routes>

);
