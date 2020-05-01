import React from 'react';

import blacklogo from '../../../shared/images/blacklogo.webp';
import trainer1 from '../../../shared/images/trainer1.webp';
import trainer2 from '../../../shared/images/trainer2.webp';
import trainer3 from '../../../shared/images/trainer3.webp';
import running_people from '../../../shared/images/running_people.webp';
import fitness_girl from '../../../shared/images/fitness_girl.webp';
import profile_logo from '../../../shared/images/profile_logo.webp';

import Carrousel from '../../../shared/components/Carrousel';
import Footer from '../../../shared/components/Footer';

const UserHomePage = () => {
  return (
    <>
      <Carrousel
        img1={trainer1}
        img2={trainer2}
        img3={trainer3}
        alt1={"BodySoft"}
        alt2={"BodySoft"}
        alt3={"BodySoft"}
      />
      <br />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <h1 className="FontDarkColor font-italic text-uppercase  mt-1 d-block d-sm-none">BodySoft</h1>
            <h1 className="FontMaincolor font-italic text-uppercase BigTextFont mt-1 d-block d-sm-none">TRAINER</h1>
            <h1 className="FontDarkColor font-italic text-uppercase BigTextFont mt-1 mb-1 d-none d-sm-block">BodySoft</h1>
            <h1 className="FontMaincolor font-italic text-uppercase MaxTextFont mt-1 d-none d-sm-block">TRAINER</h1>
            <h3>Con BodySoft vas a podrás hacer que tus conocimientos en el deporte y el fisicoculturismo lleguen a una gran multitud de personas, para que puedas iniciar tu proceso de convertirte en un entrenador reconocido a nivel regional.</h3>
            <br />
            <img align="middle" alt="Paseos" src={blacklogo} width="200px" />
          </div>
        </div>
        <br />
        <hr />
        <br />
        <div className="row justify-content-between">
          <div className="col-12 col-md-3 text-center">
            <img align="middle" alt="Paseos" src={running_people} className="mb-3 d-block d-md-none" width="30%" style={{ margin: "auto" }} />
            <img align="middle" alt="Paseos" src={running_people} className="img-fluid mb-3 d-none d-md-block" />
            <h1 className="mb-3">Sesiones</h1>
            <h5>Vas a poder ofrecer sesiones personales a las personas, para que putas transmitir tus mejores conocimientos.</h5>
          </div>
          <div className="col-12 col-md-3 text-center">
            <img align="middle" alt="Paseos" src={profile_logo} className="mb-3 d-block d-md-none" width="30%" style={{ margin: "auto" }} />
            <img align="middle" alt="Paseos" src={profile_logo} className="img-fluid mb-3 d-none d-md-block" />
            <h1 className="mb-3">Perfil</h1>
            <h5>Tendrás tu propio perfil para que todas las personas puedan ver todos tus títulos y logros en el deporte.</h5>
          </div>
          <div className="col-12 col-md-3 text-center">
            <img align="middle" alt="Paseos" src={fitness_girl} className="mb-3 d-block d-md-none" width="30%" style={{ margin: "auto" }} />
            <img align="middle" alt="Paseos" src={fitness_girl} className="img-fluid mb-3 d-none d-md-block" />
            <h1 className="mb-3">Rutinas</h1>
            <h5>Podrás ofrecer tus mejores rutinas de ejercicio, para que puedas empezar a generar ganancias con tus conocimientos.</h5>
          </div>
        </div>
      </div>
      <br />
      <br />
      <Footer />
    </>
  )
}

export default UserHomePage;