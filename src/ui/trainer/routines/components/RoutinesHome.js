import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const RoutineCard = (props) => {
  return (
    <div className="col mb-4">
      <div className="card h-100 m-2 border">
        <iframe title={props.name} width="100%" height="215" src={props.linkPreview} frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowFullScreen="allowfullscreen"></iframe>
        <div className="card-body">
          <h3 className="card-title FontMaincolor">{props.name}</h3>
          <p className="pb-0 mb-1">Descripción:</p>
          <h6 className="card-title">{props.description}</h6>
          <p className="pb-0 mb-1">Precio:</p>
          <h6 className="card-title">{props.price}</h6>
          <p className="pb-0 mb-1">Calificacion:</p>
          <h6 className="card-title">{props.rating}</h6>
          <p className="pb-0 mb-1">Tipo:</p>
          <h6 className="card-title">{props.type}</h6>
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="btn btn-warning"
            >
              Gestionar
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const GET_TYPES = gql`
  {
    getAllTypeRoutine{
      id
      name
   }
}
`;


const RoutinesHome = (props) => {

  const { loading, error, data } = useQuery(GET_TYPES);

  if (!props.routinesData || loading) {
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

  let RoutinesList = [];

  if (props.routinesData.length !== 0 && data) {
    props.routinesData.map((routine, index) => {
      data.getAllTypeRoutine.map(type => {
        if (type.id === routine.type.id) {
          RoutinesList.push(
            <RoutineCard
              key={index}
              name={routine.name}
              price={routine.price}
              description={routine.description}
              linkPreview={routine.linkPreview}
              rating={routine.rating}
              type={type.name}
            />
          )
        }
        return null;
      })
      return null;
    });
  } else {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12">
            <div className="WhiteColor border p-4 m-4">
              <h1>Routines Home</h1>
              <hr />
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => { props.goToCreateRoutine() }}
              >
                Crear Rutina
            </button>
            </div>
          </div>
        </div>
        <div className="text-center m-5 p-5">
          <div className="alert alert-dark" role="alert">
            <h2>Usted actualmente no cuenta con rutinas creadas</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12">
          <div className="WhiteColor border p-4 m-4">
            <h1>Routines Home</h1>
            <hr />
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => { props.goToCreateRoutine() }}
            >
              Crear Rutina
            </button>
          </div>
        </div>
      </div>
      <div className="row row-cols-1 row-cols-md-3">
        {RoutinesList}
      </div>
    </div>
  )
}

export default RoutinesHome;