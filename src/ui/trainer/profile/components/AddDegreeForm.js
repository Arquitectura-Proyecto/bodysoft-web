import React from 'react';

import { Form, Input, Button, InputNumber } from 'antd';

const  AddDegreeForm = (props) => {

    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={props.onSubmitDegree}
                layout={'vertical'}
                size={'small'}
            >
                <Form.Item
                    label="Nombre Título:"
                    name="degree_name"
                    rules={[{ required: true, message: 'Por favor ingrese un nombre' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Institucion:"
                    name="institution"
                    rules={[{ required: true, message: 'Por favor ingrese un nombre' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Año:"
                    name="year"
                    rules={[{ required: true, type: 'number', message: 'Por favor ingrese un año valido ', min: 1900, max: 2050 }]}
                >
                    <InputNumber />
                </Form.Item>
                <Form.Item >
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{ background: "#ffbc02", color: "#231F20", borderColor: "#e3a765" }}
                    >
                        Añadir 
            </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default AddDegreeForm;