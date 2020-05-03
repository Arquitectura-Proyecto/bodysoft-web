import React, { useState } from 'react';

import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";

const GET_AUTH_DATA = gql`
    query getAuthData {
        token @client
    }
`;

const GET_ROUTINES = gql`
query GetRoutines($token: String!){
  getRoutineByIdOwner(token: $token){
    description
    name
    price
    linkPreview
    type {
      id
    }
    rating
  }
}
`

const TrainerRoutinesHome = (props) => {

  const [pageState, setPageState] = useState('routines');
  const [routinesData, setRoutinesData] = useState(null);

  const { data: cache } = useQuery(GET_AUTH_DATA);
  const { loading, error, data } = useQuery(GET_ROUTINES, { variables: { token: cache.token } });

  if (data && !routinesData) {
    setRoutinesData(data.getRoutineByIdOwner);
  }

  if (loading) {
    return (
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-0" role="alert">
        {error.message}
      </div>
    );
  }

  return (
    <div>
      <h1>Trainer Routines Home</h1>
    </div>
  )
}

export default TrainerRoutinesHome;