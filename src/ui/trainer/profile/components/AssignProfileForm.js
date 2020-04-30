import React from 'react';

import gql from 'graphql-tag';
import { useApolloClient, useMutation, useQuery } from "@apollo/react-hooks";

import { Form, Input, Button, InputNumber } from 'antd';

const GET_AUTH_DATA = gql`
    query getAuthData {
        token @client
    }
`

const ASSIGN_PROFILE = gql`
   mutation AssignProfile(
    $token: String!, 
    $name: String!, 
    $city: String!, 
    $telephone: String!, 
    $age: Int!, 
    $photo: String!, 
    $sum_ratings: Int, 
    $num_ratings: Int,
    $description: String,
    $work_experience: String,
    $resources: String
    ){
    createProfile(token: $token, body: {
      name: $name,
      city: $city,
      telephone: $telephone,
      age: $age,
      photo: $photo,
      sum_ratings: $sum_ratings,
      num_ratings:$num_ratings,
      description: $description,
      work_experience: $work_experience,
      resources: $resources
    })
  }
`;

const AssignProfileForm = () => {

  const client = useApolloClient();

  const { data: cache } = useQuery(GET_AUTH_DATA);
  const [AssignProfile, { data, loading, error }] = useMutation(ASSIGN_PROFILE, { errorPolicy: 'all' });

  const onSubmitValidate = async values => {
    try {
      await AssignProfile({
        variables: {
          token: cache.token,
          name: values.name,
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

  if (loading) {
    return (
      <div className="spinner-border text-warning" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (data) {
    client.writeData({ data: { profile: true } });
  }

  return (
    <>
      <Form
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onSubmitValidate}
        layout={'vertical'}
        size={'small'}
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
        <Form.Item
          label="Descripción:"
          name="description"
          rules={[{ required: true, message: 'Por favor ingrese una descripción' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Experiencia laboral:"
          name="work_experience"
          rules={[{ required: true, message: 'Por favor ingrese su experiencia laboral' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Recursos:"
          name="resources"
          rules={[{ required: true, message: 'Por favor ingrese sus recursos' }]}
        >
          <Input.TextArea />
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