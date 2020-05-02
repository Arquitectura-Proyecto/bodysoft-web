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
      sum_ratings,
      num_ratings
    }
  }
`;

const TrainerProfilePage = () => {

  const [pageState, setPageState] = useState('profile');
  const [trainerData, setTrainerData] = useState(null);

  const { data: cache } = useQuery(GET_AUTH_DATA);
  const [getProfile, { loading, error, data, called }] = useLazyQuery(GET_PROFILE);

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

  if (cache && !called) {
    getProfile({ variables: { token: cache.token } });
  }

  if (data && !trainerData) {
    setTrainerData(data.profileTrainer);
  }

  if (loading) {
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

  switch (pageState) {
    case 'profile':
      return (
        <TrainerProfile
          goToEditProfile={goToEditProfile}
          trainerData={trainerData}
        />
      );
    case 'edit':
      return (
        <TrainerEditProfile
          userData={trainerData}
          token={cache.token}
          goToProfile={goToProfile}
          changedProfile={changedProfile}
          goToChangePass={goToChangePass}
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