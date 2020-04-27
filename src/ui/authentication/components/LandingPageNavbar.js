import React from 'react';

import whitelogo from '../../../shared/images/whitelogo.webp';

const LandigPageNavbar = (props) => {
  return (
    <nav className="navbar BlackColor">
      <img align="middle" alt="react" src={whitelogo} className="img-fluid ml-3" width="60px" />
      <div className="d-flex justify-content-end">
        <button type="button" className="btn btn-outline-light mr-3">Ingresar</button>
        <button type="button" className="btn btn-outline-light">Registrarse</button>
      </div>
    </nav>
  )
}

export default LandigPageNavbar;