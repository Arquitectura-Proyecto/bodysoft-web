import React from 'react';

import icon_dumbbell from '../../../shared/images/icon_dumbbell.webp';

import { Form, Input, Button, Select } from 'antd';

const RegisterForm = (props) => {

    const types = [];
    const { Option } = Select;
    props.data.authGetTypes.map((data) => {
        types.push(<Option key={data.ID} value={data.ID}>{data.Name}</Option>)
        return null;
    });

    return (
        <>
            <h1 className="TitleFontTypeRoboto mb-0">Crear Cuenta</h1>
            <img alt="react" src={icon_dumbbell} style={{ width: "70px" }} className="m-0" />
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={props.onFinish}
                layout={'vertical'}
                size={'medium'}
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
                    rules={[{ required: true, message: 'Minimo 8 caracteres', min: 8 }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    name="TypeID"
                    label="Tipo:"
                    rules={[{ required: true, message: 'Seleccione un tipo' }]}>
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
            {props.mutationLoading &&
                <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {props.mutationError &&
                <div className="alert alert-danger m-0" role="alert">
                    {props.mutationError.message.substring(19)}
                </div>
            }
        </>
    )
}

export default RegisterForm;