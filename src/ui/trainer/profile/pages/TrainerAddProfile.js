import React from 'react';

import { useApolloClient } from "@apollo/react-hooks";

const TrainerAddProfile = () => {
    const client = useApolloClient();
    return (
        <div>
          <h1>TrainerAddProfile</h1>
          <button onClick={() => {client.writeData({data: { profile:true }})}}>LOL</button>
        </div>
      )
}

export default TrainerAddProfile;