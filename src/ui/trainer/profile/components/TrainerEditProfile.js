import React from 'react';

import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";

import TrainerUpdateInfoForm from './TrainerUpdateInfoForm';
import AddDegreeForm from './AddDegreeForm';
import AddSpecialities from './AddSpecialitiesForm';

const ADD_DEGREE = gql`
mutation AddDegree($token: String!, $degree_name: String!, $year: Int!, $institution: String!){
    createProfileDegree(
        token: $token, 
        body:{
          degree_name: $degree_name,
          year: $year,
          institution: $institution
        }
      ){
        degree_name,
        year,
        institution,
      }
  }
`;

const ADD_SPECIALITY = gql`
mutation AddDegree($token: String!, $speciality: ID!){
    createProfileTrainerSpeciality(
        token: $token, 
        body:{
            speciality: $speciality
        }
      ){
        speciality
      }
  }
`;

const UPDATE_TRAINER_PROFILE = gql`
   mutation UpdateProfile(
       $token: String!, 
       $trainer_name: String!, 
       $city: String!, 
       $telephone: String!, 
       $age: Int!, 
       $photo: String!
       $sum_ratings: Int!, 
       $num_ratings: Int!,
       $description: String!,
       $work_experience: String!,
       $resources: String!
       ){
    updateProfileTrainer(
        token: $token,
        body: {
            trainer_name: $trainer_name,
            age: $age,
            photo: $photo,
            telephone:  $telephone,
            city: $city,
            description: $description,
            resources: $resources,
            work_experience: $work_experience,
            sum_ratings: $sum_ratings,
            num_ratings: $num_ratings
        }
      ){
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

const TrainerEditProfile = (props) => {

    const [UpdateProfile, { data, loading, error }] = useMutation(UPDATE_TRAINER_PROFILE, { errorPolicy: 'all' });
    const [UpdateDegrees, { data: newDegree, loading: loading2, error: error2 }] = useMutation(ADD_DEGREE, { errorPolicy: 'all' });
    const [UpdateSpeciality, { loading: loading3, error: error3 }] = useMutation(ADD_SPECIALITY, { errorPolicy: 'all' });

    const onSubmitUpdateProfile = async values => {
        try {
            await UpdateProfile({
                variables: {
                    token: props.token,
                    trainer_name: values.trainer_name,
                    city: values.city,
                    telephone: values.telephone,
                    age: values.age,
                    photo: 'none',
                    sum_ratings: 0,
                    num_ratings: 0,
                    description: values.description,
                    work_experience: values.work_experience,
                    resources: values.resources
                }
            });
        } catch (e) { }
    };

    const onSubmitDegree = async values => {
        try {
            await UpdateDegrees({
                variables: {
                    token: props.token,
                    degree_name: values.degree_name,
                    year: values.year,
                    institution: values.institution
                }
            });
        } catch (e) { }
    }

    const onSubmitSpeciality = async values => {
        try {
            const res = values.speciality.split('|')
            await UpdateSpeciality({
                variables: {
                    token: props.token,
                    speciality: res[0],
                }
            });
            props.changedSpeciality(res[1]);
        } catch (e) { }
    }

    if (data) {
        props.changedProfile(data.updateProfileTrainer);
    }

    if (newDegree) {
        props.changedDegree(newDegree.createProfileDegree);
    }

    if (loading || loading2 || loading3) {
        return (
            <div className="container mt-5">
                <div className="row justify-content-center text-center">
                    <div className="col-12">
                        <div className="spinner-border text-warning" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-12 col-md-3 text-center">
                    <div className="WhiteColor border p-4 mb-3">
                        <button className="btn btn-warning  mb-0" onClick={() => { props.goToProfile() }}>Volver</button>
                        <button className="btn btn-danger ml-2" onClick={() => { props.goToChangePass() }}>Contraseña</button>
                    </div>
                    <div className="WhiteColor border p-4 mb-3">
                        <h3>Añadir especialidad</h3>
                        <AddSpecialities
                            onSubmitSpeciality={onSubmitSpeciality}
                        />
                        {(error3) &&
                            <div className="alert alert-danger m-0" role="alert">
                                Esta especialidad ya está en tu perfil
                            </div>
                        }
                    </div>
                </div>
                <div className="col-12 col-md-5 text-center">
                    <div className="WhiteColor border p-4 mb-3">
                        <h3>Editar Info</h3>
                        <TrainerUpdateInfoForm
                            trainerData={props.trainerData}
                            onSubmitUpdateProfile={onSubmitUpdateProfile}
                        />
                        {(error) &&
                            <div className="alert alert-danger m-0" role="alert">
                                {error.message.substring(19)}
                            </div>
                        }
                    </div>
                </div>
                <div className="col-12 col-md-4 text-center">
                    <div className="WhiteColor border p-4 mb-3">
                        <h3>Añadir Título</h3>
                        <AddDegreeForm
                            onSubmitDegree={onSubmitDegree}
                        />
                        {(error2) &&
                            <div className="alert alert-danger m-0" role="alert">
                                {error2.message.substring(19)}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TrainerEditProfile;