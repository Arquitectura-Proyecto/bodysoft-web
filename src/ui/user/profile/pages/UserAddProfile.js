import React from 'react';

import { useApolloClient } from "@apollo/react-hooks";

const UserAddProfile = () => {
    const client = useApolloClient();
    return (
        <div>
          <h1>UserAddProfile</h1>
          <button onClick={() => {client.writeData({data: { profile:true }})}}>LOL</button>
        </div>
      )
}

export default UserAddProfile;