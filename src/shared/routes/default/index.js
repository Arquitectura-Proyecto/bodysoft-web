import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import LandingPage from "../../../ui/authentication/pages/LandingPage";
import LoginPage from "../../../ui/authentication/pages/LoginPage";
import RegisterPage from "../../../ui/authentication/pages/RegisterPage";


function DefaultSwitch() {
    return (
        <Switch>
            <Route exact path='/'> <LandingPage/> </Route>
            <Route exact path='/login'> <LoginPage/> </Route>
            <Route exact path='/register'> <RegisterPage/> </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default DefaultSwitch;
