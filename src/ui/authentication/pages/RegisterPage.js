import React from 'react';

import registerside from '../../../shared/images/registerside.jpg'
import '../../../shared/css/images.css';

import LandigPageNavbar from '../components/LandingPageNavbar';

const RegisterPage = () => {
    return (
        <>
            <LandigPageNavbar />
            <div className="container-fluid pl-0">
                <div className="row">
                    <div className="col-12 col-sm-6 d-none d-sm-block">
                        <img className="img-fluid BackgroundImage" src={registerside} alt="Responsive" />
                    </div>
                    <div className="col-12 col-sm-6">
                        <h1>Hola</h1>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;