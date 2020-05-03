import React from 'react';

import '../css/scroll.css';

const TitleCard = (props) => {
    return (
        <div className="card m-3 ">
            <div className="card-body">
                <p>Nombre:</p>
                <h5 className="card-title">{props.degree_name}</h5>
                <p>Institucion:</p>
                <h5 className="card-title">{props.institution}</h5>
                <p>Año:</p>
                <h5 className="card-title">{props.year}</h5>
            </div>
        </div>
    );
}

const DegreesList = (props) => {

    if (!props.degreesData) {
        return (
            <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    let degreeList = [];

    if (props.degreesData.length !== 0) {
        props.degreesData.map((degree, index) => {
            degreeList.push(
                <TitleCard
                    key={index}
                    degree_name={degree.degree_name}
                    institution={degree.institution}
                    year={degree.year}
                />
            )
            return null;
        });
    } else {
        return (
            <div className="WhiteColor border p-3 mb-3">
                <h4 className="FontDarkMainColor">Usted actualmente no cuenta con títulos asignados a su perfil</h4>
            </div>
        );
    }

    return (
        <div className="WhiteColor border p-3 mb-3">
            <h3 className="FontDarkMainColor">Titulos</h3>
            <div className="scroll Background border">
                {degreeList}
            </div>
        </div>
    )
}

export default DegreesList;