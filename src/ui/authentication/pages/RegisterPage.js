import React from 'react';

import register_side from '../../../shared/images/register_side.webp';
import '../../../shared/css/images.css';

import LandigPageNavbar from '../components/LandingPageNavbar';
import Register from '../components/Register';

const RegisterPage = () => {
    return (
        <>
            <LandigPageNavbar />
            <div className="container-fluid pl-0">
                <div className="row">
                    <div className="col-12 col-sm-6 d-none d-sm-block">
                        <img className="img-fluid BackgroundImage" src={register_side} alt="Responsive" />
                    </div>
                    <div className="col-12 col-sm-6 text-center m-0" style={{padding: "9%"}}>
                        <Register/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage;