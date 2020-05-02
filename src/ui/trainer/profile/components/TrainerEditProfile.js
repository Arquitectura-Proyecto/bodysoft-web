import React from 'react';

const TrainerEditProfile = (props) => {

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-4 p-0 text-center">
                <h1>Editar</h1>
                <button className="btn btn-link FontBlackLink mb-0" onClick={() => { props.goToProfile() }}>Volver</button>
                <button className="btn btn-link FontBlackLink ml-2" onClick={() => { props.goToChangePass() }}>Contraseña</button>
            </div>
        </div>
    )
}

export default TrainerEditProfile;