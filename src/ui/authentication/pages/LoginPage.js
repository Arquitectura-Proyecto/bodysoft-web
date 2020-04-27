import React from 'react';

import { useApolloClient } from "@apollo/react-hooks";

const LoginPage = () => {
    const client = useApolloClient();
    return (
        <div>
          <h1>Login</h1>
          <button onClick={() => {client.writeData({data: { token: "3", isLogged: true, type:2}})}}>LOL</button>
        </div>
      )
}

export default LoginPage;