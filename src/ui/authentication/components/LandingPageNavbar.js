import React from 'react';

import whitelogo from '../../../shared/images/whitelogo.webp';

import { Link } from 'react-router-dom';

const LandigPageNavbar = (props) => {
  return (
    <nav className="navbar BlackColor">
      <Link to="/">
        <img align="middle" alt="react" src={whitelogo} className="img-fluid ml-3" width="60px" />
      </Link>
      <div className="d-flex justify-content-end">
        <Link to="/login">
          <button type="button" className="btn btn-outline-light mr-2">Ingresar</button>
        </Link>
        <Link to="/register">
          <button type="button" className="btn btn-outline-light">Registrarse</button>
        </Link>
      </div>
    </nav>
  )
}

export default LandigPageNavbar;