import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

import UserHomePage from "../../../ui/user/home/UserHomePage";
import UserAddProfile from '../../../ui/user/profile/pages/UserAddProfile';
import UserProfilePage from '../../../ui/user/profile/pages/UserProfilePage';
import Navbar from "../../../ui/trainer/navbar/pages/Navbar";
import UserSessionHome from '../../../ui/user/sessions/pages/UserSessionHome';

const GET_AUTH_DATA = gql`
    query getAuthData {
        profile @client
    }
`

function UserSwitch() {

    const { data } = useQuery(GET_AUTH_DATA);

    console.log(data.profile)

    if (data.profile) {
        return (
            <>
                <Route path='/' > <Navbar /> </Route>
                <Switch>
                    <Route exact path='/'> <UserHomePage /> </Route>
                    <Route exact path='/profile'> <UserProfilePage /> </Route>
                    <Route exact path='/session'> <UserSessionHome/> </Route>
                    <Redirect to="/" />
                </Switch>
            </>
        )
    } else {
        return (
            <>
                <Switch>
                    <Route exact path='/'> <UserAddProfile /> </Route>
                    <Redirect to="/" />
                </Switch>
            </>
        )
    }
}

export default UserSwitch;

