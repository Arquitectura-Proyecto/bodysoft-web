import React, { useState } from 'react';

import gql from 'graphql-tag';
import { useMutation } from "@apollo/react-hooks";

import { Form, Input, Button } from 'antd';

const CHANGE_PASSWORD = gql`
   mutation ChangePassword($token: String!, $password: String!, $newpassword: String!){
    authChagePassword(authChangePass: {
        Token: $token,
        Password: $password,
        NewPassword: $newpassword
      })
  }
`;

const ChangePassword = (props) => {

    const [isSuccesfull, setIsSuccesfull] = useState(false);
    const [UpdateProfile, { loading, error }] = useMutation(CHANGE_PASSWORD, { errorPolicy: 'all' });

    const onSubmitValidate = async values => {
        try {
            await UpdateProfile({
                variables: {
                    token: props.token,
                    password: values.password,
                    newpassword: values.newpassword,
                }
            });
            setIsSuccesfull(true);
        } catch (e) { }
    };

    if (loading) {
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

    let message;
    if (isSuccesfull && !error) {
        message = <div className="alert alert-success mb-5" role="alert">
            Se cambio la contraseña
        </div>
    }

    return (
        <div className="row justify-content-center">
            <div className="col-12 col-md-6">
                <div className="card text-center mt-5" style={{ paddingLeft: "9%", paddingRight: "9%" }}>
                    <h1 className="mt-3">Cambio Contraseña</h1>
                    <Form
                        name="basic"
                        initialValues={props.userData}
                        onFinish={onSubmitValidate}
                        layout={'vertical'}
                        size={'medium'}
                    >
                        <Form.Item
                            label="Contraseña Actual:"
                            name="password"
                            rules={[{ required: true, message: 'Minimo 8 caracteres' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Contraseña Nueva:"
                            name="newpassword"
                            rules={[{ required: true, message: 'Minimo 8 caracteres' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item >
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{ background: "#ffbc02", color: "#231F20", borderColor: "#e3a765" }}
                            >
                                Cambiar
                            </Button>
                        </Form.Item>
                    </Form>
                    <button className="btn btn-link FontBlackLink mb-0" onClick={() => { props.goToEditProfile() }}>Volver</button>
                    {message}
                    {(error) &&
                        <div className="alert alert-danger" role="alert">
                            {error.message.substring(19)}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChangePassword;