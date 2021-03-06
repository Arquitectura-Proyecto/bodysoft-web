import React, { useState } from 'react';

import box from '../../../../shared/images/box.webp';

import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";

import UserProfile from '../components/UserProfile';
import UserEditProfile from '../components/UserEditProfile';
import ChangePassWord from '../../../../shared/components/ChangePassword';


const GET_AUTH_DATA = gql`
    query getAuthData {
        token @client
    }
`;

const GET_PROFILE = gql`
  query GetProfile($token: String!){
    profileUser(token: $token){
      user_name
      age
      photo
      telephone
      city
    }
  }
`;

const UserProfilePage = () => {

  const [pageState, setPageState] = useState('profile');
  const [userData, setUserData] = useState(null);

  const { data: cache } = useQuery(GET_AUTH_DATA);
  const { loading, error, data , refetch} = useQuery(GET_PROFILE, { variables: { token: cache.token } });

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
    setUserData(data);
    setPageState('profile');
    refetch();
  }

  if (data && !userData) {
    setUserData(data.profileUser);
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

  let content
  switch (pageState) {
    case 'profile':
      content = <UserProfile
        goToEditProfile={goToEditProfile}
        userData={userData}
      />
      break;
    case 'edit':
      content = <UserEditProfile
        userData={userData}
        token={cache.token}
        goToProfile={goToProfile}
        changedProfile={changedProfile}
        goToChangePass={goToChangePass}
      />
      break;
    case 'pass':
      content = <ChangePassWord
        token={cache.token}
        goToEditProfile={goToEditProfile}
      />
      break;
    default:
  }

  return (
    <div className="BackgroundImageContainer">
      <img align="middle" alt="react" src={box} className="BackgroundDarkImage" />
      <div className="container ContentOverImage">
        {content}
      </div>
    </div>
  );

}

export default UserProfilePage;