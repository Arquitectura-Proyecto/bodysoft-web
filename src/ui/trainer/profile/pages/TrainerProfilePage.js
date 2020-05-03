import React, { useState } from 'react';

import box from '../../../../shared/images/box.webp';

import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

import TrainerProfile from '../components/TrainerProfile';
import TrainerEditProfile from '../components/TrainerEditProfile';
import ChangePassWord from '../../../../shared/components/ChangePassword';


const GET_AUTH_DATA = gql`
    query getAuthData {
        token @client
    }
`;

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

const GET_DEGREES = gql`
query GetProfile($token: String!){
  profileDegreesByTrainers(token: $token){
    degree_name,
    year,
    institution
  }
}
`

const TrainerProfilePage = () => {

  const [pageState, setPageState] = useState('profile');
  const [trainerData, setTrainerData] = useState(null);
  const [degreesData, setDegreesData] = useState(null);

  const { data: cache } = useQuery(GET_AUTH_DATA);
  const { loading, error, data } = useQuery(GET_PROFILE, { variables: { token: cache.token } });
  const { loading: loading2, error: error2, data: degrees } = useQuery(GET_DEGREES, { variables: { token: cache.token } });

  const goToProfile = () => {
    setPageState('profile');
  }

  const goToEditProfile = () => {
    setPageState('edit');
  }

  const goToChangePass = () => {
    setPageState('pass');
  }

  const changedProfile = (data) => {
    setTrainerData(data);
    setPageState('profile');
  }

  const changedDegree = (data) => {
    let degress = degreesData
    degress.push(data)
    setDegreesData(degress);
    setPageState('profile');
  }

  const changedSpeciality = (data) => {
    let specialities = trainerData.specialities
    specialities.push(data)
    setTrainerData({ ...trainerData, specialities: specialities });
    setPageState('profile');
  }

  if (data && !trainerData) {
    setTrainerData(data.profileTrainer);
  }

  if (degrees && !degreesData) {
    setDegreesData(degrees.profileDegreesByTrainers);
  }

  if (loading || loading2) {
    return (
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-0" role="alert">
        {error.message}
      </div>
    );
  }

  if (error2) {
    return (
      <div className="alert alert-danger m-0" role="alert">
        {error2.message}
      </div>
    );
  }

  switch (pageState) {
    case 'profile':
      return (
        <TrainerProfile
          goToEditProfile={goToEditProfile}
          trainerData={trainerData}
          degreesData={degreesData}
        />
      );
    case 'edit':
      return (
        <TrainerEditProfile
          trainerData={trainerData}
          token={cache.token}
          goToProfile={goToProfile}
          goToChangePass={goToChangePass}
          changedProfile={changedProfile}
          changedDegree={changedDegree}
          changedSpeciality={changedSpeciality}
        />
      );
    case 'pass':
      return (
        <div className="BackgroundImageContainer">
          <img align="middle" alt="react" src={box} className="BackgroundDarkImage" />
          <div className="container ContentOverImage">
            <ChangePassWord
              token={cache.token}
              goToEditProfile={goToEditProfile}
            />
          </div>
        </div>
      );
    default:
  }
}

export default TrainerProfilePage;