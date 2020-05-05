import React, { useState } from 'react';

import box from '../../../../shared/images/box.webp';

import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";

import RoutinesHome from '../components/RoutinesHome';
import CreateRoutine from '../components/CreateRoutine';

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
  const { loading, error, data, refetch } = useQuery(GET_ROUTINES, { variables: { token: cache.token } });

  if (data && !routinesData) {
    setRoutinesData(data.getRoutineByIdOwner);
  }

  const goToRoutinesHome = () => {
    setPageState('routines');
  }

  const goToCreateRoutine = () => {
    setPageState('create_routine');
  }

  const changedRoutine = (data) => {
    let routines = routinesData
    routines.push(data)
    setRoutinesData(routines);
    setPageState('routines');
    refetch();
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

  switch (pageState) {
    case 'routines':
      return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="WhiteColor border p-4 m-4">
                <h1>Tus rutinas</h1>
                <hr/>
                <button
                  type="button"
                  className="btn btn-warning"
                  onClick={() => { goToCreateRoutine() }}
                >
                  Crear Rutina
            </button>
              </div>
            </div>
          </div>
          <RoutinesHome
            routinesData={routinesData}
            goToCreateRoutine={goToCreateRoutine}
          />
        </div>
      );
    case 'create_routine':
      return (
        <div className="BackgroundImageContainer">
          <img align="middle" alt="react" src={box} className="BackgroundDarkImage" />
          <div className="container ContentOverImage">
            <CreateRoutine
              token={cache.token}
              goToRoutinesHome={goToRoutinesHome}
              changedRoutine={changedRoutine}
            />
          </div>
        </div>
      );
    default:
  }
}

export default TrainerRoutinesHome;