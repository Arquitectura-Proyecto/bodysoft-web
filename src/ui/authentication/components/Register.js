import React, { useState } from 'react';

import 'antd/dist/antd.css';
import correct from '../../../shared/images/correct.webp';

import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Link } from 'react-router-dom';

import RegisterForm from './RegisterForm';
import ValidateAccount from './ValidateAccount';

const GET_TYPES = gql`
  {
    authGetTypes{
        ID
        Name
      }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($Email: String!, $Password: String!, $TypeID: Int!){
        authCreateUser(authUserData: {Email: $Email, Password: $Password, TypeID: $TypeID})
  }
`;

const VALIDATE_USER = gql`
  mutation ValidateUser($Email: String!, $Vcode: Int!){
    authVerifyAcount(email: $Email, vcode: $Vcode)
  }
`;

const Register = () => {

    const [registerState, setRegisterState] = useState({ account: false, verified: false, email: '' });

    const { loading: queryLoading, error: queryError, data } = useQuery(GET_TYPES);
    const [createUser, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_USER, { errorPolicy: 'all' });
    const [validateUser, { loading: mutationLoading2, error: mutationError2 }] = useMutation(VALIDATE_USER, { errorPolicy: 'all' });

    if (queryLoading) return (
        <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );

    if (queryError) return (
        <div className="alert alert-danger" role="alert">
            {queryError.message}
        </div>
    );

    const onSubmitUser = async values => {
        try {
            await createUser({ variables: { Email: values.Email, Password: values.Password, TypeID: values.TypeID } });
            setRegisterState({ ...registerState, account: true, email: values.Email })
        } catch (e) { }
    };

    const onSubmitValidate = async values => {
        try {
            await validateUser({ variables: { Email: registerState.email, Vcode: values.vcode } });
            setRegisterState({ ...registerState, verified: true })
        } catch (e) { }
    };

    if (registerState.account && registerState.verified) {
        return (
            <>
                <h1 className="TitleFontTypeRoboto">Cuenta creada y validada exitosamente</h1>
                <img alt="correct" src={correct} style={{ width: "80px" }} className="m-0" />
                <br />
                <br />
                <Link to="/login">
                    <button type="button" className="btn btn-warning mr-2 btn-lg">Ingresar</button>
                </Link>
            </>
        );
    }
    if (registerState.account) {
        return (
            <ValidateAccount
                onFinish={onSubmitValidate}
                mutationLoading={mutationLoading2}
                mutationError={mutationError2}
            />
        );
    }
    return (
        <RegisterForm
            data={data}
            onFinish={onSubmitUser}
            mutationLoading={mutationLoading}
            mutationError={mutationError}
        />
    );
}

export default Register;