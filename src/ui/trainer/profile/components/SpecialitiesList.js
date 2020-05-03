import React from 'react';

import '../css/scroll.css';

const TitleCard = (props) => {
    return (
        <div className="MainGradient p-2 mb-2 text-center border">
            <h5 className="p-0 m-0">{props.speciality}</h5>
        </div>
    );
}

const SpecialitiesList = (props) => {

    if (!props.specialities) {
        return (
            <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    let specialitiesList = [];

    if (props.specialities.length !== 0) {
        props.specialities.map((speciality, index) => {
            specialitiesList.push(
                <TitleCard
                    key={index}
                    speciality={speciality}
                />
            )
            return null;
        });
    } else {
        return (
            <div className="WhiteColor border p-3 mb-3">
                <h4 className="FontDarkMainColor">Usted actualmente no cuenta con especialidades asignadas a su perfil</h4>
            </div>
        );
    }

    return (
        <div className="WhiteColor border p-3 mb-3">
            <h3 className="FontDarkMainColor">Especialidades</h3>
            {specialitiesList}
        </div>
    )
}

export default SpecialitiesList;