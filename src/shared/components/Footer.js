import React from 'react';

import '../css/colors.css';
import '../css/fonts.css';
import '../css/fontcolor.css';

import react from '../images/react.webp';
import apollo from '../images/apollo.webp';
import graphql from '../images/graphql.webp';
import instagram from '../images/instagram.webp';
import facebook from '../images/facebook.webp';
import linkedin from '../images/linkedin.webp';

const Footer = (props) => {
  return (
    <div>
      <div className="container-fluid MainGradient p-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-4  mb-2 text-center">
            <h2 className="TitleFontTypeRoboto mb-3">Contacto</h2>
            <div className="d-flex justify-content-center">
              <span className="oi oi-chevron-right mt-1 mr-2" title="person" aria-hidden="true"></span>
              <p><a className="FontDarkColor TitleFontTypeRoboto" href="https://github.com/Arquitectura-Proyecto" target="_blank" rel="noopener noreferrer"> NOSOTROS </a></p>
            </div>
            <h2 className="TitleFontTypeRoboto text-center">Social</h2>
            <div className="d-flex justify-content-center">
              <img align="middle" alt="instagram" src={instagram} className="img-fluid mr-3" width="35px" />
              <img align="middle" alt="facebook" src={facebook} className="img-fluid ml-3 mr-3" width="35px" />
              <img align="middle" alt="linkedin" src={linkedin} className="img-fluid ml-3" width="35px" />
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2 text-center">
            <h1 className="FontDarkColor font-italic text-uppercase  mt-1 d-block d-sm-none"> BodySoft</h1>
            <h3 className="FontDarkColor font-italic text-uppercase HugeTextFont mt-1 d-none d-sm-block"> BodySoft</h3>
            <h6 className="mb-3">powered by:</h6>
            <div className="d-flex justify-content-center">
              <img align="middle" alt="react" src={react} className="img-fluid ml-3" width="60px" />
              <img align="middle" alt="react" src={apollo} className="img-fluid ml-3" width="60px" />
              <img align="middle" alt="react" src={graphql} className="img-fluid ml-3" width="60px" />
            </div>
          </div>
          <div className="col-12 col-md-4  mb-1 text-center">
            <h2 className="TitleFontTypeRoboto mb-3 mt-2">Nuevas Funcionalidades</h2>
            <div className="d-flex justify-content-center">
              <span className="oi oi-eye mt-1 mr-2" title="person" aria-hidden="true"></span>
              <p className="TextFontTypeRoboto">Rutinas recomendadas de la semana</p>
            </div>
            <div className="d-flex justify-content-center">
              <span className="oi oi-laptop mt-1 mr-2" title="person" aria-hidden="true"></span>
              <p className="TextFontTypeRoboto">Nueva interfaz para ver tu perfil</p>
            </div>
            <div className="d-flex justify-content-center">
              <span className="oi oi-wifi mt-1 mr-2" title="person" aria-hidden="true"></span>
              <p className="TextFontTypeRoboto">Mejoras en el rendimiento de la pagina</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer;