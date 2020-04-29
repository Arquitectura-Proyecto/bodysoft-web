import React, { useState } from 'react';

import gql from 'graphql-tag';
import { useApolloClient, useLazyQuery } from "@apollo/react-hooks";

import LoginForm from './LoginForm';
import RecoverPassword from './RecoverPassword';


const AUTHENTICATION = gql`
  query Authentication($Email: String!, $Password: String!){
    authAuthentication(email: $Email, password: $Password){
        Token
    }
  }
`;

const AUTHTOKEN = gql`
  query Authentication($Token: String!){
    authValidateAuthToken(token: $Token){
        TypeID,
        Profile
      }
  }
`;

const Login = () => {

    const client = useApolloClient();

    const [loginState, setLoginState] = useState({ passwordState: false });

    const [authentication, { loading, error, data }] = useLazyQuery(AUTHENTICATION, { errorPolicy: 'all' });
    const [getTokenData, { called, loading: tokenLoading, error: tokenError, data: tokenData }] = useLazyQuery(AUTHTOKEN, { errorPolicy: 'all' });

    const onSubmitAuth = values => {
        authentication({ variables: { Email: values.Email, Password: values.Password } });
    };

    const changePassHandler = () => {
        setLoginState({ ...loginState, passwordState: !loginState.passwordState })
    }

    if (data && data.authAuthentication && !called) {
        getTokenData({ variables: { Token: data.authAuthentication.Token } })
    }

    if (tokenData) {
        client.writeData({
            data: {
                token: data.authAuthentication.Token,
                type: tokenData.authValidateAuthToken.TypeID,
                profile: tokenData.authValidateAuthToken.Profile
            }
        })
        localStorage.setItem("token", data.authAuthentication.Token)
        localStorage.setItem("type", tokenData.authValidateAuthToken.TypeID)
        localStorage.setItem("profile", (tokenData.authValidateAuthToken.Profile ? "true":""))
    };

    if (error && error.message.substring(14, 18).trim() === "406") {
        window.location.pathname = '/validate'
    }

    if (loginState.passwordState === true) {
        return (
            <RecoverPassword
                changePassHandler={changePassHandler}
            />
        );
    }

    return (
        <LoginForm
            onFinish={onSubmitAuth}
            changePassHandler={changePassHandler}
            mutationLoading={loading || tokenLoading}
            mutationError={error || tokenError}
        />
    )
}

export default Login;