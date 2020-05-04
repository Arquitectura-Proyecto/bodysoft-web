import React from 'react';

import gql from 'graphql-tag';
import { useQuery } from "@apollo/react-hooks";

import { Form, Input, Button, InputNumber, Select } from 'antd';

const GET_TYPES = gql`
  {
    getAllTypeRoutine{
      id
      name
   }
}
`;

const AssignProfileForm = (props) => {

    const { data, loading, error } = useQuery(GET_TYPES, { errorPolicy: 'all' });

    if (loading) {
        return (
            <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        );
    };

    if (error) {
        return (
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-12 p-0 ">
                        <div className="alert alert-danger m-0" role="alert">
                            {error.message.substring(19)}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const types = [];

    const { Option } = Select;

    if (data) {
        data.getAllTypeRoutine.map((data) => {
            types.push(<Option key={data.id} value={data.id}> {data.name}</Option >)
            return null;
        });
    };

    return (
        <>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={props.onSubmitRoutine}
                layout={'vertical'}
                size={'small'}
            >
                <Form.Item
                    label="Nombre:"
                    name="name"
                    rules={[{ required: true, message: 'Por favor ingrese un nombre' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Link preview:"
                    name="linkPreview"
                    rules={[{ required: true, message: 'Por favor ingrese link' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Precio:"
                    name="price"
                    rules={[{ required: true, type: 'number', message: 'Por favor ingrese un precio valido', min: 1 }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item
                    label="Tipo:"
                    name="idType"
                    rules={[{ required: true, message: 'Seleccione un tipo' }]}>
                    <Select
                        placeholder="Tipos"
                    >
                        {data && types}
                    </Select>
                </Form.Item>
                <Form.Item
                    label="Descripción:"
                    name="description"
                    rules={[{ required: true, message: 'Por favor ingrese una descripción' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <br />
                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
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