import React from 'react';

import box from '../../../../shared/images/box.webp';

import BlankNavBar from '../../../../shared/components/BlankNavBar';
import AssignProfileForm from '../components/AssignProfileForm';

const UserAddProfile = () => {

  return (
    <>
      <BlankNavBar />
      <div className="BackgroundImageContainer">
        <img align="middle" alt="react" src={box} className="BackgroundDarkImage" />
        <div className="container ContentOverImage">
          <div className="row justify-content-center">
            <div className="col text-center">
              <h1 className="FontMaincolor">Ingresa tus datos personales</h1>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-12 col-md-6">
              <div className="card text-center" style={{padding: "9%"}}>
                <AssignProfileForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default UserAddProfile;