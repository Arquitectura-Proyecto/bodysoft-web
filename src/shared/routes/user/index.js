import React from 'react';

import { Switch, Route, Redirect } from 'react-router-dom';

import UserHomePage from "../../../ui/user/home/pages/UserHomePage";
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import UserAddProfile from '../../../ui/user/profile/pages/UserAddProfile';

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
            <Switch>
                <Route exact path='/'> <UserHomePage /> </Route>
                <Redirect to="/" />
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path='/'> <UserAddProfile/> </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
}

export default UserSwitch;

