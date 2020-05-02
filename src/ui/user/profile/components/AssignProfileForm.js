import React from 'react';

import gql from 'graphql-tag';
import { useApolloClient, useMutation, useQuery} from "@apollo/react-hooks";

import { Form, Input, Button, InputNumber } from 'antd';

const GET_AUTH_DATA = gql`
    query getAuthData {
        token @client
    }
`;

const ASSIGN_PROFILE = gql`
   mutation AssignProfile($token: String!, $name: String!, $city: String!, $telephone: String!, $age: Int!, $photo: String!){
    createProfile(token: $token, body: {
      name: $name,
      city: $city,
      telephone: $telephone,
      age: $age,
      photo: $photo
    })
  }
`;

const AssignProfileForm = () => {

  const client = useApolloClient();

  const { data: cache } = useQuery(GET_AUTH_DATA);
  const [AssignProfile, { data, loading, error }] = useMutation(ASSIGN_PROFILE, { errorPolicy: 'all' });

  const onSubmitValidate = async values => {
    try {
      await AssignProfile({ variables: { 
        token: cache.token,
        name: values.name,
        city: values.city,
        telephone: values.telephone,
        age: values.age,
        photo: 'none'
      } });
    } catch (e) { }
  };

  if (loading) {
    return (
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (data) {
    client.writeData({ data: { profile: true } });
    localStorage.setItem("profile", "true");
  }

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmitValidate}
        layout={'vertical'}
        size={'medium'}
      >
        <Form.Item
          label="Nombre"
          name="name"
          rules={[{ required: true, message: 'Por favor ingrese un nombre' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ciudad:"
          name="city"
          rules={[{ required: true, message: 'Por favor ingrese una ciudad válida' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Telefono:"
          name="telephone"
          rules={[{ required: true, message: 'Por favor ingrese un telefono valido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Edad:"
          name="age"
          rules={[{ required: true, type: 'number', message: 'Por favor ingrese una edad válida', min: 10, max: 120 }]}
        >
          <InputNumber />
        </Form.Item>
        <br />
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
      {(error) &&
        <div className="alert alert-danger m-0" role="alert">
          {error.message.substring(19)}
        </div>
      }
    </>
  )
}

export default AssignProfileForm;