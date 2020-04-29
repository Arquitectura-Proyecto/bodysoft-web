import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import TrainerHomePage from "../../../ui/trainer/home/pages/TrainerHomePage";
import TrainerAddProfile from "../../../ui/trainer/profile/pages/TrainerAddProfile";
import TrainerSessionHome from '../../../ui/trainer/sessions/pages/TrainerSessionHome';
import Navbar from "../../../ui/trainer/navbar/pages/Navbar";

const GET_AUTH_DATA = gql`
    query getAuthData {
        profile @client
    }
`

function TrainerSwitch() {

    const { data } = useQuery(GET_AUTH_DATA);

    console.log(data.profile)

    if (data.profile) {
        return (
            <>
                <Route path='/' > <Navbar /> </Route>
                <Switch>
                    <Route exact path='/'> <TrainerHomePage /> </Route>
                    <Route exact path='/session'> <TrainerSessionHome /> </Route>
                    <Redirect to="/" />
                </Switch>
            </>
        )
    } else {
        return (
            <Switch>
                <Route exact path='/'> <TrainerAddProfile /> </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
}

export default TrainerSwitch;
