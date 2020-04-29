import React from 'react';

import correct from '../../../shared/images/correct.webp';

import { Link } from 'react-router-dom';

const IsValid = (props) => {
    return (
        <>
            <h1 className="TitleFontTypeRoboto">Cuenta creada y validada exitosamente</h1>
            <img alt="correct" src={correct} style={{ width: "80px" }} className="m-0" />
            <br />
            <br />
            <Link to="/login">
                <button type="button" className="btn btn-warning mr-2 btn-lg">Ingresar</button>
            </Link>
        </>
    )
}

export default IsValid;