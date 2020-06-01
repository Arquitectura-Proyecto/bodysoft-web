import React from 'react';

import DegreesList from './DegreesList';
import SpecialitiesList from './SpecialitiesList';
import { useState } from 'react';
import UploadPage from './upload_page/upload_page';

import fire from "../../../../fire/Fire"
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from '@apollo/react-hooks';

function storageData(ref, img) {
  return fire.storage().ref(ref).put(img);
}

const GET_TOKEN = gql`
query getToken{
  token @client
  type @client
}
`

const GET_PROFILE = gql`
  query GetProfile($token: String!){
    profileTrainer(token: $token){
      trainer_name,
      age,
      photo,
      telephone,
      city,
      description,
      specialities,
      resources,
      work_experience,
      sum_ratings,
      num_ratings
    }
  }
`;

const GET_ID = gql`
query getID($token: String!){
  authValidateAuthToken(token:$token) {
    ID
  }
}
`

const UPDATE_PROFILE = gql`
mutation updateProfile($token:String!,$trainer_name:String!,$age:Int!,$photo:String!,$telephone:String!,$city:String!,$sum_ratings:Int!,$num_ratings:Int!,$description:String!,$work_experience:String!,$resources:String!){
  updateProfileTrainer(token:$token
  body:{
    trainer_name:$trainer_name,
    age:$age,
    photo:$photo,
    telephone:$telephone,
    city:$city,
    sum_ratings:$sum_ratings,
    num_ratings:$num_ratings,
    description:$description,
    work_experience:$work_experience,
    resources:$resources,
  }) {
    trainer_id
    trainer_name
    age
    photo
    telephone
    city
    sum_ratings
    num_ratings
    description
    work_experience
    resources
  }
}
`

const TrainerProfile = (props) => {

  /*ACTULIZACION DE IMAGEN*/

  const token = useQuery(GET_TOKEN).data.token;

  const { loading: loadingProfile, error: errorProfile, data: dataProfile } = useQuery(GET_PROFILE, {
    variables: { token, }
  });

  const [uploadImage, setUploadImage] = useState(null);

  const [updateProfile] = useMutation(UPDATE_PROFILE,
    {
      update(cache) {

      }
    })

  const [uploadimgstate, setUploadimgstate] = useState(false)
  const [percentageImageLoading, setPercentageImageLoading] = useState(0)


  let { data, error, loading } = useQuery(GET_ID, { variables: { token: token } })

  if (error || errorProfile) {
    return <div>error</div>
  }

  if (loading || loadingProfile) {
    return <div>loading...</div>
  }

  console.log("DATA", data.authValidateAuthToken.ID)

  const id = data.authValidateAuthToken.ID;

  const perfilImghandler = async (img) => {
    addImagen(
      img,
      id,
      percentage => { setPercentageImageLoading(percentage) },
      error => { console.log(error) },
      () => {
        setPercentageImageLoading(100)
        setUploadImage(null)
        console.log("TERMINOOOOOOO Terminar")
        //dispatch(fetchUsers())
      }
    )
  }

  const variables = dataProfile.profileTrainer;

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
          variables.photo = url;
          variables.token = token;
          //await this.firebaseCreateRepository.writeDocument("usuarios/" + this.getUserId(), { foto: url }, true)
          console.log("URL", url)
          console.log("VARIABLES", variables)
          updateProfile({ variables: variables });
          fullyLoaded()
        } catch (errorCatch) {
          error(errorCatch)
        }
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

  console.log("props.trainerData.specialities", props.trainerData)

  let uploadImages;

  if (uploadImage) {
    uploadImages = <UploadPage
      percentageImageLoading={percentageImageLoading}
      onClickCancelar={() => { setUploadImage(null); setPercentageImageLoading(0); }}
      foto={src}
      onClickActualizar={(img) => { perfilImghandler(img) }}
    />
  }

  console.log("uploadImages",uploadImages);

  return (
    <>
      {uploadImages}
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-3 p-0 ">
            <div className="card">
              <img className="card-img-top" src={src} alt={props.trainerData.trainer_name}
                onClick={
                  () => {
                    setPercentageImageLoading(0);
                    setUploadImage(true)
                  }
                } />
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