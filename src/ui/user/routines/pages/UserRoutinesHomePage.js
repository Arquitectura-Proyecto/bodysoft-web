import React, { useState } from 'react';

import gql from 'graphql-tag';
import { useLazyQuery, useQuery } from '@apollo/react-hooks';

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

const GET_ALL_ROUTINES = gql`
{
  getAllRoutines{
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

  const [filter, setFilter] = useState(false);
  const [getRoutines, { loading, error, data }] = useLazyQuery(GET_ROUTINES);
  const { loading: loading2, error: error2, data: data2 } = useQuery(GET_ALL_ROUTINES)


  const onSubmitChangefilter = values => {
    if (values.idType === 0) {
      setFilter(false);
    } else {
      setFilter(true);
      getRoutines({ variables: { type: parseInt(values.idType) } })
    }
  };

  if (loading || loading2) {
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

  if (error2) {
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

  let list;
  if (data && filter) {
    list = <HomeRoutines
      routinesList={data.getRoutinesByType}
    />
  } else if (data2) {
    list = <HomeRoutines
      routinesList={data2.getAllRoutines}
    />
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <div className="WhiteColor border p-4 m-4">
            <button type="button" className="btn btn-success">Mis Rutinas</button>
            <div style={{ paddingLeft: "11%", paddingRight: "11%" }}>
              <SelectRoutineByIdForm onSubmitChangefilter={onSubmitChangefilter} />
            </div>
          </div>
        </div>
      </div>
      {list}
    </div>
  );
}

export default UserRoutinesHomePage;