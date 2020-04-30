import React from 'react';

import whitelogo from '../images/whitelogo.webp';

const LandigPageNavbar = () => {
    return (
        <nav className="navbar BlackColor">
            <img align="middle" alt="react" src={whitelogo} className="img-fluid ml-3" width="60px" />
            <div className="d-flex justify-content-end">
            </div>
        </nav>
    )
}

export default LandigPageNavbar;