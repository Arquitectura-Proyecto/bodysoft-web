import React from 'react';

import { useApolloClient } from "@apollo/react-hooks";

import { Form, Input, Button } from 'antd';

const AssignProfileForm = () => {

  const client = useApolloClient();

  const onSubmitValidate = async values => {
    try {
      client.writeData({ data: { profile: true } });
    } catch (e) { }
  };

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
          rules={[{ required: true, message: 'Por favor ingrese un correo valido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Edad"
          name="age"
          rules={[{ required: true, message: 'Por favor ingrese un correo valido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Telefono"
          name="telephone"
          rules={[{ required: true, message: 'Por favor ingrese un correo valido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Ciudad"
          name="city"
          rules={[{ required: true, message: 'Por favor ingrese un correo valido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Descripcion"
          name="description"
          rules={[{ required: true, message: 'Por favor ingrese un correo valido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Experiencia"
          name="work_experience"
          rules={[{ required: true, message: 'Por favor ingrese un correo valido' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Recursos"
          name="resources"
          rules={[{ required: true, message: 'Por favor ingrese un correo valido' }]}
        >
          <Input />
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
    </>
  )
}

export default AssignProfileForm;