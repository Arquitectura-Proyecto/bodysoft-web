import React from 'react';

import exercise_girl from '../../../shared/images/exercise_girl.webp';

import { useHistory } from 'react-router-dom';
import gql from 'graphql-tag';
import { useApolloClient, useMutation } from "@apollo/react-hooks";

import { Form, Input, Button } from 'antd';

const AUTHENTICATION = gql`
  mutation Authentication($Email: String!, $Password: String!){
    webAuthentication(email: $Email, password: $Password){
        Token
    }
  }
`;


const AUTHTOKEN = gql`
   mutation AuthToken($Token: String!){
    webValidateAuthToken(token: $Token){
        TypeID,
        Profile
      }
  }
`;

const LoginForm = (props) => {

    const client = useApolloClient();

    const history = useHistory();

    const [authentication, { data, loading, error }] = useMutation(AUTHENTICATION, { errorPolicy: 'all' });
    const [getTokenData, { called, data: tokenData, loading: tokenLoading, error: tokenError }] = useMutation(AUTHTOKEN, { errorPolicy: 'all' });

    const callTokenData = async () => {
        try {
            await getTokenData({ variables: { Token: data.webAuthentication.Token } });
        } catch (e) { }
    }

    const onSubmitAuth = async values => {
        try {
            await authentication({ variables: { Email: values.Email, Password: values.Password } });
        } catch (e) { }
    };

    if (data && !called) {
        callTokenData();
    }

    if (tokenData) {
        client.writeData({
            data: {
                token: data.webAuthentication.Token,
                type: tokenData.webValidateAuthToken.TypeID,
                profile: tokenData.webValidateAuthToken.Profile
            }
        })
        localStorage.setItem("token", data.webAuthentication.Token)
        localStorage.setItem("type", tokenData.webValidateAuthToken.TypeID)
        localStorage.setItem("profile", (tokenData.webValidateAuthToken.Profile ? "true" : ""))
    }

    if (loading || tokenLoading) {
        return (
            <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    }

    if (error && error.message.substring(14, 18).trim() === "406") {
        history.push('/validate')
    }

    return (
        <>
            <h1 className="TitleFontTypeRoboto">BodySoft</h1>
            <img alt="react" src={exercise_girl} style={{ width: "70px" }} className="m-0" />
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onSubmitAuth}
                layout={'vertical'}
                size={'large'}
            >
                <Form.Item
                    label="Correo:"
                    name="Email"
                    rules={[{ required: true, type: 'email', message: 'Por favor ingrese un correo valido' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Contraseña:"
                    name="Password"
                    rules={[{ required: true, message: 'Ingrese una contraseña' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ background: "#ffbc02", color: "#231F20", borderColor: "#e3a765" }}
                    >
                        Ingresar
            </Button>
                </Form.Item>
            </Form>
            <button type="button" className="btn btn-link FontBlackLink" onClick={() => { props.changePassHandler() }}>
                Olvidaste tu contraseña?
            </button>
            {(tokenError) &&
                <div className="alert alert-danger m-0" role="alert">
                    {tokenError.message.substring(19)}
                </div>
            }
            {(error) &&
                <div className="alert alert-danger m-0" role="alert">
                    {error.message.substring(19)}
                </div>
            }
        </>
    )
}

export default LoginForm;