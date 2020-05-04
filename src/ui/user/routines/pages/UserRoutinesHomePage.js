import React from 'react';

import gql from 'graphql-tag';
import { useLazyQuery } from '@apollo/react-hooks';

import HomeRoutines from '../components/HomeRoutinesList';
import SelectRoutineByIdForm from '../components/SelectRoutineByIdForm';

const GET_ROUTINES = gql`
query GetRoutines($type: Int!){
  getRoutinesByType(idType: $type){
    name,
    description,
    price,
    rating,
    linkPreview,
    type{
      id
    }
  }
}
`;


const UserRoutinesHomePage = () => {

  const [getRoutines, { loading, error, data, called }] = useLazyQuery(GET_ROUTINES);

  if (!called) {
    getRoutines({ variables: { type: 1 } })
  }

  const onSubmitChangefilter = values => {
    getRoutines({ variables: { type: parseInt(values.idType) } })
  }

  if (loading) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 p-0 ">
            <div className="spinner-border text-warning" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 p-0 ">
            <div className="alert alert-danger m-0" role="alert">
              {error.message.substring(19)}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="WhiteColor border p-4 m-4">
            <button type="button" className="btn btn-success">Mis Rutinas</button>
            <div style={{paddingLeft: "11%", paddingRight: "11%"}}>
              <SelectRoutineByIdForm onSubmitChangefilter={onSubmitChangefilter} /> 
            </div>
          </div>
        </div>
      </div>
      {data &&
        <HomeRoutines
          routinesList={data.getRoutinesByType}
        />
      }

    </div>
  );
}

export default UserRoutinesHomePage;