import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Home } from './Home';
import { NotFound } from './component/NotFound.jsx';
import { SingUp } from './SingUp.jsx';
import { RoutePath } from './RoutePath.jsx';


export const Router = () => (

    <Routes>
        <Route path={RoutePath.HOME} element={<Home />} />
        <Route path={RoutePath.SIGN_UP} element={<SingUp />} />
        <Route path="*" element={<NotFound />} />


    </Routes>

);
