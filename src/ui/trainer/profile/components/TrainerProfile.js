import React from 'react';

const TrainerProfile = (props) => {

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-4 p-0 text-center">
        <h1>Perfil</h1>
        <button className="btn btn-warning btn-sm mb-0" onClick={() => { props.goToEditProfile() }}>Editar</button>
      </div>
    </div>
  )
}

export default TrainerProfile;