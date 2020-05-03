import React from 'react';

import DegreesList from './DegreesList';
import SpecialitiesList from './SpecialitiesList';

const TrainerProfile = (props) => {

  if (!props.trainerData) {
    return (
      <div className="row justify-content-center text-center">
        <div className="col-12">
          <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  let src;

  if (props.trainerData.photo !== 'none') {
    src = props.trainerData.photo;
  } else {
    src = "http://lorempixel.com/400/400/sports/";
  }


  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-12 col-md-3 p-0 ">
          <div className="card">
            <img className="card-img-top" src={src} alt={props.trainerData.trainer_name} />
            <div className="card-body">
              <h3 className="card-title FontDarkMainColor mb-4">{props.trainerData.trainer_name}</h3>
              <h6 className="card-subtitle mb-2 text-muted">Edad:</h6>
              <h5 className="card-text">{props.trainerData.age}</h5>
            </div>
          </div>
          <div className="d-flex justify-content-center my-4">
            <button className="btn btn-warning btn-lg" onClick={() => { props.goToEditProfile() }}>Editar Perfil</button>
          </div>
        </div>
        <div className="col-12 col-md-5">
          <div className="WhiteColor border p-3 mb-3">
            <h3 className="FontDarkMainColor">Contacto</h3>
            <p>Telefono:</p>
            <h4>{props.trainerData.telephone}</h4>
            <p>Ciudad:</p>
            <h4>{props.trainerData.city}</h4>
            <h3 className="FontDarkMainColor mt-4">Descripción</h3>
            <h6>{props.trainerData.description}</h6>
            <h3 className="FontDarkMainColor mt-4">Experiencia laboral</h3>
            <h6>{props.trainerData.work_experience}</h6>
            <h3 className="FontDarkMainColor mt-4">Recursos</h3>
            <h6>{props.trainerData.resources}</h6>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <DegreesList
            degreesData={props.degreesData}
          />
          <SpecialitiesList
            specialities={props.trainerData.specialities}
          />
        </div>
      </div>
    </div>
  )
}

export default TrainerProfile;