import React from 'react';

import { useQuery } from "@apollo/react-hooks";
import { gql } from 'apollo-boost';

import DefaultSwitch from "./default/index";
import TrainerSwitch from './trainer';
import UserSwitch from './user/index'

const GET_AUTH_DATA = gql`
    query getAuthData {
        token @client
        isLogged @client
        type @client
    }
`

function Routes() {

    const { data } = useQuery(GET_AUTH_DATA);
    const { isLogged, type } = data;

    if (isLogged) {
        if (type === 1) {
            return <TrainerSwitch />
        } else if (type === 2) {
            return <UserSwitch />
        }
    }

    return <DefaultSwitch />
}

export default Routes;
