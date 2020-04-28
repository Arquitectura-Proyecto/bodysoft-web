import React from 'react';

import 'antd/dist/antd.css';
import icon_dumbbell from '../../../shared/images/icon_dumbbell.webp';

import { Form, Input, Button, Select } from 'antd';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useHistory } from "react-router-dom";

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

const RegisterForm = () => {
    
    let history = useHistory();
    const { loading: queryLoading, error: queryError, data } = useQuery(GET_TYPES);
    const [createUser, { loading: mutationLoading, error: mutationError }] = useMutation(CREATE_USER, { errorPolicy: 'all' });

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

    const onFinish = async values => {
        try {
            await createUser({ variables: { Email: values.Email, Password: values.Password, TypeID: values.TypeID } });
            history.push("/login");
        } catch (e) {

        }
    };

    const types = [];
    const { Option } = Select;
    data.authGetTypes.map((data) => {
        types.push(<Option key={data.ID} value={data.ID}>{data.Name}</Option>)
        return null;
    });

    return (
        <>
            <h1 className="TitleFontTypeRoboto">Crear Cuenta</h1>
            <img alt="react" src={icon_dumbbell} style={{ width: "70px" }} className="m-0" />
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
                layout={'vertical'}
                size={'medium'}
            >
                <Form.Item
                    label="Correo"
                    name="Email"
                    rules={[{ required: true, type: 'email', message: 'Por favor ingrese un correo valido' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="Password"
                    rules={[{ required: true, message: 'Minimo 8 caracteres', min: 8 }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item name="TypeID" label="Tipo" rules={[{ required: true }]}>
                    <Select
                        placeholder="Seleccione el tipo de cuenta"
                    >
                        {types}
                    </Select>
                </Form.Item>
                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
                        size={'large'}
                        style={{ background: "#ffbc02", color: "#231F20", borderColor: "#e3a765" }}
                    >
                        Crear
            </Button>
                </Form.Item>
            </Form>
            {mutationLoading &&
                <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {mutationError &&
                <div className="alert alert-danger m-0" role="alert">
                    {mutationError.message.substring(19)}
                </div>
            }
        </>
    );
}

export default RegisterForm;