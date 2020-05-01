import React from 'react';

import blacklogo from '../../../shared/images/blacklogo.webp';
import user1 from '../../../shared/images/user1.webp';
import user2 from '../../../shared/images/user2.webp';
import user3 from '../../../shared/images/user3.webp';
import running_people from '../../../shared/images/running_people.webp';
import fitness_girl from '../../../shared/images/fitness_girl.webp';
import profile_logo from '../../../shared/images/profile_logo.webp';

import Carrousel from '../../../shared/components/Carrousel';
import Footer from '../../../shared/components/Footer';

const UserHomePage = () => {
  return (
    <>
      <Carrousel
        img1={user3}
        img2={user1}
        img3={user2}
        alt1={"BodySoft"}
        alt2={"BodySoft"}
        alt3={"BodySoft"}
      />
      <br />
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-md-8 text-center">
            <h1 className="FontDarkColor font-italic text-uppercase  mt-1 d-block d-sm-none">BodySoft</h1>
            <h1 className="FontMaincolor font-italic text-uppercase BigTextFont mt-1 d-block d-sm-none">USER</h1>
            <h1 className="FontDarkColor font-italic text-uppercase BigTextFont mt-1 mb-1 d-none d-sm-block">BodySoft</h1>
            <h1 className="FontMaincolor font-italic text-uppercase MaxTextFont mt-1 d-none d-sm-block">USER</h1>
            <h3>Con BodySoft vas a poder ponerte en contacto con los mejores entrenadores de la región, podrás tener acceso al mejor contenido online relacionado con el fitness y el deporte de alto rendimiento para que puedas ejercitarte en cualquier lugar.</h3>
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
            <h5>Con el servicio de Sesiones vas a poder agendar citas personales con los mejores entrenadores de la región.</h5>
          </div>
          <div className="col-12 col-md-3 text-center">
            <img align="middle" alt="Paseos" src={profile_logo} className="mb-3 d-block d-md-none" width="30%" style={{ margin: "auto" }} />
            <img align="middle" alt="Paseos" src={profile_logo} className="img-fluid mb-3 d-none d-md-block" />
            <h1 className="mb-3">Perfil</h1>
            <h5>Podrás tener tu propio perfil para que el contacto con los entrenadores de la plataforma sea lo más fácil posible.</h5>
          </div>
          <div className="col-12 col-md-3 text-center">
            <img align="middle" alt="Paseos" src={fitness_girl} className="mb-3 d-block d-md-none" width="30%" style={{ margin: "auto" }} />
            <img align="middle" alt="Paseos" src={fitness_girl} className="img-fluid mb-3 d-none d-md-block" />
            <h1 className="mb-3">Rutinas</h1>
            <h5>Con el servicio de Rutinas vas a poder acceder a las rutinas de ejercicios de los mejores entrenadores.</h5>
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