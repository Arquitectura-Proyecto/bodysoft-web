import React from 'react';

import DegreesList from './DegreesList';
import SpecialitiesList from './SpecialitiesList';
import { useState } from 'react';
import UploadPage from './upload_page/upload_page';

import fire from "../../../../fire/Fire"
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

function storageData(ref, img) {
  return fire.storage().ref(ref).put(img);
}

function addImagen(img, id, loadImg, error, fullyLoaded) {

  const task = storageData(`/TrainerPhotos/${id}`, img);

  task.on('state_changed',
    snapshot => {
      let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      loadImg(percentage)
    },
    error,
    async () => {
      try {
        let url = await task.snapshot.ref.getDownloadURL();
        //await this.firebaseCreateRepository.writeDocument("usuarios/" + this.getUserId(), { foto: url }, true)
        fullyLoaded()
      } catch (errorCatch) {
        error(errorCatch)
      }
    }
  )
}

const GET_TOKEN = gql`
query getToken{
  token @client
  type @client
}
`

const GET_ID = gql`
query getID($token: String!){
  authValidateAuthToken(token:$token) {
    ID
  }
}
`

const TrainerProfile = (props) => {

  /*ACTULIZACION DE IMAGEN*/

  const [uploadImage, setUploadImage] = useState(null);

  const [uploadimgstate, setUploadimgstate] = useState(false)
  const [percentageImageLoading, setPercentageImageLoading] = useState(0)

  const token = useQuery(GET_TOKEN).data.token;

  let { data, error, loading } = useQuery(GET_ID,{ variables: { token: token } })

  if (error) {
    return <div>error</div>
  }

  if (loading) {
    return <div>loading...</div>
  }

  console.log("DATA",data.authValidateAuthToken.ID)

  const id = data.authValidateAuthToken.ID;

  const perfilImghandler = async (img) => {
    addImagen(
      img,
      id,
      percentage => { setPercentageImageLoading(percentage) },
      error => { console.log(error) },
      () => {
        setPercentageImageLoading(100)
        setUploadimgstate(false)
        console.log("TERMINOOOOOOO")
        //dispatch(fetchUsers())
      }
    )
  }



  /*FIN ACTULIZACION DE IMAGEN*/

  if (!props.trainerData) {
    return (
      <div className="row justify-content-center text-center">
        <div className="col-12">
          <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  let src;

  if (props.trainerData.photo !== 'none') {
    src = props.trainerData.photo;
  } else {
    src = "http://lorempixel.com/400/400/sports/";
  }



  return (
    <>
      {uploadImage}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-3 p-0 ">
            <div className="card">
              <img className="card-img-top" src={src} alt={props.trainerData.trainer_name} onClick={() => setUploadImage(<UploadPage onClickCancelar={() => { setUploadImage(null); setPercentageImageLoading(0) }} onClickActualizar={(img) => { perfilImghandler(img) }} />)} />
              <div className="card-body">
                <h3 className="card-title FontDarkMainColor mb-4">{props.trainerData.trainer_name}</h3>
                <h6 className="card-subtitle mb-2 text-muted">Edad:</h6>
                <h5 className="card-text">{props.trainerData.age}</h5>
              </div>
            </div>
            <div className="d-flex justify-content-center my-4">
              <button className="btn btn-warning btn-lg" onClick={() => { props.goToEditProfile() }}>Editar Perfil</button>
            </div>
          </div>
          <div className="col-12 col-md-5">
            <div className="WhiteColor border p-3 mb-3">
              <h3 className="FontDarkMainColor">Contacto</h3>
              <p>Telefono:</p>
              <h4>{props.trainerData.telephone}</h4>
              <p>Ciudad:</p>
              <h4>{props.trainerData.city}</h4>
              <h3 className="FontDarkMainColor mt-4">Descripción</h3>
              <h6>{props.trainerData.description}</h6>
              <h3 className="FontDarkMainColor mt-4">Experiencia laboral</h3>
              <h6>{props.trainerData.work_experience}</h6>
              <h3 className="FontDarkMainColor mt-4">Recursos</h3>
              <h6>{props.trainerData.resources}</h6>
            </div>
          </div>
          <div className="col-12 col-md-4">
            <DegreesList
              degreesData={props.degreesData}
            />
            <SpecialitiesList
              specialities={props.trainerData.specialities}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default TrainerProfile;