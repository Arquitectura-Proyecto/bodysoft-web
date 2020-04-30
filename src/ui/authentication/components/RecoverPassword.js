import React, { useState } from 'react';

import lock_logo from '../../../shared/images/lock_logo.webp';

import gql from 'graphql-tag';
import { useLazyQuery } from "@apollo/react-hooks";

import { Form, Input, Button } from 'antd';

const RECOVER_PASSWORD = gql`
  query RecoverPassword($Email: String!){
    authRecoverPassword(email: $Email)
  }
`;


const RecoverPassword = (props) => {


    const [isSuccesfull, setIsSuccesfull] = useState(false);
    const [authentication, { error, loading }] = useLazyQuery(RECOVER_PASSWORD, { errorPolicy: 'all' });

    const onSubmitRecover = async values => {
        await authentication({ variables: { Email: values.Email } });
        setIsSuccesfull(true);
    };

    let message;
    if (isSuccesfull && !error) {
        message = <div className="alert alert-success m-0" role="alert">
            Se envio el correo
        </div>
    }

    if (loading) {
        return <div className="spinner-border text-warning" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    }

    return (
        <>
            <h1 className="TitleFontTypeRoboto">Recuperar Contraseña</h1>
            <img alt="react" src={lock_logo} style={{ width: "70px" }} className="mb-4" />
            <p>Se enviará un correo electrónico con la contraseña actual.</p>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onSubmitRecover}
                layout={'vertical'}
                size={'large'}
            >
                <Form.Item
                    label="Correo"
                    name="Email"
                    rules={[{ required: true, type: 'email', message: 'Por favor ingrese un correo valido' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ background: "#ffbc02", color: "#231F20", borderColor: "#e3a765" }}
                    >
                        Recuperar Contraseña
            </Button>
                </Form.Item>
            </Form>
            <button type="button" className="btn btn-link FontBlackLink" onClick={() => { props.changePassHandler() }}>
                Volver
            </button>
            {message}
            {error &&
                <div className="alert alert-danger m-0" role="alert">
                    No hay una cuenta asociada con ese correo
                </div>
            }
        </>
    )
}

export default RecoverPassword;