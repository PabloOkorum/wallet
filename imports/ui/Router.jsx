import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './component/NotFound.jsx';
import { Access } from './Access.jsx';
import { RoutePath } from './RoutePath.jsx';
import { ForgotPassword } from './ForgotPassword.jsx';
import { ResetPassword } from './ResetPassword.jsx';


export const Router = () => (

    <Routes>
        <Route path={RoutePath.HOME} element={<Home />} />
        <Route path={RoutePath.ACCESS} element={<Access />} />
        <Route path={RoutePath.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={`${RoutePath.RESET_PASSWORD}/:token`} element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />


    </Routes>

);
