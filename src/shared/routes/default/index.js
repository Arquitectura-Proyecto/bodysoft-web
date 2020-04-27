import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import LandingPage from "../../../ui/authentication/pages/LandingPage";

import LoginPage from "../../../ui/authentication/pages/LoginPage";


function DefaultSwitch() {
    return (
        <Switch>
            <Route exact path='/'> <LandingPage/> </Route>
            <Route exact path='/login'> <LoginPage/> </Route>
            <Route exact path='/register'> <h1>REGISTER</h1> </Route>
            <Redirect to="/" />
        </Switch>
    )
}

export default DefaultSwitch;
